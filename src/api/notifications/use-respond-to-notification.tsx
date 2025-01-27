import { showMessage } from 'react-native-flash-message';
import { createMutation } from 'react-query-kit';

import { addTestDelay, queryClient } from '../common';
import {
  mockHabitCompletions,
  mockHabits,
  setMockHabits,
} from '../habits/mock-habits';
import { mockRelationships } from '../users/mock-users';
import { mockNotifications, setMockNotifications } from './mock-notifications';
import { type NotificationT } from './types';

type Response = void;
type Variables = {
  notification: NotificationT;
  response: 'confirm' | 'delete';
};
type Context = {
  previousNotifications: NotificationT[] | undefined;
};

export const useRespondToNotification = createMutation<
  Response,
  Variables,
  Error,
  Context
>({
  mutationFn: async ({ notification, response }) => {
    if (response === 'confirm') {
      if (notification.type === 'friendRequest') {
        // Add to relationships
        const senderId = notification.senderId;
        const receiverId = notification.receiverId;

        if (!mockRelationships[senderId]) {
          mockRelationships[senderId] = {};
        }
        if (!mockRelationships[receiverId]) {
          mockRelationships[receiverId] = {};
        }

        mockRelationships[senderId][receiverId] = {
          status: 'friends',
          friendsSince: new Date(),
        };
        mockRelationships[receiverId][senderId] = {
          status: 'friends',
          friendsSince: new Date(),
        };
      } else if (notification.type === 'habitInvite') {
        // Add user to habit participants
        const habitToUpdate = mockHabits.find(
          (h) => h.id === notification.habitId,
        );
        if (habitToUpdate) {
          const updatedHabit = {
            ...habitToUpdate,
            data: {
              ...habitToUpdate.data,
              participants: {
                ...habitToUpdate.data.participants,
                [notification.receiverId]: {
                  displayName: 'John Doe', // In a real app, get from user profile
                  username: 'john_doe',
                  lastActivity: new Date(),
                  isOwner: false,
                },
              },
            },
          };

          setMockHabits(
            mockHabits.map((h) =>
              h.id === notification.habitId ? updatedHabit : h,
            ),
          );

          // Initialize empty completions for the new participant
          if (!mockHabitCompletions[notification.habitId]) {
            mockHabitCompletions[notification.habitId] = {};
          }
          mockHabitCompletions[notification.habitId][notification.receiverId] =
            {
              entries: {},
            };
        }
      }
    }

    // Remove notification
    const updatedNotifications = mockNotifications.filter((n) => {
      if (n.type !== notification.type) return true;
      if (n.senderId !== notification.senderId) return true;
      if (n.receiverId !== notification.receiverId) return true;

      // Additional check for habit-related notifications
      if (
        (n.type === 'habitInvite' || n.type === 'nudge') &&
        (notification.type === 'habitInvite' || notification.type === 'nudge')
      ) {
        return n.habitId !== notification.habitId;
      }

      return false;
    });

    setMockNotifications(updatedNotifications);

    await addTestDelay(undefined);
  },
  onMutate: async ({ notification }) => {
    // Cancel any outgoing refetches so they don't overwrite our optimistic update
    await queryClient.cancelQueries({ queryKey: ['notifications'] });

    // Snapshot the previous value
    const previousNotifications = queryClient.getQueryData<NotificationT[]>([
      'notifications',
    ]);

    // Optimistically update the cache
    queryClient.setQueryData<NotificationT[]>(['notifications'], (old) => {
      if (!old) return [];
      return old.filter((n) => {
        if (n.type !== notification.type) return true;
        if (n.senderId !== notification.senderId) return true;
        if (n.receiverId !== notification.receiverId) return true;
        if (
          (n.type === 'habitInvite' || n.type === 'nudge') &&
          (notification.type === 'habitInvite' || notification.type === 'nudge')
        ) {
          return n.habitId !== notification.habitId;
        }
        return false;
      });
    });

    return { previousNotifications };
  },
  onSuccess: (_, { notification, response }) => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
    if (response === 'confirm') {
      if (notification.type === 'friendRequest') {
        queryClient.invalidateQueries({ queryKey: ['friends'] });
      } else if (notification.type === 'habitInvite') {
        queryClient.invalidateQueries({ queryKey: ['habits'] });
      }
    }
  },
  onError: (err, variables, context) => {
    // Rollback optimistic update
    if (context?.previousNotifications) {
      queryClient.setQueryData(
        ['notifications'],
        context.previousNotifications,
      );
    }
    showMessage({
      message: 'Failed to respond to notification',
      type: 'danger',
      duration: 2000,
    });
  },
});
