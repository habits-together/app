import { router } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
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
          icon: PlusIcon,
          text: 'New Habit',
          onPress: () => {
            router.push('/habits/edit-habit?mode=create&id=dummyid');
          },
        }}
      />
    </ScreenContainer>
  );
}
