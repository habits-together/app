import { createQuery } from 'react-query-kit';

import { addTestDelay } from '../common';
import { type CompleteUserWithFriendStatusT, type UserIdT } from './types';

type Variables = { id: UserIdT };
type Response = CompleteUserWithFriendStatusT;

const mockFriends: CompleteUserWithFriendStatusT[] = [
  {
    id: '1' as UserIdT,
    displayName: 'John Doe',
    username: 'john_doe',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/men/1.jpg',
    isFriend: true,
  },
  {
    id: '2' as UserIdT,
    displayName: 'Jane Doe',
    username: 'jane_doe',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/women/3.jpg',
    isFriend: true,
  },
  {
    id: '3' as UserIdT,
    displayName: 'Apple Smith',
    username: 'apple',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/women/4.jpg',
    isFriend: false,
  },
  {
    id: '4' as UserIdT,
    displayName: 'Bob Johnson',
    username: 'bob_johnson',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/men/5.jpg',
    isFriend: true,
  },
  {
    id: '5' as UserIdT,
    displayName: 'Lorem Ipsum',
    username: 'lorem_ipsum',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/men/6.jpg',
    isFriend: false,
  },
];

export const useUser = createQuery<Response, Variables, Error>({
  queryKey: ['friend'],
  fetcher: async (variables) => {
    // fetch user AND their friend status
    const friend = await addTestDelay(
      mockFriends.find((friend) => friend.id === variables.id),
    );
    if (!friend) {
      throw new Error('Friend not found');
    }
    return friend;
  },
});
