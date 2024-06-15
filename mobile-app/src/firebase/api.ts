import { fetchSingleUserThumbnail } from "../lib/getRandomProfilePics";
import {
  getAllHabitData,
  getMockFriends,
  getMockNotifications,
} from "../lib/mockData";
import { Habit, HabitCompletion } from "../lib/types";

export async function fetchHabits() {
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

export async function updateHabitInfoInDB(habitId: number, habitInfo: Habit) {
  // update habit info in firebase
}
export async function createNewHabitInDB(habitInfo: Habit): Promise<number> {
  // add new habit in firebase and returns its ID
  return 123;
}

export async function updateHabitCompletionsInDB(
  habitId: number,
  habitCompletionData: HabitCompletion[],
) {
  // update habit completion data in firebase
}
export async function updateCompletionsTodayInDB(
  habitId: number,
  numberOfCompletionsToday: number,
) {
  // update number of completions today in firebase
}

export async function updateHabitParticipantsInDB(
  habitId: number,
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
  return updatedFriends;
}

export async function fetchNotifications() {
  // fetch all notifications from firebase
  return getMockNotifications();
}

export async function deleteNotificationInDB(id: number) {
  // delete notification from firebase
}

export async function acceptFriendRequestInDB(id: number) {
  // accept friend request in firebase
}

export async function acceptHabitInviteInDB(id: number) {
  // accept habit invite in firebase
}
