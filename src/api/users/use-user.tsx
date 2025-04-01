import { createQuery } from 'react-query-kit';

import { getUserWithRelationshipById } from './firebase-queries';
import { type UserIdT, type UserWithRelationshipT } from './types';

type Variables = { id: UserIdT };
type Response = UserWithRelationshipT;

export const useUser = createQuery<Response, Variables, Error>({
  queryKey: ['user'],
  fetcher: async (variables) => {
    const user = await getUserWithRelationshipById(variables.id);
    if (!user) throw new Error('User not found');
    return user;
  },
});
