import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { SafeAreaView, Text } from '@/ui';

export const ViewHabit = () => {
  // id automatically passed in from the route
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  return (
    <SafeAreaView className="flex-1">
      <Text className="text-base">{id}</Text>
    </SafeAreaView>
  );
};
