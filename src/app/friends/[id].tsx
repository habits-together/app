import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { Header, ScreenContainer, Text } from '@/ui';

export default function ViewProfile() {
  // id automatically passed in from the route
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  return (
    <ScreenContainer className="flex-1">
      <Header leftButton="back" />
      <Text className="text-base">{id}</Text>
    </ScreenContainer>
  );
}
