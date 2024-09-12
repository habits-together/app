import { firestore } from "@/src/firebase/config";
import { allHabitsT, HabitIdT, habitT, UserIdT } from "@/src/lib/db_types";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function fetchHabitsForUser({
  userId,
}: {
  userId: UserIdT;
}): Promise<allHabitsT> {
  const habitsCollection = collection(firestore, "habits");

  const firebaseQuery = query(
    habitsCollection,
    where(`participants.${userId}`, "!=", null),
  );
  const firebaseQuerySnapshot = await getDocs(firebaseQuery);

  const habits: allHabitsT = {};
  firebaseQuerySnapshot.forEach((doc) => {
    const data = doc.data();
    habits[doc.id as HabitIdT] = {
      ...data,
      createdAt: new Date(data.createdAt),
    } as habitT;
  });
  return habits;
}
