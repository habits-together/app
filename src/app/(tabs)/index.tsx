import { ScrollView } from "@/src/components/Themed";
import { HabitCard } from "@/src/components/HabitCard";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { mockHabitData } from "@/src/lib/mockHabitData";

export default function HabitsTab() {
  return (
    <ScrollView className="flex-1 gap-6 p-4">
      {mockHabitData.map((habit, index) => {
        // if element is last, add padding to bottom (given that there are more than 1 element in the list)
        const isLastElement = index === mockHabitData.length - 1;
        const paddingBottom =
          isLastElement && mockHabitData.length > 1 ? 100 : 0;
        return (
          <Link
            push
            href={{
              pathname: "/viewhabit",
              params: { id: habit.id },
            }}
            asChild
            key={habit.id}
            style={{ paddingBottom: paddingBottom }}
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
