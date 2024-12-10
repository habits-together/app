import { createMutation } from 'react-query-kit';

import { addTestDelay, queryClient } from '../common';
import { type UserIdT, type UserT } from './types';

type Variables = { id: UserIdT };
type Response = UserT;

export const useSendFriendRequest = createMutation<Response, Variables, Error>({
  mutationFn: async (variables) => {
    const friend = await addTestDelay({
      id: variables.id,
      displayName: 'New Friend',
      username: 'new_friend',
      createdAt: new Date(),
      isFriend: true,
    });
    return friend;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['friends'] });
  },
});
