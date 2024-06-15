import { habitInfoAtom } from "@/src/atoms/atoms";
import CreateOrEditHabit from "@/src/components/CreateOrEditHabit";
import { useLocalSearchParams } from "expo-router";
import { useAtomValue } from "jotai";

export default function EditHabit() {
  const params = useLocalSearchParams();
  const { habitidStr } = params;
  if (typeof habitidStr !== "string") {
    throw new Error("Invalid habit id provided in URL params");
  }
  const habitId = parseInt(habitidStr);

  const habitInfo = useAtomValue(habitInfoAtom(habitId));
  return <CreateOrEditHabit initialHabitInfoValues={habitInfo} />;
}
