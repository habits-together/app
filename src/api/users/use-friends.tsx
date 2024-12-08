import { createQuery } from 'react-query-kit';

import { addTestDelay } from '../common';
import { type CompleteUserT, type UserIdT } from './types';

type Response = CompleteUserT[];
type Variables = void;

const mockFriends: CompleteUserT[] = [
  {
    id: '1' as UserIdT,
    displayName: 'John Doe',
    username: 'john_doe',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2' as UserIdT,
    displayName: 'Jane Doe',
    username: 'jane_doe',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

// don't need friend status
export const useFriends = createQuery<Response, Variables, Error>({
  queryKey: ['friends'],
  fetcher: async () => {
    return addTestDelay(mockFriends);
  },
});
