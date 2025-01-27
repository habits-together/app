import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import { type UserIdT } from '../users/types';
import { modifyHabitEntry } from './firebase-mutations';
import { type AllCompletionsT, type HabitEntryT, type HabitIdT } from './types';

type Response = AllCompletionsT;
type Variables = {
  userId: UserIdT;
  habitId: HabitIdT;
  date: string;
  modifiedEntry: HabitEntryT;
};

export const useModifyHabitEntry = createMutation<Response, Variables, Error>({
  mutationFn: async (variables) => {
    await modifyHabitEntry(
      variables.habitId,
      variables.userId,
      variables.date,
      variables.modifiedEntry,
    );
    return {} as AllCompletionsT; // Return type is required but not used
  },
  onSuccess: (_, variables) => {
    queryClient.invalidateQueries({
      queryKey: [
        'habit-completions',
        { habitId: variables.habitId, userId: variables.userId, numDays: 7 },
      ],
    });
    queryClient.invalidateQueries({
      queryKey: ['all-users-habit-completions', { habitId: variables.habitId }],
    });
  },
});
