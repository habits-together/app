import { createQuery } from 'react-query-kit';

import { addTestDelay } from '../common';
import { mockUsers } from './mock-users';
import { type UserT } from './types';

type Response = UserT[];
type Variables = void;

// don't need friend status
export const useFriends = createQuery<Response, Variables, Error>({
  queryKey: ['friends'],
  fetcher: async () => {
    const friends = await addTestDelay(
      mockUsers.filter((user) => user.isFriend),
    );

    return friends;
  },
});
