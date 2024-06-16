import {
  AllFriendsDataType,
  AllHabitsDataType,
  AllUserNotificationsDataType,
  Habit,
  HabitCompletion,
} from "../lib/frontend_types";
import { fetchSingleUserThumbnail } from "../lib/getRandomProfilePics";
import {
  getAllHabitData,
  getMockFriends,
  getMockNotifications,
} from "../lib/mockData";

export async function fetchHabits(): Promise<AllHabitsDataType> {
  // fetch all habit data from firebase

  // const exampleData: AllHabitsDataType = {
  //   1: {
  //     habitInfo: {
  //       id: 1,
  //       title: "Drink water",
  //       description: "Drink 8 glasses of water",
  //       color: "blue",
  //       icon: "IconBottle",
  //       goal: {
  //         period: "daily",
  //         completionsPerPeriod: 8,
  //       },
  //     },
  //     habitCompletionData: [...],
  //     habitParticipants: [21, 22],
  //   },
  //   2: ...
  // }

  return getAllHabitData();
}

export async function updateHabitInfoInDB(habitId: string, habitInfo: Habit) {
  // update habit info in firebase
}
export async function createNewHabitInDB(habitInfo: Habit): Promise<number> {
  // add new habit in firebase and returns its ID
  return 123;
}

export async function updateHabitCompletionsInDB(
  habitId: string,
  habitCompletionData: HabitCompletion[],
) {
  // update habit completion data in firebase
}
export async function updateCompletionsTodayInDB(
  habitId: string,
  numberOfCompletionsToday: number,
) {
  // update number of completions today in firebase
}

export async function updateHabitParticipantsInDB(
  habitId: string,
  habitParticipants: number[],
) {
  // update habit participants in firebase
}

export async function fetchFriends() {
  // fetch all friend data from firebase
  const data = await getMockFriends();
  const pics = await Promise.all(data.map(() => fetchSingleUserThumbnail()));
  const updatedFriends = data.map((friend, index) => ({
    ...friend,
    profilePicUrl: pics[index].imgurl,
  }));
  const friendIdtoDataMap: AllFriendsDataType = {};
  updatedFriends.forEach((friend) => {
    friendIdtoDataMap[friend.id] = friend;
  });
  return friendIdtoDataMap;
}

export async function fetchNotifications(): Promise<AllUserNotificationsDataType> {
  // fetch all notifications from firebase
  const data = await getMockNotifications();
  const notificationIdToDataMap: AllUserNotificationsDataType = {};
  data.forEach((notification) => {
    notificationIdToDataMap[notification.id] = notification;
  });
  return notificationIdToDataMap;
}

export async function deleteNotificationInDB(id: string) {
  // delete notification from firebase
}

export async function acceptFriendRequestInDB(id: string) {
  // accept friend request in firebase
}

export async function acceptHabitInviteInDB(id: string) {
  // accept habit invite in firebase
}

// friend search
export async function searchForFriendsInDB(
  searchText: string,
): Promise<string[]> {
  // query database for usernames and emails including the searchText and return array of ids of the users that match
  return ["12", "45"];
}

export async function getMutualFriendsInDB(
  userId: string,
  friendId: string,
): Promise<string[]> {
  // query database for mutual friends of userId and friendId and return array of ids of the mutual friends
  return ["12", "45"];
}

export async function getCurrentUserIdFromDB(): Promise<string> {
  // query database for the current user's id and return it
  return "1";
}