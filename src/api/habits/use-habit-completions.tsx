import { createQuery } from 'react-query-kit';

import { addTestDelay } from '../common';
import { type UserIdT } from '../users';
import { mockHabitCompletions } from './mock-habits';
import {
  type HabitCompletionWithDateInfoT,
  type HabitIdT,
  type ParticipantCompletionsT,
} from './types';

type Response = HabitCompletionWithDateInfoT[];
type Variables = {
  habitId: HabitIdT;
  userId: UserIdT;
};

export const useHabitCompletions = createQuery<Response, Variables, Error>({
  queryKey: ['habits-completions'],
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
      getStructuredCompletionData(participantCompletions, 7);

    return await addTestDelay(structuredCompletions);
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
    // if there is no completion data for the current date, default to 0 (no completions that day)
    structuredCompletionData.push({
      numberOfCompletions:
        completionData?.completions?.[
          currentDate.toLocaleDateString('en-CA')
        ] ?? 0,
      dayOfTheMonth: currentDate.getDate(),
      dayOfTheWeek: currentDate.toLocaleString('en-US', { weekday: 'short' }),
      date: currentDate.toLocaleDateString('en-CA'),
    });
    // move current date ahead 1 day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return structuredCompletionData;
}
