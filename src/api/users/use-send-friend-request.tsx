import { createMutation } from 'react-query-kit';

import { addTestDelay, queryClient } from '../common';
import { type CompleteUserWithFriendStatusT, type UserIdT } from './types';

type Variables = { id: UserIdT };
type Response = CompleteUserWithFriendStatusT;

export const useSendFriendRequest = createMutation<Response, Variables, Error>({
  mutationFn: async (variables) => {
    const friend = await addTestDelay({
      id: variables.id,
      displayName: 'New Friend',
      username: 'new_friend',
      createdAt: new Date(),
      picture: 'https://randomuser.me/api/portraits/men/1.jpg',
      isFriend: true,
    });
    return friend;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['friends'] });
  },
});
