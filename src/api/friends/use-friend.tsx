import { createQuery } from 'react-query-kit';

import { type CompleteUserT } from '@/components/user-card';

import { addTestDelay } from '../common/add-test-delay';
import { type UserIDT } from '../schemas';

type Variables = { id: UserIDT };
type Response = CompleteUserT;

const mockFriends: CompleteUserT[] = [
  {
    id: '1' as UserIDT,
    displayName: 'John Doe',
    username: 'john_doe',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  // {
  //   id: '2' as UserIDT,
  //   displayName: 'Jane Doe',
  //   username: 'jane_doe',
  //   createdAt: new Date(),
  //   picture: 'https://randomuser.me/api/portraits/women/3.jpg',
  // },
];

export const useFriend = createQuery<Response, Variables, Error>({
  queryKey: ['friend'],
  fetcher: async (variables) => {
    const friend = await addTestDelay(
      mockFriends.find((friend) => friend.id === variables.id),
    );
    if (!friend) {
      throw new Error('Friend not found');
    }
    return friend;
  },
});
