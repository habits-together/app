import { allHabitsT, habitCompletionsT } from "../lib/db_types";

export async function fetchAllHabitsInfo(): Promise<allHabitsT> {
  return {};
}

export async function fetchHabitCompletionsForAllParticipants({
  habitId,
}: {
  habitId: string;
}): Promise<Record<string, habitCompletionsT>> {
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