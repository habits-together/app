import { createQuery } from 'react-query-kit';

import { getHabitById } from './firebase-queries';
import { type HabitT } from './types';

type Variables = { id: HabitT['id'] };
type Response = HabitT;

export const useHabit = createQuery<Response, Variables, Error>({
  queryKey: ['habit'],
  fetcher: async ({ id }) => {
    const habit = await getHabitById(id);
    if (!habit) throw new Error('Habit not found');
    return habit;
  },
});
