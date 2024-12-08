import { router } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import React from 'react';

import { useHabits } from '@/api';
import { ErrorMessage } from '@/components/error-message';
import { HabitCard } from '@/components/habit-card';
import {
  Header,
  LoadingSpinner,
  ScreenContainer,
  ScrollView,
  View,
} from '@/ui';

export default function Habits() {
  const { data, isPending, isError, error, refetch } = useHabits();

  return (
    <ScreenContainer>
      <Header
        title="Habits"
        rightButton={{
          icon: PlusIcon,
          text: 'New Habit',
          onPress: () => {
            router.push('/habits/edit-habit?mode=create&id=dummyid');
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
            data.map((habit) => <HabitCard key={habit.id} habit={habit} />)
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
