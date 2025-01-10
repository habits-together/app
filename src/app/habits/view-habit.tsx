import { router, useLocalSearchParams } from 'expo-router';
import { PenIcon } from 'lucide-react-native';
import * as React from 'react';

import { type HabitT } from '@/api';
import { Header, ScreenContainer, Text } from '@/ui';

export default function ViewHabit() {
  const { habitJson } = useLocalSearchParams<{
    habitJson: string;
  }>();
  const parsedHabit: HabitT = JSON.parse(habitJson);

  return (
    <ScreenContainer>
      <Header
        leftButton="back"
        rightButton={{
          icon: PenIcon,
          text: 'Edit Habit',
          onPress: () => {
            router.push({
              pathname: '/habits/edit-habit',
              params: { mode: 'edit', habitJson: habitJson },
            });
          },
        }}
      />
      <Text>{parsedHabit.id}</Text>
    </ScreenContainer>
  );
}
