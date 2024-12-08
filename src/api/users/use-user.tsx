import { createQuery } from 'react-query-kit';

import { type CompleteUserWithFriendStatusT, type UserIDT } from '@/api';

import { addTestDelay } from '../common/add-test-delay';

type Variables = { id: UserIDT };
type Response = CompleteUserWithFriendStatusT;

const mockFriends: CompleteUserWithFriendStatusT[] = [
  {
    id: '1' as UserIDT,
    displayName: 'John Doe',
    username: 'john_doe',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/men/1.jpg',
    isFriend: true,
  },
  {
    id: '2' as UserIDT,
    displayName: 'Jane Doe',
    username: 'jane_doe',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/women/3.jpg',
    isFriend: true,
  },
  {
    id: '3' as UserIDT,
    displayName: 'Apple Smith',
    username: 'apple',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/women/4.jpg',
    isFriend: false,
  },
  {
    id: '4' as UserIDT,
    displayName: 'Bob Johnson',
    username: 'bob_johnson',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/men/5.jpg',
    isFriend: true,
  },
  {
    id: '5' as UserIDT,
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
