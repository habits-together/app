import { createQuery } from 'react-query-kit';

import { addTestDelay } from '../common';
import { mockUsers } from './mock-users';
import { type UserIdT, type UserT } from './types';

type Variables = { id: UserIdT };
type Response = UserT;

export const useUser: ReturnType<
  typeof createQuery<Response, Variables, Error>
> = createQuery<Response, Variables, Error>({
  queryKey: ['friend'],
  fetcher: async (variables) => {
    const user = await addTestDelay(
      mockUsers.find((user) => user.id === variables.id),
    );
    if (!user) throw new Error('User not found');

    return user;
  },
});
