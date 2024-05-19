import { HabitCard } from "@/src/components/HabitCard";
import { ScrollView, View } from "@/src/components/Themed";
import { mockHabitData } from "@/src/lib/mockData";

export default function HabitsTab() {
  return (
    <ScrollView
      className="flex-1 px-4"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {mockHabitData.map((habit) => (
        <View key={habit.id} className="mb-5">
          <HabitCard habit={habit} displayType="weekly-view" currentPage="habit-tab" />
        </View>
      ))}
    </ScrollView>
  );
}
