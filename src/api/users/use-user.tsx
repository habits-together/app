import { createQuery } from 'react-query-kit';

import { getUserById } from './firebase-queries';
import { type UserIdT, type UserWithRelationshipT } from './types';

type Variables = { id: UserIdT };
type Response = UserWithRelationshipT;

export const useUser = createQuery<Response, Variables, Error>({
  queryKey: ['user'],
  fetcher: async (variables) => {
    const user = await getUserById(variables.id);
    if (!user) throw new Error('User not found');
    return user;
  },
});
