import { ScrollView } from "@/src/components/Themed";
import { HabitCard } from "@/src/components/HabitCard";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { mockHabitData } from "@/src/lib/mockData";

export default function HabitsTab() {
  return (
    <ScrollView
      className="flex-1 gap-6 p-4"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {mockHabitData.map((habit) => {
        return (
          <Link
            push
            href={{
              pathname: "/viewhabit",
              params: { id: habit.id },
            }}
            asChild
            key={habit.id}
          >
            <Pressable>
              <HabitCard
                title={habit.title}
                color={habit.color}
                icon={habit.icon}
                displayType="habit-tab"
              />
            </Pressable>
          </Link>
        );
      })}
    </ScrollView>
  );
}
