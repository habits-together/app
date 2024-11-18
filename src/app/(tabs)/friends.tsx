import { router } from 'expo-router';
import { UserPlus } from 'lucide-react-native';
import React from 'react';

import { Header, ScreenContainer } from '@/ui';

export default function Friends() {
  return (
    <ScreenContainer>
      <Header
        title="Friends"
        rightButton={{
          icon: UserPlus,
          text: 'Add Friends',
          onPress: () => {
            router.push('/friends/add-friends');
          },
        }}
      />
    </ScreenContainer>
  );
}
