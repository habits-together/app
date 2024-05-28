import colors from "@/src/constants/colors";
import { Icon as TablerIcon } from "@tabler/icons-react-native";

// habits

// export type HabitData = {
//   id: number;
//   title: string;
//   description: string;
//   color: keyof typeof colors.habitColors;
//   icon: TablerIcon;
//   goal: {
//     period: HabitGoalPeriod;
//     completionsPerPeriod: number;
//   };
//   completionData: HabitCompletion[];
//   participants: number[];
// };

export type AllHabitsDataType = Record<number, HabitData>;
export type HabitData = {
  habitInfo: Habit;
  habitCompletionData: HabitCompletion[];
  habitParticipants: number[];
}

export type HabitGoalPeriod = "daily" | "weekly";
export type HabitDisplayType = "weekly-view" | "monthly-view";

export type Habit = {
  id: number;
  title: string;
  description: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  goal: {
    period: HabitGoalPeriod;
    completionsPerPeriod: number;
  };
};

export type HabitCompletions = {
  habitId: number;
  habitCompletionData: HabitCompletion[];
};
export type HabitCompletion = {
  numberOfCompletions: number;
  dayOfTheWeek: string;
  dayOfTheMonth: string;
  date: string;
};

export type HabitParticipants = {
  habitId: number;
  participants: number[];
};

// friends

export type FriendData = {
  id: number;
  displayName: string;
  userName: string;
  profilePicUrl: string;
  commonHabits: Habit[];
};

export type FriendRequestData = {
  id: number;
  displayName: string;
  userName: string;
  profilePicUrl: string;
};

export type ProfilePic = {
  imgurl: string;
  hasCompleted: boolean;
};

// notifications

export type HabitInviteData = {
  id: number; // unique id for each invite
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  numberOfParticipants: number;
  userName: string;
};
