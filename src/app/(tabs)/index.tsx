import { router } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import React, { useEffect, useMemo } from 'react';

import { useHabits } from '@/api';
import { ErrorMessage } from '@/components/error-message';
import { HabitCard } from '@/components/habit-card';
import { useHabitOrder } from '@/core';
import {
  Header,
  LoadingSpinner,
  ScreenContainer,
  ScrollView,
  View,
} from '@/ui';

export default function Habits() {
  const { data: habits, isPending, isError, error, refetch } = useHabits();

  // custom habit ordering
  const { order, initializeOrder } = useHabitOrder();
  useEffect(() => {
    if (habits) {
      initializeOrder(habits.map((h) => h.id));
    }
  }, [habits, initializeOrder]);
  const sortedHabits = useMemo(() => {
    if (!habits || !order.length) return habits ?? [];
    return [...habits].sort((a, b) => {
      return order.indexOf(a.id) - order.indexOf(b.id);
    });
  }, [habits, order]);

  return (
    <ScreenContainer>
      <Header
        title="Habits"
        rightButton={{
          icon: PlusIcon,
          text: 'New Habit',
          onPress: () => {
            router.push({
              pathname: '/habits/edit-habit',
              params: { mode: 'create' },
            });
          },
        }}
      />
      <ScrollView className="flex-1" style={{}}>
        <View className="flex flex-1 flex-col gap-4 pb-10">
          {isPending ? (
            <LoadingSpinner />
          ) : isError ? (
            <ErrorMessage error={error} refetch={refetch} />
          ) : (
            sortedHabits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
