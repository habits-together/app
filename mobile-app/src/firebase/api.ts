import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { completionT, habitInfoT, habitT, userT } from "../lib/db_types";
// import {
//   generateMockUserHabitCompletionData,
//   genMockHabitCompletionData,
//   // getAllHabitData,
//   getMockFriends,
//   getMockNotifications,
// } from "../lib/mockData";
import { HabitCompletion, HabitInfo } from "../lib/types";
import { auth, firestore } from "./config";

export async function getAllMyHabits(): Promise<habitT[]> {
  try {
    if (!auth.currentUser) throw new Error("User not logged in");

    const q = query(
      collection(firestore, "users", auth.currentUser.uid, "habits"),
    );
    const querySnapshot = await getDocs(q);

    const habitRefs = querySnapshot.docs.map((doc) => doc.data().habitRef);
    const habitData = await Promise.all(
      habitRefs.map(async (ref) => {
        try {
          const docSnap = await getDoc(ref);
          return { ...(docSnap.data() as habitT), id: ref.id };
        } catch (e) {
          console.log(e);
        }
      }),
    );

    console.log(habitData);

    return habitData as habitT[];
  } catch (e) {
    console.log(e);
  }
  return [];
  // return querySnapshot.docs.map((doc) => doc.data() as habitT);
}

export async function getHabitInfo(habitId: string): Promise<habitT> {
  if (!auth.currentUser) throw new Error("User not logged in");

  const docRef = doc(firestore, "habits", habitId);

  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("No such document!");
  } else {
    return docSnap.data() as habitT;
  }

  // return {
  //   color: "blue",
  //   created_at: new Date(),
  //   description: "Drink 8 glasses of water",
  //   goal_completions_per_period: 8,
  //   goal_period: "daily",
  //   icon: "IconBottle",
  //   title: "Drink water",
  // };
}

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

  // return getAllHabitData();

  return [];
}

export async function updateHabitInfoInDB(
  habitId: number,
  habitInfo: HabitInfo,
) {
  // update habit info in firebase
}
export async function OLDcreateNewHabitInDB(
  habitInfo: HabitInfo,
): Promise<number> {
  // add new habit in firebase and returns its ID
  return 123;
}

export async function createNewHabitInDB(habitInfo: habitInfoT) {
  if (!auth.currentUser) throw new Error("User not logged in");

  const habit: habitT = {
    participants: [auth.currentUser.uid],
    owner_id: auth.currentUser.uid,
    id: "3",
    ...habitInfo,
  };
  const docRef = await addDoc(collection(firestore, "habits"), habit);

  return docRef;
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
  // // fetch all friend data from firebase
  // const data = await getMockFriends();
  // const pics = await Promise.all(data.map(() => fetchSingleUserThumbnail()));
  // const updatedFriends = data.map((friend, index) => ({
  //   ...friend,
  //   profilePicUrl: pics[index].imgurl,
  // }));
  // return updatedFriends;
  return [];
}

export async function fetchUser(id: string): Promise<userT> {
  // fetch user data from firebase
  return {
    created_at: new Date(),
    username: "johndoe",
    display_name: "John Doe",
    picture: "pic",
  };
}

export async function fetchUserHabitCompletions(
  habitId: string,
  userId: string,
): Promise<completionT[]> {
  // fetch all habit completions from firebase
  return [];
}

export async function fetchNotifications() {
  // fetch all notifications from firebase
  // return getMockNotifications();
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
