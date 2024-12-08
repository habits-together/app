import { createQuery } from 'react-query-kit';

import { type CompleteUserT, type UserIDT } from '@/api';

import { addTestDelay } from '../common/add-test-delay';

type Variables = {
  query: string;
};
type Response = CompleteUserT[];

const mockUsers: CompleteUserT[] = [
  {
    id: '3' as UserIDT,
    displayName: 'Apple Smith',
    username: 'apple',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: '4' as UserIDT,
    displayName: 'Bob Johnson',
    username: 'bob_johnson',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: '5' as UserIDT,
    displayName: 'Lorem Ipsum',
    username: 'lorem_ipsum',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
];

// don't need friend status
export const useUserSearch = createQuery<Response, Variables, Error>({
  queryKey: ['user-search'],
  fetcher: async ({ query }) => {
    return addTestDelay(
      mockUsers.filter(
        (user) =>
          user.displayName.toLowerCase().includes(query.toLowerCase()) ||
          user.username.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  },
});
