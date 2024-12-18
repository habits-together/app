import { createQuery } from 'react-query-kit';

import { addTestDelay } from '../common';
import { mockRelationships, mockUsers } from './mock-users';
import { type UserIdT, type UserWithRelationshipT } from './types';

type Response = UserWithRelationshipT[];
type Variables = void;

// don't need friend status
export const useFriends = createQuery<Response, Variables, Error>({
  queryKey: ['friends'],
  fetcher: async () => {
    const myId = '1' as UserIdT;
    const friends = await addTestDelay(
      mockUsers
        .filter((user) => {
          const relationship = mockRelationships[myId][user.id];
          return relationship && relationship.status === 'friends';
        })
        .map((user) => ({
          ...user,
          relationship: mockRelationships[myId][user.id],
        })),
    );
    return friends;
  },
});
