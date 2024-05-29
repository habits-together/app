import { getAllHabitData } from "../lib/mockData";
import { Habit, HabitCompletion, HabitData } from "../lib/types";

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