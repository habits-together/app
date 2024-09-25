import { router } from 'expo-router';
import React from 'react';

import { Header, ScreenContainer } from '@/ui';

export default function Friends() {
  return (
    <ScreenContainer>
      <Header
        title="Friends"
        rightButton={{
          text: 'Add Friends',
          onPress: () => {
            router.push('/friends/add-friends');
          },
        }}
      />
    </ScreenContainer>
  );
}
