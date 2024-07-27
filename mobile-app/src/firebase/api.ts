import {
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  or,
  query,
  setDoc,
  Timestamp,
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
  friendNotificationT,
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
import { firestore } from "./config";
import { userSnapToUserWithIdT, userWithIdToUserT } from "./helper";

type SetFunction<T> = (update: SetStateAction<T>) => void;

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
    const data = doc.data();
    myHabits[doc.id] = {
      ...data,
      createdAt: data.createdAt.toDate(),
    } as habitT;
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
  const data = habitDocSnap.data();
  return {
    ...data,
    createdAt: data.createdAt.toDate(),
  } as habitT;
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
  const newHabitDocRef = await addDoc(collection(firestore, "habits"), {
    ...habitData,
    createdAt: Timestamp.fromDate(habitData.createdAt), // convert to Firestore Timestamp
  });
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
      const userData = userDocSnap.data();
      allFriendData[friendId] = {
        createdAt: userData.createdAt.toDate(),
        displayName: userData.displayName,
        username: userData.username,
        picture: userData.picture,
      } as userT;
    } else {
      console.error(`No user found with ID: ${friendId}`);
    }
  });
  await Promise.all(userDocPromises);
  return allFriendData;
}

export function subscribeToFriendList(
  setter: SetFunction<allUsersInfoT>,
): Unsubscribe {
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
  const myNotifications: allNotificationsT = {};
  const userId = atomStore.get(currentUserIdAtom);
  const notifCollection = collection(firestore, "notification");
  const q = query(notifCollection, where("receiverId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    myNotifications[doc.id] = {
      ...data,
      sentAt: data.sentAt.toDate(),
    } as notificationT;
  });

  return myNotifications;
}

export function subscribeToNotifications(
  setter: SetFunction<allNotificationsT>,
): Unsubscribe {
  const currentUserId = atomStore.get(currentUserIdAtom);
  const notifCollection = collection(firestore, "notification");
  const q = query(notifCollection, where("receiverId", "==", currentUserId));

  const unsub = onSnapshot(q, () => {
    fetchNotifications().then(setter);
  });

  return unsub;
}

export async function fetchOutboundNotifications(): Promise<allNotificationsT> {
  const myNotifications: allNotificationsT = {};
  const userId = atomStore.get(currentUserIdAtom);
  const notifCollection = collection(firestore, "notification");
  const q = query(notifCollection, where("senderId", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    myNotifications[doc.id] = {
      ...data,
      sentAt: data.sentAt.toDate(),
    } as notificationT;
  });
  return myNotifications;
}

export async function checkIfOutboundNotificationExistsInDb({
  type,
  receiverId,
}: {
  type: notificationT["type"];
  receiverId: string;
}): Promise<boolean> {
  const userId = atomStore.get(currentUserIdAtom);
  const notifCollection = collection(firestore, "notification");
  const q = query(
    notifCollection,
    where("type", "==", type),
    where("senderId", "==", userId),
    where("receiverId", "==", receiverId),
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

export async function sendNotificationInDb({
  info,
}: {
  info: notificationT;
}): Promise<string> {
  const notifCollection = collection(firestore, "notification");
  const docRef = await addDoc(notifCollection, {
    ...info,
    sentAt: Timestamp.fromDate(info.sentAt), // convert to Firestore Timestamp
  });
  return docRef.id;
}

export async function deleteNotificationInDb({
  notifId,
}: {
  notifId: string;
}): Promise<void> {
  const notifDocRef = doc(firestore, "notification", notifId);
  await deleteDoc(notifDocRef);
  console.log(`Notification with ID ${notifId} deleted successfully.`);
}

export async function acceptFriendRequestInDb({
  notifId,
}: {
  notifId: string;
}): Promise<void> {
  const userId = atomStore.get(currentUserIdAtom);
  const notifDocRef = doc(firestore, "notification", notifId);
  const notifDocSnap = await getDoc(notifDocRef);
  if (!notifDocSnap.exists()) {
    throw new Error(`No notification found with ID: ${notifId}`);
  }
  const { senderId, receiverId } = notifDocSnap.data() as friendNotificationT;
  const friendshipsCollection = collection(firestore, "friendships");
  const [user1Id, user2Id] =
    senderId < receiverId ? [senderId, receiverId] : [receiverId, senderId];
  await addDoc(friendshipsCollection, {
    user1Id,
    user2Id,
    friendsSince: Timestamp.fromDate(new Date()), // convert to Firestore Timestamp
  });
  await deleteNotificationInDb({ notifId });
}

export async function acceptHabitInviteInDb({
  notifId,
}: {
  notifId: string;
}): Promise<void> {
  // replace with call to firebase
  const userId = atomStore.get(currentUserIdAtom);
  const notifDocRef = doc(firestore, "notification", notifId);
  const notifDocSnap = await getDoc(notifDocRef);
  if (!notifDocSnap.exists()) {
    throw new Error(`No notification found with ID: ${notifId}`);
  }
  const { habitId, receiverId } = notifDocSnap.data() as habitNotificationT;
  const habitDocRef = doc(firestore, "habits", habitId);

  // get recivers data
  const receiverDataWithId = await fetchUserInfo({ userId: receiverId });
  const receiverData = userWithIdToUserT(receiverDataWithId);

  // put them as a participant in the habit
  await updateDoc(habitDocRef, {
    [`participants.${userId}`]: {
      ...receiverData,
    },
  });

  // their habit completion
  const completionData = { completions: { [todayString()]: 0 } };
  await updatetHabitCompletionsInDb({
    habitId,
    participantId: receiverId,
    completionData,
  });

  await deleteNotificationInDb({ notifId });
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
    const data = doc.data();
    searchResultUsersInfo[doc.id] = {
      ...data,
      createdAt: data.createdAt.toDate(),
    } as userT;
  });

  return searchResultUsersInfo;
}
