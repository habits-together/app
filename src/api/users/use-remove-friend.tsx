import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import { removeFriend } from './firebase-mutations';
import { getUserWithRelationshipById } from './firebase-queries';
import { type UserIdT, type UserT } from './types';

type Variables = { id: UserIdT };
type Response = UserT;

export const useRemoveFriend = createMutation<Response, Variables, Error>({
  mutationFn: async (variables) => {
    await removeFriend(variables.id);
    const user = await getUserWithRelationshipById(variables.id);
    if (!user) throw new Error('User not found');
    return user;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['friends'] });
  },
});
