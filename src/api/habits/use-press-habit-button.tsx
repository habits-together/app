import { createMutation } from 'react-query-kit';

import { addTestDelay, queryClient } from '../common';
import { type UserIdT } from '../users/types';
import {
  mockHabitCompletions,
  mockHabits,
  setMockHabitCompletions,
} from './mock-habits';
import { type AllCompletionsT, type HabitIdT } from './types';

type Response = AllCompletionsT;
type Variables = { habitId: HabitIdT; userId: UserIdT; date: string };

export const usePressHabitButton = createMutation<Response, Variables, Error>({
  mutationFn: async (variables) => {
    const habitIndex = mockHabits.findIndex((h) => h.id === variables.habitId);
    if (habitIndex === -1) {
      throw new Error('Habit not found');
    }
    const habit = mockHabits[habitIndex];

    const completions = mockHabitCompletions[variables.habitId];
    if (!completions) throw new Error('Habit not found');

    const participantCompletions = completions[variables.userId];
    if (!participantCompletions) throw new Error('Participant not found');

    const numCompletions = participantCompletions.completions[variables.date];

    let newNumCompletions = 1;
    if (numCompletions) {
      newNumCompletions =
        (numCompletions + 1) % (habit.goal.completionsPerPeriod + 1);
    }

    const newCompletions = {
      ...participantCompletions,
      completions: {
        ...participantCompletions.completions,
        [variables.date]: newNumCompletions,
      },
    };

    setMockHabitCompletions({
      ...mockHabitCompletions,
      [variables.habitId]: {
        ...mockHabitCompletions[variables.habitId],
        [variables.userId]: newCompletions,
      },
    });

    return await addTestDelay(mockHabits[habitIndex]);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['habits'] });
  },
});
