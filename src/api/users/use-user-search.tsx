import { createQuery } from 'react-query-kit';

import { addTestDelay } from '../common';
import { mockUsers } from './mock-users';
import { type UserT } from './types';

type Variables = {
  query: string;
};
type Response = UserT[];

// don't need friend status
export const useUserSearch: ReturnType<
  typeof createQuery<Response, Variables, Error>
> = createQuery<Response, Variables, Error>({
  queryKey: ['user-search'],
  fetcher: async (variables) => {
    const users = await addTestDelay(
      mockUsers.filter(
        (user) =>
          user.displayName
            .toLowerCase()
            .includes(variables.query.toLowerCase()) ||
          user.username.toLowerCase().includes(variables.query.toLowerCase()),
      ),
    );

    return users;
  },
});
