import colors from "@/src/constants/colors";
import {
  IconBarbell,
  IconBook,
  IconBottle,
  IconMoodTongue,
  IconMusic,
  Icon as TablerIcon,
} from "@tabler/icons-react-native";
import { fetchSingleUserThumbnail } from "./getRandomProfilePics";
import { HabitDisplayType } from "../components/HabitCard";

export type HabitGoalPeriod = "daily" | "weekly";
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

export function getNumberOfDaysInLastWeek() {
  const currDay = new Date().getDay();
  return currDay === 0 ? 7 : currDay;
}

export function getMockHabitMonthData(
  numberOfDays: number,
  targetNumberOfCompletionsPerDay: number,
) {
  const activityData: HabitCompletion[] = new Array(numberOfDays);
  for (let i = 0; i < numberOfDays; i++) {
    let numCompletions = Math.floor(
      Math.random() * (targetNumberOfCompletionsPerDay + 1),
    );
    activityData[i] = {
      numberOfCompletions: numCompletions,
      dayOfTheWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i % 7],
      dayOfTheMonth: 1 + (i % 31),
    };
  }

  return activityData;
}

export const mockHabitData: Habit[] = [
  {
    title: "Read for 15 minutes",
    icon: IconBook,
    color: "orange",
    id: 1,
    description: "Let's expand our mind capacity",
    goal: {
      period: "daily",
      completionsPerPeriod: 1,
    },
  },
  {
    title: "Work out",
    icon: IconBarbell,
    color: "green",
    id: 2,
    description: "Working out is better together",
    goal: {
      period: "weekly",
      completionsPerPeriod: 3,
    },
  },
  {
    title: "Drink water",
    icon: IconBottle,
    color: "violet",
    id: 3,
    description: "Stay hydrated",
    goal: {
      period: "daily",
      completionsPerPeriod: 5,
    },
  },
];

export type FriendRequestData = {
  id: number;
  displayName: string;
  userName: string;
  profilePicUrl: string;
};

export async function getMockFriendInvites() {
  const pic1 = await fetchSingleUserThumbnail();
  const pic2 = await fetchSingleUserThumbnail();

  const mockFriendInvites: FriendRequestData[] = [
    {
      id: 1,
      displayName: "Someone else",
      userName: "some1else",
      profilePicUrl: pic1.imgurl,
    },
    {
      id: 2,
      displayName: "Eduardo",
      userName: "eduardo_012003",
      profilePicUrl: pic2.imgurl,
    },
  ];

  return mockFriendInvites;
}

export type HabitInviteData = {
  id: number; // unique id for each invite
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  numberOfParticipants: number;
  userName: string;
};

export async function getMockHabitInvites() {
  const mockHabitInvites: HabitInviteData[] = [
    {
      id: 1,
      title: "Play Guitar",
      color: "purple",
      icon: IconMusic,
      numberOfParticipants: 3,
      userName: "blaze_kush",
    },
    {
      id: 2,
      title: "Yum Yum",
      color: "red",
      icon: IconMoodTongue,
      numberOfParticipants: 10,
      userName: "kush_blaze",
    },
  ];
  return mockHabitInvites;
}

export interface FriendData {
  id: number;
  displayName: string;
  userName: string;
  profilePicUrl: string;
  commonHabits: Habit[];
}

export async function getMockFriends() {
  const mockFriends: FriendData[] = [
    {
      id: 1,
      displayName: "Someone else",
      userName: "some1else",
      profilePicUrl: "",
      commonHabits: mockHabitData,
    },
    {
      id: 2,
      displayName: "Eduardo",
      userName: "eduardo_012003",
      profilePicUrl: "",
      commonHabits: [],
    },
  ];
  return mockFriends;
}

export const mockHabitFriendData = [
  { id: 1, friendIds: [1, 2, 3, 4] },
  { id: 2, friendIds: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  { id: 3, friendIds: [21, 22] },
];

export type HabitCompletion = {
  numberOfCompletions: number;
  dayOfTheWeek: string;
  dayOfTheMonth: number;
};
export const mockHabitWeekData = [
  {
    id: 1,
    completions: [
      {
        numberOfCompletions: 0,
        dayOfTheWeek: "Fri",
        dayOfTheMonth: 19,
      },
      {
        numberOfCompletions: 1,
        dayOfTheWeek: "Sat",
        dayOfTheMonth: 20,
      },
      {
        numberOfCompletions: 0,
        dayOfTheWeek: "Sun",
        dayOfTheMonth: 21,
      },
      {
        numberOfCompletions: 1,
        dayOfTheWeek: "Mon",
        dayOfTheMonth: 22,
      },
      {
        numberOfCompletions: 1,
        dayOfTheWeek: "Tue",
        dayOfTheMonth: 23,
      },
      {
        numberOfCompletions: 0,
        dayOfTheWeek: "Wed",
        dayOfTheMonth: 24,
      },
      {
        numberOfCompletions: 1,
        dayOfTheWeek: "Thu",
        dayOfTheMonth: 25,
      },
    ],
  },
  {
    id: 2,
    completions: [
      {
        numberOfCompletions: 0,
        dayOfTheWeek: "Fri",
        dayOfTheMonth: 19,
      },
      {
        numberOfCompletions: 1,
        dayOfTheWeek: "Sat",
        dayOfTheMonth: 20,
      },
      {
        numberOfCompletions: 0,
        dayOfTheWeek: "Sun",
        dayOfTheMonth: 21,
      },
      {
        numberOfCompletions: 1,
        dayOfTheWeek: "Mon",
        dayOfTheMonth: 22,
      },
      {
        numberOfCompletions: 1,
        dayOfTheWeek: "Tue",
        dayOfTheMonth: 23,
      },
      {
        numberOfCompletions: 0,
        dayOfTheWeek: "Wed",
        dayOfTheMonth: 24,
      },
      {
        numberOfCompletions: 1,
        dayOfTheWeek: "Thu",
        dayOfTheMonth: 25,
      },
    ],
  },
  {
    id: 3,
    completions: [
      {
        numberOfCompletions: 1,
        dayOfTheWeek: "Fri",
        dayOfTheMonth: 19,
      },
      {
        numberOfCompletions: 2,
        dayOfTheWeek: "Sat",
        dayOfTheMonth: 20,
      },
      {
        numberOfCompletions: 0,
        dayOfTheWeek: "Sun",
        dayOfTheMonth: 21,
      },
      {
        numberOfCompletions: 5,
        dayOfTheWeek: "Mon",
        dayOfTheMonth: 22,
      },
      {
        numberOfCompletions: 4,
        dayOfTheWeek: "Tue",
        dayOfTheMonth: 23,
      },
      {
        numberOfCompletions: 0,
        dayOfTheWeek: "Wed",
        dayOfTheMonth: 24,
      },
      {
        numberOfCompletions: 4,
        dayOfTheWeek: "Thu",
        dayOfTheMonth: 25,
      },
    ],
  },
];

export function getMockHabitData(
  displayType: HabitDisplayType,
  habitId: number,
  targetNumberOfCompletionsPerDay: number,
) {
  switch (displayType) {
    case "weekly-view":
      return mockHabitWeekData.filter((data) => data.id === habitId)[0]
        .completions;
    case "monthly-view":
      return getMockHabitMonthData(
        12 * 7 + getNumberOfDaysInLastWeek(),
        targetNumberOfCompletionsPerDay,
      );
  }
}