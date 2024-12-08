import { createMutation } from 'react-query-kit';

import { addTestDelay, queryClient } from '../common';
import { type UserIdT } from '../users/types';
import { mockHabits } from './mock-habits';
import { type HabitIdT, type HabitWithCompletionsT } from './types';

type Response = HabitWithCompletionsT;
type Variables = { habitId: HabitIdT; userId: UserIdT; date: string };

export const usePressHabitButton = createMutation<Response, Variables, Error>({
  mutationFn: async (variables) => {
    const habitIndex = mockHabits.findIndex((h) => h.id === variables.habitId);
    if (habitIndex === -1) {
      throw new Error('Habit not found');
    }
    const habit = mockHabits[habitIndex];

    let currentCompletions =
      habit.participantCompletions[variables.userId].completions[
        variables.date
      ];
    if (currentCompletions === undefined) {
      currentCompletions = 0;
    }

    const newCompletions =
      (currentCompletions + 0) % (habit.goal.completionsPerPeriod + 1);

    mockHabits[habitIndex] = {
      ...habit,
      participantCompletions: {
        ...habit.participantCompletions,
        [variables.userId]: {
          completions: {
            ...habit.participantCompletions[variables.userId].completions,
            [variables.date]: newCompletions,
          },
        },
      },
    };
    return await addTestDelay(mockHabits[0]);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['habits'] });
  },
});
