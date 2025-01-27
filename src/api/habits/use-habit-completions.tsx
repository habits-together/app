import { createQuery } from 'react-query-kit';

import { addTestDelay } from '../common';
import { type UserIdT } from '../users';
import { mockHabitCompletions } from './mock-habits';
import {
  type HabitCompletionWithDateInfoT,
  type HabitIdT,
  type ParticipantCompletionsT,
} from './types';

type SingleUserHabitCompletionsResponse = HabitCompletionWithDateInfoT[];
type SingleUserHabitCompletionsVariables = {
  habitId: HabitIdT;
  userId: UserIdT;
  numDays: number;
};

export const useHabitCompletions = createQuery<
  SingleUserHabitCompletionsResponse,
  SingleUserHabitCompletionsVariables,
  Error
>({
  queryKey: ['habit-completions'],
  fetcher: async (variables) => {
    const completions = mockHabitCompletions[variables.habitId];
    if (!completions) {
      throw new Error('Habit not found');
    }
    const participantCompletions = completions[variables.userId];
    if (!participantCompletions) {
      throw new Error('Participant not found');
    }

    const structuredCompletions: HabitCompletionWithDateInfoT[] =
      getStructuredCompletionData(participantCompletions, variables.numDays);

    return await addTestDelay(structuredCompletions);
  },
});

type AllUsersHabitCompletionsResponse = {
  [key: UserIdT]: HabitCompletionWithDateInfoT[];
};
type AllUsersHabitCompletionsVariables = {
  habitId: HabitIdT;
  numDays: number;
};

export const useAllUsersHabitCompletions = createQuery<
  AllUsersHabitCompletionsResponse,
  AllUsersHabitCompletionsVariables,
  Error
>({
  queryKey: ['all-users-habit-completions'],
  fetcher: async (variables) => {
    const completions = mockHabitCompletions[variables.habitId];
    if (!completions) {
      throw new Error('Habit not found');
    }

    const result: { [key: UserIdT]: HabitCompletionWithDateInfoT[] } = {};
    for (const userId in completions) {
      const participantCompletions = completions[userId as UserIdT];
      if (!participantCompletions) {
        throw new Error('Participant not found');
      }
      result[userId as UserIdT] = getStructuredCompletionData(
        participantCompletions,
        variables.numDays,
      );
    }

    return await addTestDelay(result);
  },
});

function getStructuredCompletionData(
  completionData: ParticipantCompletionsT,
  numDays: number,
): HabitCompletionWithDateInfoT[] {
  const structuredCompletionData: HabitCompletionWithDateInfoT[] = [];

  let currentDate = new Date();
  // go back to the first day we want to display
  currentDate.setDate(currentDate.getDate() - numDays + 1);
  // loop through each day and add the completion data for that day to the structured data
  for (let i = 0; i < numDays; i++) {
    const dateString = currentDate.toLocaleDateString('en-CA');
    // if there is no completion data for the current date, default to 0 (no completions that day)
    structuredCompletionData.push({
      numberOfCompletions:
        completionData.entries?.[dateString]?.numberOfCompletions ?? 0,
      dayOfTheMonth: currentDate.getDate(),
      dayOfTheWeek: currentDate.toLocaleString('en-US', { weekday: 'short' }),
      date: currentDate.toLocaleDateString('en-CA'),
      note: completionData.entries?.[dateString]?.note,
      image: completionData.entries?.[dateString]?.image,
    });
    // move current date ahead 1 day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return structuredCompletionData;
}
