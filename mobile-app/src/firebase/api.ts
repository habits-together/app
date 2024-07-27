import { router } from "expo-router";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { PrimitiveAtom, SetStateAction, useAtom, useAtomValue } from "jotai";
import { currentUserAtom, currentUserIdAtom } from "../atoms/currentUserAtom";
import { atomStore } from "../atoms/store";
import {
  allHabitsT,
  allNotificationsT,
  allParticipantCompletionsT,
  allUsersInfoT,
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
  generateMockId,
  mockFriendships,
  mockHabitCompletions,
  mockHabits,
  mockNotifications,
  mockUsers,
} from "../lib/mockData";
import { firestore } from "./config";

export async function fetchAllMyHabitsInfo(): Promise<allHabitsT> {
  const userId = atomStore.get(currentUserIdAtom);

  // get only habit user is part of
  const myHabits = Object.fromEntries(
    Object.entries(mockHabits).filter(
      ([habitId, habitData]) => habitData.participants[userId],
    ),
  );
  return myHabits;
}

export async function fetchHabitInfo({
  habitId,
}: {
  habitId: string;
}): Promise<habitT> {
  return mockHabits[habitId];
}

export async function editHabitInDb({
  habitId,
  habitInfo,
}: {
  habitId: string;
  habitInfo: habitInfoT;
}): Promise<void> {
  // replace with call to firebase
}
export async function createNewHabitInDb({
  habitInfo,
}: {
  habitInfo: habitInfoT;
}): Promise<string> {
  const user = atomStore.get(currentUserAtom);

  const habitId = generateMockId(); // replace with call to firebase
  mockHabitCompletions[habitId] = {
    [user.id]: { [todayString()]: 0 },
  };
  mockHabits[habitId] = {
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
  return habitId;
}

export async function fetchHabitCompletionsForAllParticipants({
  habitId,
}: {
  habitId: string;
}): Promise<allParticipantCompletionsT> {
  return mockHabitCompletions[habitId];
}

export async function fetchHabitCompletionsForParticipant({
  habitId,
  participantId,
}: {
  habitId: string;
  participantId: string;
}): Promise<habitCompletionsT> {
  return mockHabitCompletions[habitId][participantId];
}

// FRIENDS
export async function fetchFriendIds({
  userId,
}: {
  userId: string;
}): Promise<string[]> {
  // const friendshipsCollection = collection(firestore, "friendships");
  // const q = query(
  //   friendshipsCollection,
  //   or(where("user1Id", "==", userId), where("user2Id", "==", userId)),
  // );
  // const myFriendshipSnap = await getDocs(q);
  // const myFriendIds: string[] = [];
  // myFriendshipSnap.forEach((doc) => {
  //   const friendship = doc.data() as friendshipT;
  //   if (friendship.user1Id === userId) {
  //     myFriendIds.push(friendship.user2Id);
  //   } else if (friendship.user2Id === userId) {
  //     myFriendIds.push(friendship.user1Id);
  //   }
  // });
  // return friendIds;

  const friendIds: string[] = [];
  for (const friendshipId in mockFriendships) {
    const friendship = mockFriendships[friendshipId];
    if (friendship.user1Id === userId) {
      friendIds.push(friendship.user2Id);
    } else if (friendship.user2Id === userId) {
      friendIds.push(friendship.user1Id);
    }
  }
  return friendIds;
}

export async function fetchFriendData({
  userId,
}: {
  userId: string;
}): Promise<allUsersInfoT> {
  // const allFreindData: allUsersInfoT = {};
  // const myFriendIds = await fetchFriendIds({ userId });
  // // create a array of prommises so each user data can be fetched async
  // const userDocPromises = myFriendIds.map(async (friendId) => {
  //   const userDocRef = doc(firestore, "users", friendId);
  //   const userDocSnap = await getDoc(userDocRef);
  //   if (userDocSnap.exists()) {
  //     const userData = userDocSnap.data() as userT;
  //     allFreindData[friendId] = {
  //       createdAt: userData.createdAt,
  //       displayName: userData.displayName,
  //       username: userData.username,
  //       picture: userData.picture,
  //     };
  //   } else {
  //     console.error(`No user found with ID: ${friendId}`);
  //   }
  // });
  // await Promise.all(userDocPromises);
  // return allFriendData;

  const friendIds = await fetchFriendIds({ userId });
  return Object.fromEntries(
    Object.entries(mockUsers).filter(([userId]) => friendIds.includes(userId)),
  );
}

type SetFunction = (update: SetStateAction<allUsersInfoT>) => void;
export function subscribeToFriendList(setter: SetFunction): Unsubscribe {
  // const currentUserId = atomStore.get(currentUserIdAtom);
  // const q = query(
  //   collection(firestore, "friendships"),
  //   or(
  //     where("user1Id", "==", currentUserId),
  //     where("user2Id", "==", currentUserId),
  //   ),
  // );
  // // this only gonna refetch if MY friends change
  // const unsub = onSnapshot(q, () => {
  //   fetchFriendData({ userId: currentUserId }).then(setter);
  // });
  // return unsub;

  const currentUserId = atomStore.get(currentUserIdAtom);
  fetchFriendData({ userId: currentUserId }).then(setter);
  return () => {};
}

export async function fetchCommonHabitIds({
  participantId,
}: {
  participantId: string;
}): Promise<string[]> {
  // const userId = atomStore.get(currentUserIdAtom);
  // const habitsCollection = collection(firestore, "habits");
  // const userQuery = query(
  //   habitsCollection,
  //   where(`participants.${userId}`, "!=", null),
  // );
  // const userHabitsSnap = await getDocs(userQuery);
  // const commonHabitIds: string[] = [];
  // userHabitsSnap.forEach((doc) => {
  //   const habitData = doc.data();
  //   if (habitData.participants[participantId]) {
  //     commonHabitIds.push(doc.id);
  //   }
  // });
  // return commonHabitIds;

  const userId = atomStore.get(currentUserIdAtom);
  return Object.keys(mockHabits).filter(
    (habitId) =>
      mockHabits[habitId].participants[userId] &&
      mockHabits[habitId].participants[participantId],
  );
}

export async function fetchMutualFriends({
  friendId,
  myFriendIds,
}: {
  friendId: string;
  myFriendIds: string[];
}): Promise<allUsersInfoT> {
  // const allMutualFriendData: allUsersInfoT = {};
  // const hisFriendIds: string[] = await fetchFriendIds({ userId: friendId });

  // const mutualFriendIds = myFriendIds.filter((id) => hisFriendIds.includes(id));
  // for (const mutualFriendId of mutualFriendIds) {
  //   const friendInfo = await fetchUserInfo({ userId: mutualFriendId });
  //   allMutualFriendData[mutualFriendId] = friendInfo;
  // }
  // return allMutualFriendData;

  const theirFriendIds = Object.values(mockFriendships)
    .filter(
      (friendship) =>
        friendship.user1Id === friendId || friendship.user2Id === friendId,
    )
    .map((friendship) =>
      friendship.user1Id === friendId ? friendship.user2Id : friendship.user1Id,
    );
  const mutualFriendIds = myFriendIds.filter((friendId) =>
    theirFriendIds.includes(friendId),
  );
  return Object.fromEntries(
    Object.entries(mockUsers).filter(([userId]) =>
      mutualFriendIds.includes(userId),
    ),
  );
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
  mockHabitCompletions[notifData.habitId][userId] = { [todayString()]: 0 };
  delete mockNotifications[notifId];
}

// USERS
export async function fetchUserInfo({
  userId,
}: {
  userId: string;
}): Promise<userWithIdT> {
  // const userDocRef = doc(firestore, "users", userId);
  // const userDocSnap = await getDoc(userDocRef);
  // // replace this with
  // if (!userDocSnap.exists()) {
  //   throw new Error(`No user found with ID: ${userId}`);
  // }
  // const userData = userSnapToUserWithIdT(userDocSnap);
  // return userData;

  return { id: userId, ...mockUsers[userId] };
}

export async function searchUsersInDb({
  searchText,
}: {
  searchText: string;
}): Promise<allUsersInfoT> {
  // const usersCollection = collection(firestore, "users");
  // const searchTextLower = searchText.toLowerCase();
  // const searchTextHigh = searchText.toLowerCase() + "\uf8ff"; // high Unicode character used to simulate "starting with" behaviour

  // const q = query(
  //   usersCollection,
  //   or(
  //     and(
  //       where("username", ">=", searchTextLower),
  //       where("username", "<=", searchTextHigh),
  //     ),
  //     and(
  //       where("displayName", ">=", searchTextLower),
  //       where("displayName", "<=", searchTextHigh),
  //     ),
  //   ),
  // );

  // const searchResultSnapshot = await getDocs(q);

  // const searchResultUsersInfo: allUsersInfoT = {};

  // searchResultSnapshot.forEach((doc) => {
  //   searchResultUsersInfo[doc.id] = doc.data() as userT;
  // });

  // return searchResultUsersInfo;

  return Object.fromEntries(
    Object.entries(mockUsers).filter(
      ([, userData]) =>
        userData.displayName.toLowerCase().includes(searchText.toLowerCase()) ||
        userData.username.toLowerCase().includes(searchText.toLowerCase()),
    ),
  );
}

export async function updateProfileDataInDB(
  profileFormDataAtom: PrimitiveAtom<{
    displayName: string;
    username: string;
  }>,
  currentUserAtom: PrimitiveAtom<userWithIdT>,
) {
  async () => {
    const profileFormData = useAtomValue(profileFormDataAtom);
    const [userData, setUserData] = useAtom(currentUserAtom);

    // if (auth.currentUser == null) {
    //   console.log("Cannot edit profile: User not logged in")
    //   return;
    // }

    //Ensure user is unique
    const usersRef = collection(firestore, "users");
    const q = query(
      usersRef,
      where("username", "==", profileFormData.username),
    );
    const querySnapshot = await getDocs(q);

    // Check if were changing username, if so check if username already exist in DB
    if (
      userData.username !== profileFormData.username &&
      !querySnapshot.empty
    ) {
      console.log("Error: Username already taken"); // Display this on screen instead
      profileFormData.username = "";
      return;
    }

    // On success
    const newDataForAtom: userWithIdT = {
      ...userData,
      ...profileFormData,
    };

    const newDataForDb: userT = {
      username: profileFormData.username,
      displayName: profileFormData.displayName,
      picture: userData.picture,
      createdAt: userData.createdAt,
    };

    //Push Data to DB
    const userDocRef = doc(firestore, "users", userData.id); //change to auth.currentUser.uid when auth is fixed
    await setDoc(userDocRef, newDataForDb);

    //Update the current atoms accordingly
    setUserData(newDataForAtom);
    router.back();
  };
}
