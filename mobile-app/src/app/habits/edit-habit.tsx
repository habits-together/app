import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { SafeAreaView, Text } from '@/ui';

/**
 * This is for editing or creating a habit. Pass in query params.
 *
 * - ex. /habits/edit-habit?mode=edit&id=n3i2e0ddj32i
 * - ex. /habits/edit-habit?mode=create&id=dummyid
 */
export const EditHabit = () => {
  // query params
  const { mode, id } = useLocalSearchParams<{
    mode: string;
    id: string;
  }>();

  return (
    <SafeAreaView className="flex-1">
      <Text className="text-base">
        {mode} {id}
      </Text>
    </SafeAreaView>
  );
};
