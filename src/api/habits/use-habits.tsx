import { createQuery } from 'react-query-kit';

import { addTestDelay } from '../common';
import { mockHabits } from './mock-habits';
import { type HabitWithCompletionsT } from './types';

type Response = HabitWithCompletionsT[];
type Variables = void;

export const useHabits = createQuery<Response, Variables, Error>({
  queryKey: ['habits'],
  fetcher: async () => {
    return addTestDelay(mockHabits);
  },
});
