import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { ScreenContainer, Text } from '@/ui';
import { Header } from '@/ui/header';

/**
 * This is for editing or creating a the user profile. Pass in query params.
 *
 * - ex. /settings/edit-profile?mode=edit&id=n3i2e0ddj32i
 * - ex. /settings/edit-profile?mode=create&id=dummyid
 */
export default function EditProfile() {
  // query params
  const { mode, id } = useLocalSearchParams<{
    mode: 'edit' | 'create';
    id: string;
  }>();

  return (
    <ScreenContainer>
      <Header
        leftButton={'cancel'}
        title={mode === 'create' ? 'Create Profile' : 'Edit Profile'}
      />
      <Text>
        {mode} {id}
      </Text>
    </ScreenContainer>
  );
}
