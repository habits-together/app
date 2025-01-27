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

    const completions = mockHabitCompletions[variables.habitId];
    if (!completions) throw new Error('Habit not found');

    const participantCompletions = completions[variables.userId];
    if (!participantCompletions) throw new Error('Participant not found');

    const numCompletions = participantCompletions.entries[variables.date];

    let newNumCompletions = 1;
    if (numCompletions) {
      newNumCompletions = mockHabits[habitIndex].data.settings
        .allowMultipleCompletions
        ? numCompletions.numberOfCompletions + 1
        : 1;
    }

    const newCompletions = {
      ...participantCompletions,
      entries: {
        ...participantCompletions.entries,
        [variables.date]: {
          ...participantCompletions.entries[variables.date],
          numberOfCompletions: newNumCompletions,
        },
      },
    };

    setMockHabitCompletions({
      ...mockHabitCompletions,
      [variables.habitId]: {
        ...mockHabitCompletions[variables.habitId],
        [variables.userId]: newCompletions,
      },
    });

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
                  lastActivity: participant.lastActivity
                    ? new Date(
                        Math.max(
                          new Date(`${variables.date}T00:00:00`).getTime(),
                          participant.lastActivity?.getTime() ?? 0,
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
