import { HabitCard } from "@/src/components/HabitCard";
import { ScrollView, View } from "@/src/components/Themed";
import { getMockHabitData, mockHabitData } from "@/src/lib/mockData";

const displayType = "monthly-view";

export default function HabitsTab() {
  return (
    <ScrollView
      className="flex-1 px-4 pt-2"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {mockHabitData.map((habit) => (
        <View key={habit.id} className="mb-5">
          <HabitCard
            habit={habit}
            displayType={displayType}
            currentPage="habit-tab"
            completionData={getMockHabitData(
              displayType,
              habit.id,
              habit.goal.period === "daily"
                ? habit.goal.completionsPerPeriod
                : 1,
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
}
