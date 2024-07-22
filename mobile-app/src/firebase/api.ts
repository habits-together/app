import {
  addDoc,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  or,
  query,
  setDoc,
  Unsubscribe,
  updateDoc,
  where,
} from "firebase/firestore";
import { SetStateAction } from "jotai";
import { currentUserAtom, currentUserIdAtom } from "../atoms/currentUserAtom";
import { atomStore } from "../atoms/store";
import {
  allHabitsT,
  allNotificationsT,
  allParticipantCompletionsT,
  allUsersInfoT,
  friendshipT,
  habitCompletionsT,
  habitInfoT,
  habitNotificationT,
  habitT,
  notificationT,
  userT,
  userWithIdT,
} from "../lib/db_types";
import { todayString } from "../lib/formatDateString";
import {
  mockFriendships,
  mockHabitCompletions,
  mockHabits,
  mockNotifications,
  mockUsers,
} from "../lib/mockData";
import { firestore } from "./config";
import { userSnapToUserWithIdT } from "./helper";

// habit
export async function fetchAllMyHabitsInfo(): Promise<allHabitsT> {
  const userId = atomStore.get(currentUserIdAtom);
  const habitsCollection = collection(firestore, "habits");

  const q = query(
    habitsCollection,
    where(`participants.${userId}`, "!=", null),
  );
  const querySnapshot = await getDocs(q);
  const myHabits: allHabitsT = {};
  querySnapshot.forEach((doc) => {
    myHabits[doc.id] = doc.data() as habitT;
  });
  return myHabits;
}

export async function fetchHabitInfo({
  habitId,
}: {
  habitId: string;
}): Promise<habitT> {
  const habitDocRef = doc(firestore, "habits", habitId);
  const habitDocSnap = await getDoc(habitDocRef);
  if (!habitDocSnap.exists()) {
    throw new Error(`No habit found with ID: ${habitId}`);
  }
  return habitDocSnap.data() as habitT;
}

export async function editHabitInDb({
  habitId,
  habitInfo,
}: {
  habitId: string;
  habitInfo: habitInfoT;
}): Promise<void> {
  const habitDocRef = doc(firestore, "habits", habitId);
  await updateDoc(habitDocRef, habitInfo);
}

export async function createNewHabitInDb({
  habitInfo,
}: {
  habitInfo: habitInfoT;
}): Promise<string> {
  const user = atomStore.get(currentUserAtom);
  // add new habit
  const habitData: habitT = {
    ...habitInfo,
    participants: {
      [user.id]: {
        displayName: user.displayName,
        username: user.username,
        picture: user.picture,
        mostRecentCompletionDate: new Date(),
        isOwner: true,
      },
    },
  };
  const newHabitDocRef = await addDoc(
    collection(firestore, "habits"),
    habitData,
  );
  const newHabitId = newHabitDocRef.id;
  // add completion
  const completionData = { completions: { [todayString()]: 0 } };
  const participantCompletionsRef = collection(
    newHabitDocRef,
    "participantCompletions",
  );
  await setDoc(doc(participantCompletionsRef, user.id), completionData);
  // return new habit id
  return newHabitId;
}

// habit completion
export async function updatetHabitCompletionsInDb({
  habitId,
  participantId,
  completionData,
}: {
  habitId: string;
  participantId: string;
  completionData: habitCompletionsT;
}): Promise<void> {
  const habitDocRef = doc(firestore, "habits", habitId);
  const participantCompletionDocRef = doc(
    habitDocRef,
    "participantCompletions",
    participantId,
  );
  await setDoc(participantCompletionDocRef, completionData);
}

export async function fetchHabitCompletionsForAllParticipants({
  habitId,
}: {
  habitId: string;
}): Promise<allParticipantCompletionsT> {
  const allParticipantCompletions: allParticipantCompletionsT = {};
  const habitDocRef = doc(firestore, "habits", habitId);
  const participantCompletionsRef = collection(
    habitDocRef,
    "participantCompletions",
  );
  const allParticipantCompletionsSnapshot = await getDocs(
    participantCompletionsRef,
  );
  allParticipantCompletionsSnapshot.forEach((doc) => {
    allParticipantCompletions[doc.id] = doc.data() as habitCompletionsT;
  });
  return allParticipantCompletions;
}

