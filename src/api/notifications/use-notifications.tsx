import { createQuery } from 'react-query-kit';

import { addTestDelay } from '../common';
import { mockNotifications } from './mock-notifications';
import { type FriendNotificationT, type HabitNotificationT } from './types';

type Response = (FriendNotificationT | HabitNotificationT)[];
type Variables = void;

export const useNotifications = createQuery<Response, Variables, Error>({
  queryKey: ['notifications'],
  fetcher: async () => {
    const myId = '1';
    const notifications = await addTestDelay(
      mockNotifications.filter(
        (notification) => notification.receiverId === myId,
      ),
    );
    return notifications;
  },
});
