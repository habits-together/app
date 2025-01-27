/* eslint-disable max-lines-per-function */
import { useQueries } from '@tanstack/react-query';
import React from 'react';

import { type HabitT, useHabit, useNotifications, useUser } from '@/api';
import { NotificationCard } from '@/components/notification-card';
import {
  Header,
  LoadingSpinner,
  ScreenContainer,
  ScrollView,
  Text,
  View,
} from '@/ui';

export default function Notifications() {
  const {
    data: notifications,
    isLoading: notificationsLoading,
    error: notificationsError,
  } = useNotifications();

  const habitIds =
    notifications
      ?.map((n) => (n.type !== 'friendRequest' ? n.habitId : undefined))
      .filter((id): id is HabitT['id'] => !!id) ?? [];

  const senderIds = notifications?.map((n) => n.senderId) ?? [];

  const users = useQueries({
    queries: senderIds.map((id) => ({
      queryKey: ['user', { id }],
      queryFn: () => useUser.fetcher({ id }),
      staleTime: Infinity,
    })),
  });

  const habits = useQueries({
    queries: habitIds.map((id) => ({
      queryKey: ['habit', { id }],
      queryFn: () => useHabit.fetcher({ id }),
      staleTime: Infinity,
    })),
  });

  if (notificationsLoading) return <LoadingSpinner />;
  if (notificationsError)
    return <Text>Error: {notificationsError.message}</Text>;
  if (!notifications) return null;

  const sortedNotifications = [...notifications].sort(
    (a, b) => b.sentAt.getTime() - a.sentAt.getTime(),
  );

  const getUserName = (userId: string) => {
    const userQuery = users.find((u) => u.data?.id === userId);
    if (userQuery?.isLoading || !userQuery?.data?.displayName) {
      return null;
    }
    return userQuery.data.displayName;
  };

  const getHabitData = (habitId: string) => {
    const habitQuery = habits.find((h) => h.data?.id === habitId);
    if (habitQuery?.isLoading || !habitQuery?.data) {
      return null;
    }
    return habitQuery.data;
  };

  return (
    <ScreenContainer>
      <Header title="Notifications" />
      <ScrollView className="flex-1">
        <View className="flex flex-col gap-6">
          {sortedNotifications.length === 0 ? (
            <Text className="text-center text-stone-500 dark:text-stone-400">
              You have no more notifications 🎉
            </Text>
          ) : (
            sortedNotifications.map((notification) => {
              const userName = getUserName(notification.senderId);
              const habit =
                notification.type !== 'friendRequest'
                  ? getHabitData(notification.habitId)
                  : undefined;

              const isLoading =
                userName === null ||
                (notification.type !== 'friendRequest' && habit === null);

              return (
                <NotificationCard
                  key={`${notification.type}-${notification.sentAt}`}
                  notification={notification}
                  userName={userName}
                  habit={habit}
                  isLoading={isLoading}
                />
              );
            })
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
