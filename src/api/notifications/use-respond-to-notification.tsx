import { showMessage } from 'react-native-flash-message';
import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import { acceptHabitInvite } from '../habits/firebase-mutations';
import { type HabitIdT } from '../habits/types';
import { acceptFriendRequest } from '../users/firebase-mutations';
import { type UserIdT } from '../users/types';
import { deleteNotification } from './firebase-mutations';
import {
  type FriendNotificationT,
  type HabitNotificationT,
  type NotificationTypeT,
} from './types';

type Response = void;
type Variables = {
  notification: FriendNotificationT | HabitNotificationT;
  response: 'confirm' | 'delete';
};
type Context = {
  notificationType: NotificationTypeT;
};

export const useRespondToNotification = createMutation<
  Response,
  Variables,
  Error,
  Context
>({
  mutationFn: async (variables) => {
    const { notification, response } = variables;

    if (notification.type === 'friendRequest') {
      if (response === 'confirm') {
        await acceptFriendRequest(notification.senderId as UserIdT);
      }
    } else if (notification.type === 'habitInvite') {
      if (response === 'confirm') {
        await acceptHabitInvite(notification.habitId as HabitIdT);
      }
    }

    // Delete notification after responding
    await deleteNotification(notification.id);
  },
  onMutate: (variables) => {
    // Store the notification type in the mutation context
    return { notificationType: variables.notification.type };
  },
  onSuccess: (_, __, context) => {
    // Always invalidate notifications since we delete the notification
    queryClient.invalidateQueries({ queryKey: ['notifications'] });

    // Only invalidate friends list if it was a friend request
    if (context?.notificationType === 'friendRequest') {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    }

    // Only invalidate habits list if it was a habit invite
    if (context?.notificationType === 'habitInvite') {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    }

    showMessage({
      message: 'Response sent successfully',
      type: 'success',
      duration: 2000,
    });
  },
  onError: () => {
    showMessage({
      message: 'Failed to respond to notification',
      type: 'danger',
      duration: 2000,
    });
  },
});
