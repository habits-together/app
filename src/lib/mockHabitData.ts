import { HabitCompletionValue } from "@/src/components/HabitCard";
import colors from "@/src/constants/colors";
import { Icon as TablerIcon } from "@tabler/icons-react-native";
import { IconBook, IconBed, IconBarbell } from "@tabler/icons-react-native";

export type Habit = {
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  id: number;
};

export function getMockCompletionsData() {
  function getNumberOfDaysInLastWeek() {
    const currDay = new Date().getDay();
    return currDay === 0 ? 7 : currDay;
  }
  const daysInLastWeek = getNumberOfDaysInLastWeek();
  const activityData: HabitCompletionValue[] = new Array(56); // (3*2) weeks * 7 days + 7 days of last week = 49 days
  for (let i = 0; i < 49 + daysInLastWeek; i++) {
    Math.floor(Math.random() * 2)
      ? (activityData[i] = "completed")
      : (activityData[i] = "missed");
  }
  for (let i = 49 + daysInLastWeek; i < activityData.length; i++) {
    activityData[i] = "not-applicable";
  }
  let indexOftoday = 49 + daysInLastWeek - 1;
  // make sure last day is always missed
  activityData[indexOftoday] = "missed";
  return [activityData, indexOftoday] as const;
}

export const mockHabitData: Habit[] = [
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
  },
];