export async function fetchHabitCompletionsForParticipant({
  habitId,
  participantId,
}: {
  habitId: string;
  participantId: string;
}): Promise<habitCompletionsT> {
  const habitDocRef = doc(firestore, "habits", habitId);
  const participantCompletionDocRef = doc(
    habitDocRef,
    "participantCompletions",
    participantId,
  );
  const participantCompletionSnapshot = await getDoc(
    participantCompletionDocRef,
  );
  return participantCompletionSnapshot.data() as habitCompletionsT;
}

// FRIENDS
export async function fetchFriendIds({
  userId,
}: {
  userId: string;
}): Promise<string[]> {
  const friendshipsCollection = collection(firestore, "friendships");
  const q = query(
    friendshipsCollection,
    or(where("user1Id", "==", userId), where("user2Id", "==", userId)),
  );
  const friendshipSnap = await getDocs(q);
  const friendIds: string[] = [];
  friendshipSnap.forEach((doc) => {
    const friendship = doc.data() as friendshipT;
    if (friendship.user1Id === userId) {
      friendIds.push(friendship.user2Id);
    } else if (friendship.user2Id === userId) {
      friendIds.push(friendship.user1Id);
    }
  });
  return friendIds;
}

export async function fetchFriendData({
  userId,
}: {
  userId: string;
}): Promise<allUsersInfoT> {
  const allFriendData: allUsersInfoT = {};
  const myFriendIds = await fetchFriendIds({ userId });
  // create a array of prommises so each user data can be fetched async
  const userDocPromises = myFriendIds.map(async (friendId) => {
    const userDocRef = doc(firestore, "users", friendId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data() as userT;
      allFriendData[friendId] = {
        createdAt: userData.createdAt,
        displayName: userData.displayName,
        username: userData.username,
        picture: userData.picture,
      };
    } else {
      console.error(`No user found with ID: ${friendId}`);
    }
  });
  await Promise.all(userDocPromises);
  return allFriendData;
}

type SetFunction = (update: SetStateAction<allUsersInfoT>) => void;
export function subscribeToFriendList(setter: SetFunction): Unsubscribe {
  const currentUserId = atomStore.get(currentUserIdAtom);
  const q = query(
    collection(firestore, "friendships"),
    or(
      where("user1Id", "==", currentUserId),
      where("user2Id", "==", currentUserId),
    ),
  );
  // this only gonna refetch if MY friends change
  const unsub = onSnapshot(q, () => {
    fetchFriendData({ userId: currentUserId }).then(setter);
  });
  return unsub;
}

export async function fetchCommonHabitIds({
  participantId,
}: {
  participantId: string;
}): Promise<string[]> {
  const userId = atomStore.get(currentUserIdAtom);
  const habitsCollection = collection(firestore, "habits");
  const userQuery = query(
    habitsCollection,
    where(`participants.${userId}`, "!=", null),
  );
  const userHabitsSnap = await getDocs(userQuery);
  const commonHabitIds: string[] = [];
  userHabitsSnap.forEach((doc) => {
    const habitData = doc.data();
    if (habitData.participants[participantId]) {
      commonHabitIds.push(doc.id);
    }
  });
  return commonHabitIds;
}

export async function fetchMutualFriends({
  friendId,
  myFriendIds,
}: {
  friendId: string;
  myFriendIds: string[];
}): Promise<allUsersInfoT> {
  const allMutualFriendData: allUsersInfoT = {};
  const hisFriendIds: string[] = await fetchFriendIds({ userId: friendId });

  const mutualFriendIds = myFriendIds.filter((id) => hisFriendIds.includes(id));
  for (const mutualFriendId of mutualFriendIds) {
    const friendInfo = await fetchUserInfo({ userId: mutualFriendId });
    allMutualFriendData[mutualFriendId] = friendInfo;
  }
  return allMutualFriendData;
}

