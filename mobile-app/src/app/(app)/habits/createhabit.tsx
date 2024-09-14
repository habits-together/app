import { createOrEditHabitFormAtom } from "@/src/atoms/atoms";
import CreateOrEditHabit from "@/src/components/CreateOrEditHabit";
import { useSetAtom } from "jotai";

export default function Createhabit() {
  const setForm = useSetAtom(createOrEditHabitFormAtom);
  setForm({
    createdAt: new Date(),
    title: "",
    description: "",
    color: "red",
    icon: "default",
    goal: {
      period: "daily",
      completionsPerPeriod: 1,
    },
  });
  return (
    <CreateOrEditHabit
    />
  );
}
