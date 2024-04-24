import { View } from "@/src/components/Themed";
import { HabitCard } from "@/src/components/HabitCard";
import { IconBook } from "@tabler/icons-react-native";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import colors from "@/src/constants/colors";
import { Icon as TablerIcon} from "@tabler/icons-react-native";

export type Habit = {
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  id: number;
}

const habits: Habit[] = [
  {
    title: "Read for 15 minutes",
    icon: IconBook,
    color: "cyan",
    id: 1,
  },
  {
    title: "Read for 15 minutes",
    icon: IconBook,
    color: "rose",
    id: 2,
  },
];

export default function HabitsTab() {
  return (
    <View className="flex-1 p-4 gap-6">
      {habits.map((habit) => {
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
    </View>
  );
}