export async function searchFriendsInDb({
  searchText,
}: {
  searchText: string;
}): Promise<allUsersInfoT> {
  const users = await searchUsersInDb({ searchText });
  // filter out myself
  delete users[atomStore.get(currentUserIdAtom)];
  return users;
}

// NOTIFICATIONS
export async function fetchNotifications(): Promise<allNotificationsT> {
  const userId = atomStore.get(currentUserIdAtom);
  return mockNotifications;
}

export async function fetchOutboundNotifications(): Promise<allNotificationsT> {
  const userId = atomStore.get(currentUserIdAtom);
  return Object.fromEntries(
    Object.entries(mockNotifications).filter(
      ([, notification]) => notification.senderId === userId,
    ),
  );
}
export async function checkIfOutboundNotificationExistsInDb({
  type,
  receiverId,
}: {
  type: notificationT["type"];
  receiverId: string;
}): Promise<boolean> {
  const userId = atomStore.get(currentUserIdAtom);
  return Object.values(mockNotifications).some(
    (notification) =>
      notification.type === type &&
      notification.senderId === userId &&
      notification.receiverId === receiverId,
  );
}

export async function sendNotificationInDb({
  info,
}: {
  info: notificationT;
}): Promise<string> {
  const mockId = Math.random().toString(36).substring(2, 15);
  // replace with call to firebase
  mockNotifications[mockId] = info;
  return mockId;
}

export async function deleteNotificationInDb({
  notifId,
}: {
  notifId: string;
}): Promise<void> {
  // replace with call to firebase
  delete mockNotifications[notifId];
}

export async function acceptFriendRequestInDb({
  notifId,
}: {
  notifId: string;
}): Promise<void> {
  const userId = atomStore.get(currentUserIdAtom);
  // replace with call to firebase
  const notifData = mockNotifications[notifId];
  const personData = mockUsers[notifData.senderId];
  // mockFriends[notifData.senderId] = personData;
  mockFriendships[notifData.senderId] = {
    user1Id: userId,
    user2Id: notifData.senderId,
    friendsSince: new Date(),
  };
  delete mockNotifications[notifId];
}

export async function acceptHabitInviteInDb({
  notifId,
}: {
  notifId: string;
}): Promise<void> {
  // replace with call to firebase
  const userId = atomStore.get(currentUserIdAtom);
  const notifData = mockNotifications[notifId] as habitNotificationT;
  const habitData = mockHabits[notifData.habitId];
  habitData.participants[userId] = {
    mostRecentCompletionDate: new Date(),
    ...mockUsers[userId],
  };
  mockHabitCompletions[notifData.habitId][userId].completions = {
    [todayString()]: 0,
  };
  delete mockNotifications[notifId];
}

// USERS
export async function fetchUserInfo({
  userId,
}: {
  userId: string;
}): Promise<userWithIdT> {
  const userDocRef = doc(firestore, "users", userId);
  const userDocSnap = await getDoc(userDocRef);
  // replace this with
  if (!userDocSnap.exists()) {
    throw new Error(`No user found with ID: ${userId}`);
  }
  const userData = userSnapToUserWithIdT(userDocSnap);
  return userData;
}

export async function searchUsersInDb({
  searchText,
}: {
  searchText: string;
}): Promise<allUsersInfoT> {
  const usersCollection = collection(firestore, "users");
  const searchTextLower = searchText.toLowerCase();
  const searchTextHigh = searchText.toLowerCase() + "\uf8ff"; // high Unicode character used to simulate "starting with" behaviour

  const q = query(
    usersCollection,
    or(
      and(
        where("username", ">=", searchTextLower),
        where("username", "<=", searchTextHigh),
      ),
      and(
        where("displayName", ">=", searchTextLower),
        where("displayName", "<=", searchTextHigh),
      ),
    ),
  );

  const searchResultSnapshot = await getDocs(q);

  const searchResultUsersInfo: allUsersInfoT = {};

  searchResultSnapshot.forEach((doc) => {
    searchResultUsersInfo[doc.id] = doc.data() as userT;
  });

  return searchResultUsersInfo;
}
