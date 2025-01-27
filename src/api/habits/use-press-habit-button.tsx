import { doc, getDoc } from 'firebase/firestore';
import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import { db } from '../common/firebase';
import { type UserIdT } from '../users/types';
import { modifyHabitEntry } from './firebase-mutations';
import { getHabitById } from './firebase-queries';
import { type AllCompletionsT, type HabitIdT } from './types';

type Response = AllCompletionsT;
type Variables = { habitId: HabitIdT; userId: UserIdT; date: string };

export const usePressHabitButton = createMutation<Response, Variables, Error>({
  mutationFn: async (variables) => {
    const habit = await getHabitById(variables.habitId);
    if (!habit) throw new Error('Habit not found');

    const completionsDoc = await getDoc(
      doc(db, 'habitCompletions', `${variables.habitId}_${variables.userId}`),
    );

    const entries = completionsDoc.exists()
      ? completionsDoc.data().entries
      : {};

    const numCompletions = entries[variables.date]?.numberOfCompletions;

    let newNumCompletions = 1;
    if (numCompletions !== undefined) {
      newNumCompletions = habit.settings.allowMultipleCompletions
        ? numCompletions + 1
        : 1;
    }

    await modifyHabitEntry(
      variables.habitId,
      variables.userId,
      variables.date,
      {
        numberOfCompletions: newNumCompletions,
      },
    );

    return {} as AllCompletionsT; // Return type is required but not used
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['habits'] });
  },
});
