import { createQuery } from 'react-query-kit';

import { getCurrentUserId } from '@/core';

import { getFriends } from './firebase-queries';
import { type UserWithRelationshipT } from './types';

type Response = UserWithRelationshipT[];
type Variables = void;

// don't need friend status
export const useFriends = createQuery<Response, Variables, Error>({
  queryKey: ['friends'],
  fetcher: async () => {
    const myId = getCurrentUserId();
    const friends = await getFriends(myId);
    return friends.map((friend) => ({
      ...friend,
      relationship: {
        status: 'friends',
        friendsSince: new Date(), // TODO: Get actual friendsSince date from Firebase
      },
    }));
  },
});
