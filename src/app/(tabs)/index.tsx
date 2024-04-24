import { ScrollView, View, Text } from "@/src/components/Themed";
import { HabitCard } from "@/src/components/HabitCard";
import { IconBook, IconBed, IconBarbell } from "@tabler/icons-react-native";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import colors from "@/src/constants/colors";
import { Icon as TablerIcon } from "@tabler/icons-react-native";

export type Habit = {
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  id: number;
}

const habits: Habit[] = [
  {
    title: "Workout for 1 hour",
    icon: IconBarbell,
    color: "red",
    id: 3,
  },
  {
    title: "Read for 15 minutes",
    icon: IconBook,
    color: "green",
    id: 1,
  },
  {
    title: "Get 8 hours of sleep",
    icon: IconBed,
    color: "violet",
    id: 2,
  }
];

export default function HabitsTab() {
  return (
    <ScrollView className="flex-1 p-4 gap-6">
      {habits.map((habit, index) => {
        // if element is last, add padding to bottom (given that there are more than 1 element in the list)
        const isLastElement = index === habits.length - 1;
        const paddingBottom = isLastElement && habits.length > 1 ? 100 : 0;
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
    </ScrollView >
  );
}
