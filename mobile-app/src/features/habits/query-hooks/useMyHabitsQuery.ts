import { currentUserIdAtom } from "@/src/atoms/currentUserAtom";
import { atomStore } from "@/src/atoms/store";
import useHabitsQuery from "./useHabitsQuery";
import { useSubscribeToHabits } from "../api/subscribeHabitsForUser";

export default function useMyHabitsQuery() {
  const myUserId = atomStore.get(currentUserIdAtom);
  return useSubscribeToHabits({ userId: myUserId });
  // return useHabitsQuery({ userId: myUserId });
}
