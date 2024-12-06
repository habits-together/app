import { createMutation } from 'react-query-kit';

import { type CompleteUserT } from '@/components/user-card';

import { addTestDelay } from '../common/add-test-delay';
import { queryClient } from '../common/api-provider';
import { type UserIDT } from '../schemas';

type Variables = { id: UserIDT };
type Response = CompleteUserT;

export const useAddFriend = createMutation<Response, Variables, Error>({
  mutationFn: async (variables) => {
    const friend = await addTestDelay({
      id: variables.id,
      displayName: 'New Friend',
      username: 'new_friend',
      createdAt: new Date(),
      picture: 'https://randomuser.me/api/portraits/men/1.jpg',
    });
    return friend;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['friends'] });
  },
});
