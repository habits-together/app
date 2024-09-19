import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { ScreenContainer, Text } from '@/ui';
import { Header } from '@/ui/header';

/**
 * This is for editing or creating a habit. Pass in query params.
 *
 * - ex. /habits/edit-habit?mode=edit&id=n3i2e0ddj32i
 * - ex. /habits/edit-habit?mode=create&id=dummyid
 */
export default function EditHabit() {
  // query params
  const { mode, id } = useLocalSearchParams<{
    mode: 'edit' | 'create';
    id: string;
  }>();

  return (
    <ScreenContainer>
      <Header
        leftButton={'cancel'}
        title={mode === 'create' ? 'Create Habit' : 'Edit Habit'}
      />
      <Text className="text-base">
        {mode} {id}
      </Text>
    </ScreenContainer>
  );
}
