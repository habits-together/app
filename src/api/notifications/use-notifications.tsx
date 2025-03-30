import { createQuery } from 'react-query-kit';

import { getCurrentUserId } from '@/core';

import { getNotifications } from './firebase-queries';
import { type FriendNotificationT, type HabitNotificationT } from './types';

type Response = (FriendNotificationT | HabitNotificationT)[];
type Variables = void;

export const useNotifications = createQuery<Response, Variables, Error>({
  queryKey: ['notifications'],
  fetcher: async () => {
    const myId = getCurrentUserId();
    return await getNotifications(myId);
  },
});
