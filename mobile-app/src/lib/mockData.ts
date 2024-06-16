import {
  IconCode,
  IconExclamationCircle,
  IconMoodTongue,
  IconMusic,
} from "@tabler/icons-react-native";
import { numWeeksToDisplayInMonthlyView } from "../constants/constants";
import { fetchSingleUserThumbnail } from "./getRandomProfilePics";
import {
  AllHabitsDataType,
  FriendRequestData,
  Habit,
  HabitCompletion,
  HabitCompletions,
  HabitInviteData,
  HabitParticipants,
  HabitReminderData,
  NotificationData,
} from "./types";

export function getNumberOfDaysInLastWeek() {
  const currDay = new Date().getDay();
  return currDay === 0 ? 7 : currDay;
}

export function getMockHabitMonthData(
  numberOfDays: number,
  targetNumberOfCompletionsPerDay: number,
) {
  const activityData: HabitCompletion[] = new Array(numberOfDays);

  let date = new Date();
  date.setDate(date.getDate() - numberOfDays);

  for (let i = 0; i < numberOfDays; i++) {
    let numCompletions = Math.floor(
      Math.random() * (targetNumberOfCompletionsPerDay + 1),
    );
    activityData[i] = {
      numberOfCompletions: numCompletions,
      dayOfTheWeek: date.toLocaleString("en-US", { weekday: "short" }),
      dayOfTheMonth: date.getDate().toString(),
      date: date.toISOString().split("T")[0],
    };
    date.setDate(date.getDate() + 1);
  }

  return activityData;
}

export const mockHabitData: Habit[] = [
  {
    title: "Read for 15 minutes",
    icon: "book",
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
    icon: "barbell",
    color: "green",
    id: 2,
    description: "Working out is better together",
    goal: {
      period: "weekly",
      completionsPerPeriod: 4,
    },
  },
  {
    title: "Drink water",
    icon: "bottle",
    color: "violet",
    id: 3,
    description: "Stay hydrated",
    goal: {
      period: "daily",
      completionsPerPeriod: 5,
    },
  },
];
export async function getMockHabitData() {
  return mockHabitData;
}

export async function getMockFriendInvites() {
  const pic1 = await fetchSingleUserThumbnail();
  const pic2 = await fetchSingleUserThumbnail();

  const mockFriendInvites: FriendRequestData[] = [
    {
      id: 1,
      displayName: "Someone else",
      mutualCount: 3,
      profilePicUrl: pic1.imgurl,
    },
    {
      id: 2,
      displayName: "Eduardo",
      mutualCount: 5,
      profilePicUrl: pic2.imgurl,
    },
  ];

  return mockFriendInvites;
}

export async function getMockHabitInvites() {
  const pic1 = await fetchSingleUserThumbnail();
  const pic2 = await fetchSingleUserThumbnail();

  const mockHabitInvites: HabitInviteData[] = [
    {
      id: 1,
      title: "Play Guitar",
      color: "purple",
      icon: IconMusic,
      numberOfParticipants: 3,
      displayName: "Kush Blaze",
      profilePicUrl: pic1.imgurl,
    },
    {
      id: 2,
      title: "Yum Yum",
      color: "red",
      icon: IconMoodTongue,
      numberOfParticipants: 10,
      displayName: "Blaze Kush",
      profilePicUrl: pic2.imgurl,
    },
  ];
  return mockHabitInvites;
}

export async function getMockReminderInvites() {
  const pic1 = await fetchSingleUserThumbnail();
  const pic2 = await fetchSingleUserThumbnail();

  const mockReminderInvites: HabitReminderData[] = [
    {
      id: 1,
      title: "Work on Habit",
      color: "purple",
      icon: IconCode,
      timeSent: 4,
      displayName: "Guy One",
      profilePicUrl: pic1.imgurl,
    },
    {
      id: 2,
      title: "Yum Yum",
      color: "red",
      icon: IconMoodTongue,
      timeSent: 12,
      displayName: "Dude Two",
      profilePicUrl: pic2.imgurl,
    },
  ];
  return mockReminderInvites;
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
      id: 12,
      displayName: "Someone else",
      userName: "some1else",
      profilePicUrl: "",
      commonHabits: mockHabitData,
    },
    {
      id: 45,
      displayName: "Eduardo",
      userName: "eduardo_012003",
      profilePicUrl: "",
      commonHabits: [],
    },
  ];
  return mockFriends;
}

