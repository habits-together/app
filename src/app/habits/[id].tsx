import { router, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { Header, ScreenContainer, Text } from '@/ui';

export default function ViewHabit() {
  // id automatically passed in from the route
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  return (
    <ScreenContainer>
      <Header
        leftButton="back"
        rightButton={{
          text: 'Edit Habit',
          onPress: () => {
            router.push('/habits/edit-habit?mode=edit&id=dummyid');
          },
        }}
      />
      <Text>{id}</Text>
    </ScreenContainer>
  );
}
