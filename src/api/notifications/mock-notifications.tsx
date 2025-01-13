import { type HabitIdT } from '../habits';
import { type UserIdT } from '../users';
import {
  type FriendNotificationT,
  type HabitNotificationT,
  type NotificationT,
} from './types';

const now = new Date();
const getTimeAgoDate = (seconds: number) =>
  new Date(now.getTime() - seconds * 1000);

export const mockNotifications: (FriendNotificationT | HabitNotificationT)[] = [
  {
    type: 'friendRequest',
    senderId: '3' as UserIdT,
    receiverId: '1' as UserIdT,
    sentAt: getTimeAgoDate(20), // 20 seconds ago
  },
  {
    type: 'friendRequest',
    senderId: '6' as UserIdT,
    receiverId: '1' as UserIdT,
    sentAt: getTimeAgoDate(3600), // 1 hour ago
  },
  {
    type: 'habitInvite',
    habitId: '4' as HabitIdT,
    senderId: '2' as UserIdT,
    receiverId: '1' as UserIdT,
    sentAt: getTimeAgoDate(1800), // 30 minutes ago
  },
  {
    type: 'nudge',
    habitId: '1' as HabitIdT,
    senderId: '4' as UserIdT,
    receiverId: '1' as UserIdT,
    sentAt: getTimeAgoDate(172800), // 2 days ago
  },
];

export const setMockNotifications = (newNotifications: NotificationT[]) => {
  mockNotifications.length = 0;
  mockNotifications.push(...newNotifications);
};
