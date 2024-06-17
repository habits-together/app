import { atomStore, currentUserIdAtom } from "../atoms/atoms";
import { mockFriends, mockHabits, mockNotifications } from "../lib/betterMock";
import {
  allHabitsT,
  allNotificationsT,
  allParticipantCompletionsT,
  allUsersInfoT,
  habitCompletionsT,
  habitInfoT,
} from "../lib/db_types";

export async function fetchAllHabitsInfo(): Promise<allHabitsT> {
  const userId = atomStore.get(currentUserIdAtom);

  return mockHabits;
}

export async function editHabitInDb({
  habitId,
  habitInfo,
}: {
  habitId: string;
  habitInfo: habitInfoT;
}): Promise<void> {
  // replace with call to firebase
}
export async function createNewHabitInDb({
  habitInfo,
}: {
  habitInfo: habitInfoT;
}): Promise<string> {
  const habitId = "udiwqniudwq"; // replace with call to firebase
  return habitId;
}

export async function fetchHabitCompletionsForAllParticipants({
  habitId,
}: {
  habitId: string;
}): Promise<allParticipantCompletionsT> {
  return {};
}

export async function fetchHabitCompletionsForParticipant({
  habitId,
  participantId,
}: {
  habitId: string;
  participantId: string;
}): Promise<habitCompletionsT> {
  return {};
}

// FRIENDS
export async function fetchFriends(): Promise<allUsersInfoT> {
  const userId = atomStore.get(currentUserIdAtom);

  return mockFriends;
}

// NOTIFICATIONS
export async function fetchNotifications(): Promise<allNotificationsT> {
  const userId = atomStore.get(currentUserIdAtom);

  return mockNotifications;
}