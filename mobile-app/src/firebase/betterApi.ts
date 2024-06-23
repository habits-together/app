import { atomStore } from "../atoms/store";
import {
  currentUserAtom,
  currentUserIdAtom,
} from "../atoms/currentUserAtom";
import {
  generateMockId,
  mockFriendships,
  mockHabitCompletions,
  mockHabits,
  mockNotifications,
  mockUsers,
} from "../lib/betterMock";
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
} from "../lib/db_types";
import { todayString } from "../lib/formatDateString";

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
export async function fetchFriends(): Promise<allUsersInfoT> {
  const userId = atomStore.get(currentUserIdAtom);

  const myFriendIds: string[] = [];
  for (const friendshipId in mockFriendships) {
    const friendship = mockFriendships[friendshipId];
    if (friendship.user1Id === userId) {
      myFriendIds.push(friendship.user2Id);
    } else if (friendship.user2Id === userId) {
      myFriendIds.push(friendship.user1Id);
    }
  }

  return Object.fromEntries(
    Object.entries(mockUsers).filter(([userId]) =>
      myFriendIds.includes(userId),
    ),
  );
}

export async function fetchCommonHabits({
  participantId,
}: {
  participantId: string;
}): Promise<string[]> {
  const userId = atomStore.get(currentUserIdAtom);
  // fetch habits WHERE userId in participants AND participantId in participants
  return Object.keys(mockHabits).filter(
    (habitId) =>
      mockHabits[habitId].participants[userId] &&
      mockHabits[habitId].participants[participantId],
  );
}

export async function fetchMutualFriends({ friendId }: { friendId: string }) {
  const userId = atomStore.get(currentUserIdAtom);
  // fetch friends WHERE userId in friendships AND friendId in friendships
  const myFriendIds = Object.values(mockFriendships)
    .filter(
      (friendship) =>
        friendship.user1Id === userId || friendship.user2Id === userId,
    )
    .map((friendship) =>
      friendship.user1Id === userId ? friendship.user2Id : friendship.user1Id,
    );

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

export async function fetchUserInfo({
  userId,
}: {
  userId: string;
}): Promise<userT> {
  return mockUsers[userId];
}

export async function searchUsersInDb({
  searchText,
}: {
  searchText: string;
}): Promise<allUsersInfoT> {
  return Object.fromEntries(
    Object.entries(mockUsers).filter(
      ([, userData]) =>
        userData.displayName.toLowerCase().includes(searchText.toLowerCase()) ||
        userData.username.toLowerCase().includes(searchText.toLowerCase()),
    ),
  );
}