export const mockHabitFriendData: HabitParticipants[] = [
  { habitId: 1, participants: [1, 2, 3, 4] },
  { habitId: 2, participants: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  { habitId: 3, participants: [21, 22] },
];
export async function getMockHabitParticipantData() {
  return mockHabitFriendData;
}

export function getMockHabitCompletionData(habitId: number) {
  const habit = mockHabitData.find((habit) => habit.id === habitId);

  if (!habit) {
    throw `Could not find habit with id ${habitId}`;
  }

  const targetNumberOfCompletionsPerDay =
    habit.goal.period === "daily" ? habit.goal.completionsPerPeriod : 1;

  return getMockHabitMonthData(
    (numWeeksToDisplayInMonthlyView - 1) * 7 + getNumberOfDaysInLastWeek(),
    targetNumberOfCompletionsPerDay,
  );
}

export function genMockHabitCompletionData(
  targetNumberOfCompletionsPerDay: number,
) {
  return getMockHabitMonthData(
    (numWeeksToDisplayInMonthlyView - 1) * 7 + getNumberOfDaysInLastWeek(),
    targetNumberOfCompletionsPerDay,
  );
}

export async function getMockNotifications() {
  const pic1 = await fetchSingleUserThumbnail();
  const pic2 = await fetchSingleUserThumbnail();
  const pic3 = await fetchSingleUserThumbnail();
  const pic4 = await fetchSingleUserThumbnail();
  const pic5 = await fetchSingleUserThumbnail();
  const pic6 = await fetchSingleUserThumbnail();

  const mockNotifications: NotificationData[] = [
    {
      id: 1,
      type: "friendRequest",
      displayName: "Someone else",
      mutualCount: 3,
      profilePicUrl: pic1.imgurl,
      title: "",
      color: "red",
      icon: IconExclamationCircle,
      numberOfParticipants: 0,
      timeSent: 0,
    },
    {
      id: 2,
      type: "habitReminder",
      displayName: "Guy One",
      mutualCount: 0,
      profilePicUrl: pic2.imgurl,
      title: "Work on Habit",
      color: "red",
      icon: IconCode,
      numberOfParticipants: 0,
      timeSent: 0,
    },
    {
      id: 3,
      type: "habitInvite",
      displayName: "Kush Blaze",
      mutualCount: 0,
      profilePicUrl: pic3.imgurl,
      title: "Play Guitar",
      color: "purple",
      icon: IconMusic,
      numberOfParticipants: 3,
      timeSent: 0,
    },
    {
      id: 4,
      type: "friendRequest",
      displayName: "Eduardo",
      mutualCount: 5,
      profilePicUrl: pic4.imgurl,
      title: "",
      color: "red",
      icon: IconExclamationCircle,
      numberOfParticipants: 0,
      timeSent: 0,
    },
    {
      id: 5,
      type: "habitInvite",
      displayName: "Blaze Kush",
      mutualCount: 0,
      profilePicUrl: pic5.imgurl,
      title: "Yum Yum",
      color: "red",
      icon: IconMoodTongue,
      numberOfParticipants: 10,
      timeSent: 0,
    },
    {
      id: 6,
      type: "habitReminder",
      displayName: "Dude Two",
      mutualCount: 0,
      profilePicUrl: pic6.imgurl,
      title: "Yum Yum",
      color: "red",
      icon: IconMoodTongue,
      numberOfParticipants: 0,
      timeSent: 12,
    },
  ];
  return mockNotifications;
}

export async function generateAllMockHabitCompletionData(): Promise<
  HabitCompletions[]
> {
  return mockHabitData.map((habit) => {
    return {
      habitId: habit.id,
      habitCompletionData: getMockHabitCompletionData(habit.id),
    };
  });
}

export async function getAllHabitData() {
  const habits = await getMockHabitData();
  const habitCompletions = await generateAllMockHabitCompletionData();
  const habitParticipants = await getMockHabitParticipantData();
  // zip the data together into an object of objects
  // { habitId1: { habitData, habitCompletions, habitParticipants }, habitId2: ... }
  const habitData = habits.reduce((acc, habit) => {
    const habitCompletion = habitCompletions.find(
      (hc) => hc.habitId === habit.id,
    );
    const habitParticipant = habitParticipants.find(
      (hp) => hp.habitId === habit.id,
    );
    if (!habitCompletion || !habitParticipant) {
      throw `Could not find completion or participant data for habit with id ${habit.id}`;
    }
    acc[habit.id] = {
      habitInfo: habit,
      habitCompletionData: habitCompletion.habitCompletionData,
      habitParticipants: habitParticipant.participants,
    };
    return acc;
  }, {} as AllHabitsDataType);

  return habitData;
}

export { NotificationData };
