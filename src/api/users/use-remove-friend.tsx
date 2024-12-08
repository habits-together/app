import { createMutation } from 'react-query-kit';

import { addTestDelay, queryClient } from '../common';
import { type CompleteUserT, loadingPicture, type UserIdT } from './types';

type Variables = { id: UserIdT };
type Response = CompleteUserT;

export const useRemoveFriend = createMutation<Response, Variables, Error>({
  mutationFn: async (variables) => {
    const friend = await addTestDelay({
      id: variables.id,
      displayName: 'Old Friend',
      username: 'old_friend',
      createdAt: new Date(),
      picture: loadingPicture,
      isFriend: false,
    });
    return friend;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['friends'] });
  },
});
