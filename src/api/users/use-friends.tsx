import { createQuery } from 'react-query-kit';

import { getFriends } from './firebase-queries';
import { type UserIdT, type UserWithRelationshipT } from './types';

type Response = UserWithRelationshipT[];
type Variables = void;

// don't need friend status
export const useFriends = createQuery<Response, Variables, Error>({
  queryKey: ['friends'],
  fetcher: async () => {
    const myId = '1' as UserIdT; // TODO: Get from auth context
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
