import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { Header, ScreenContainer, Text } from '@/ui';

export default function InviteFriends() {
  // query params
  const { habit_id } = useLocalSearchParams<{
    habit_id: string;
  }>();

  return (
    <ScreenContainer>
      <Header title="Invite Friends" leftButton="back" />
      <Text className="text-base">{habit_id}</Text>
    </ScreenContainer>
  );
}
