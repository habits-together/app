import { createQuery } from 'react-query-kit';

import { getCurrentUserId } from '@/core';

import { getHabits } from './firebase-queries';
import { type HabitT } from './types';

type Response = HabitT[];
type Variables = void;

export const useHabits = createQuery<Response, Variables, Error>({
  queryKey: ['habits'],
  fetcher: async () => {
    const myId = getCurrentUserId();
    return await getHabits(myId);
  },
});
