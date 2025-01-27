import { createQuery } from 'react-query-kit';

import { type UserIdT } from '../users';
import { getHabits } from './firebase-queries';
import { type HabitT } from './types';

type Response = HabitT[];
type Variables = void;

export const useHabits = createQuery<Response, Variables, Error>({
  queryKey: ['habits'],
  fetcher: async () => {
    const myId = '1' as UserIdT; // TODO: Get from auth context
    return await getHabits(myId);
  },
});
