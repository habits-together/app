import CreateOrEditHabit from "@/src/components/CreateOrEditHabit";

export default function Createhabit() {
  return (
    <CreateOrEditHabit
      initialHabitInfo={{
        createdAt: new Date(),
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
