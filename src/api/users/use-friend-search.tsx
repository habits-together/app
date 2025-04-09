import { createQuery } from 'react-query-kit';

import { searchFriends } from './firebase-queries';
import { type UserT } from './types';

type Variables = {
  query: string;
};
type Response = UserT[];

// don't need friend status
export const useFriendSearch = createQuery<Response, Variables, Error>({
  queryKey: ['friend-search'],
  fetcher: async (variables) => {
    return await searchFriends(variables.query);
  },
});
