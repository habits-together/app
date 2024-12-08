import { createMutation } from 'react-query-kit';

import { addTestDelay, queryClient } from '../common';
import { type UserIdT } from '../users/types';
import {
  mockHabitCompletions,
  mockHabits,
  setMockHabitCompletions,
  setMockHabits,
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
    const { data } = mockHabits[habitIndex];

    const completions = mockHabitCompletions[variables.habitId];
    if (!completions) throw new Error('Habit not found');

    const participantCompletions = completions[variables.userId];
    if (!participantCompletions) throw new Error('Participant not found');

    const numCompletions = participantCompletions.completions[variables.date];

    let newNumCompletions = 1;
    if (numCompletions) {
      newNumCompletions =
        (numCompletions + 1) % (data.goal.completionsPerPeriod + 1);
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

    // update mostRecentCompletionDate in mockHabits
    setMockHabits(
      mockHabits.map((habit) => {
        if (habit.id === variables.habitId) {
          const participant = habit.data.participants[variables.userId];
          if (!participant) throw new Error('Participant not found');
          return {
            ...habit,
            data: {
              ...habit.data,
              participants: {
                ...habit.data.participants,
                [variables.userId]: {
                  ...participant,
                  mostRecentCompletionDate: participant.mostRecentCompletionDate
                    ? new Date(
                        Math.max(
                          new Date(`${variables.date}T00:00:00`).getTime(),
                          participant.mostRecentCompletionDate?.getTime() ?? 0,
                        ),
                      )
                    : new Date(`${variables.date}T00:00:00`),
                },
              },
            },
          };
        }
        return habit;
      }),
    );

    return await addTestDelay(mockHabits[habitIndex]);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['habits'] });
  },
});
