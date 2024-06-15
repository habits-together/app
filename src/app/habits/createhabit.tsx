import CreateOrEditHabit from "@/src/components/CreateOrEditHabit";

export default function Createhabit() {
  return (
    <CreateOrEditHabit
      initialHabitInfoValues={{
        id: 0,
        title: "",
        description: "",
        color: "red",
        icon: "default",
        goal: {
          period: "daily",
          completionsPerPeriod: 1,
        },
      }}
    />
  );
}
