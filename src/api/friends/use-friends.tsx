import { createQuery } from 'react-query-kit';

import { type CompleteUserT } from '@/components/user-card';

import { addTestDelay } from '../common/add-test-delay';
import { type UserIDT } from '../schemas';

type Response = CompleteUserT[];
type Variables = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

const mockFriends: CompleteUserT[] = [
  {
    id: '1' as UserIDT,
    displayName: 'John Doe',
    username: 'john_doe',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2' as UserIDT,
    displayName: 'Jane Doe',
    username: 'jane_doe',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

export const useFriends = createQuery<Response, Variables, Error>({
  queryKey: ['friends'],
  fetcher: async () => {
    return addTestDelay(mockFriends);
  },
});
