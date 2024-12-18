import { createQuery } from 'react-query-kit';

import { addTestDelay } from '../common';
import { mockRelationships, mockUsers } from './mock-users';
import { type UserIdT, type UserWithRelationshipT } from './types';

type Variables = { id: UserIdT };
type Response = UserWithRelationshipT;

export const useUser: ReturnType<
  typeof createQuery<Response, Variables, Error>
> = createQuery<Response, Variables, Error>({
  queryKey: ['friend'],
  fetcher: async (variables) => {
    const myId = '1' as UserIdT;
    const user = await addTestDelay(
      mockUsers.find((user) => user.id === variables.id),
    );
    if (!user) throw new Error('User not found');

    return {
      ...user,
      relationship: (mockRelationships &&
        mockRelationships[myId]?.[variables.id]) || {
        status: 'none',
      },
    };
  },
});
