import { createQuery } from 'react-query-kit';

import { searchUsers } from './firebase-queries';
import { type UserT } from './types';

type Variables = {
  query: string;
};
type Response = UserT[];

// don't need friend status
export const useUserSearch = createQuery<Response, Variables, Error>({
  queryKey: ['user-search'],
  fetcher: async (variables) => {
    return await searchUsers(variables.query);
  },
});
