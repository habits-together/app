import { DocumentData, collection, doc, getDocs, query, where } from "firebase/firestore";
import { fetchSingleUserThumbnail } from "../lib/getRandomProfilePics";
import { getAllHabitData, getMockFriends } from "../lib/mockData";
import { Habit, HabitCompletion } from "../lib/types";
import { auth, firestore } from "./config";
import { habitInfoT } from "../lib/db_types";

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

  //fetch habits related to user
  if (!auth.currentUser) {console.log("No user logged in"); return{};}
  
  const userDocRef = doc(firestore, "users", auth.currentUser.uid)

  const q = query(
    collection(firestore, "habits"),
    where("participants", "array-contains", userDocRef),
  );
  let result: habitInfoT[] = []
  const docs = await getDocs(q);
  docs.forEach((doc) => {
    result.push(doc.data() as habitInfoT);
  });


  return result;
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

// freind
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
