import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { SafeAreaView, Text } from '@/ui';

export const InviteFriends = () => {
  // query params
  const { habit_id } = useLocalSearchParams<{
    habit_id: string;
  }>();

  return (
    <SafeAreaView className="flex-1">
      <Text className="text-base">{habit_id}</Text>
    </SafeAreaView>
  );
};
