import colors from "@/src/constants/colors";
import { Icon as TablerIcon } from "@tabler/icons-react-native";

// habits

export type AllHabitsDataType = Record<string, HabitData>;
export type HabitData = {
  habitInfo: Habit;
  habitCompletionData: HabitCompletion[];
  habitParticipants: number[]; // Should be array of user ids, which are strings
};

export type HabitGoalPeriod = "daily" | "weekly";
export type HabitDisplayType = "weekly-view" | "monthly-view";

export type Habit = {
  id: string;
  title: string;
  description: string;
  color: keyof typeof colors.habitColors;
  icon: string;
  goal: {
    period: HabitGoalPeriod;
    completionsPerPeriod: number;
  };
};

export type HabitCompletions = {
  habitId: string;
  habitCompletionData: HabitCompletion[];
};
export type HabitCompletion = {
  numberOfCompletions: number;
  dayOfTheWeek: string;
  dayOfTheMonth: string;
  date: string;
};

export type HabitParticipants = {
  habitId: string;
  participants: number[];
};

// friends
export type AllFriendsDataType = Record<string, FriendData>;
export type FriendData = {
  id: string;
  displayName: string;
  userName: string;
  profilePicUrl: string;
  commonHabits: Habit[];
};

export type FriendRequestData = {
  id: string;
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
  id: string; // unique id for each invite
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  numberOfParticipants: number;
  displayName: string;
  profilePicUrl: string;
};

export type AllUserNotificationsDataType = Record<string, NotificationData>;
export type NotificationData = {
  id: string; // unique id for each reminder
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
  id: string; // unique id for each reminder
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  timeSent: number; // this will be hours stored as a number, can be changed to proper time after we decide on the format in the db
  displayName: string;
  profilePicUrl: string;
};
