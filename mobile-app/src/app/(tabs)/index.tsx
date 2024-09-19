import { router } from 'expo-router';
import React from 'react';

// import { usePosts } from '@/api';
import { Header, ScreenContainer } from '@/ui';

export default function Habits() {
  // const { data, isPending, isError } = usePosts();

  return (
    <ScreenContainer>
      <Header
        title="Habits"
        rightButton={{
          text: 'Add',
          onPress: () => {
            router.push('/habits/edit-habit?mode=create&id=dummyid');
          },
        }}
      />
    </ScreenContainer>
  );
}
