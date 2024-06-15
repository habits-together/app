import colors from "@/src/constants/colors";
import { Icon as TablerIcon } from "@tabler/icons-react-native";

// habits

export type AllHabitsDataType = Record<number, HabitData>;
export type HabitData = {
  habitInfo: HabitInfo;
  habitCompletionData: HabitCompletion[];
  habitParticipants: HabitParticipant[];
};

export type HabitGoalPeriod = "daily" | "weekly";
export type HabitDisplayType = "weekly-view" | "monthly-view";

export type HabitInfo = {
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

export type HabitParticipant = {
  id: number;
  displayName: string;
  username: string;
  profilePicUrl: string;
};

// friends

export type FriendData = {
  id: number;
  displayName: string;
  userName: string;
  profilePicUrl: string;
  commonHabits: HabitInfo[];
};

export type FriendRequestData = {
  id: number;
  displayName: string;
  mutualCount: number;
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
  displayName: string;
  profilePicUrl: string;
};

export type NotificationData = {
  id: number; // unique id for each reminder
  type: "friendRequest" | "habitInvite" | "habitReminder";
  displayName: string;
  mutualCount: number; // only for friend requests
  profilePicUrl: string;
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  numberOfParticipants: number; // only for habit invites
  timeSent: number; // this will be hours stored as a number, can be changed to proper time after we decide on the format in the db
};

export type HabitReminderData = {
  id: number; // unique id for each reminder
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  timeSent: number; // this will be hours stored as a number, can be changed to proper time after we decide on the format in the db
  displayName: string;
  profilePicUrl: string;
};
