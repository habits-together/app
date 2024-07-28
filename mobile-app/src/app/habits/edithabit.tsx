import { habitInfoAtom } from "@/src/atoms/atoms";
import CreateOrEditHabit from "@/src/components/CreateOrEditHabit";
import { HabitIdT } from "@/src/lib/db_types";
import { useLocalSearchParams } from "expo-router";
import { useAtomValue } from "jotai";

export default function EditHabit() {
  const params = useLocalSearchParams();
  const { habitidStr } = useLocalSearchParams<{ habitidStr: HabitIdT }>();
  if (typeof habitidStr !== "string") {
    throw new Error("Invalid habit id provided in URL params");
  }

  const habitInfo = useAtomValue(habitInfoAtom(habitidStr as HabitIdT));
  return (
    <CreateOrEditHabit
      habitId={habitidStr as HabitIdT}
      initialHabitInfoValues={habitInfo}
    />
  );
}
