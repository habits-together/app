import { useRouter } from 'expo-router';
import React from 'react';

import { useIsFirstTime } from '@/core/hooks';
import { Button, ScreenContainer, Text, View } from '@/ui';

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  return (
    <ScreenContainer className="flex h-full items-center  justify-center">
      <View className="justify-end ">
        <Text className="my-3 text-center text-5xl font-bold">Starter</Text>
        <Text className="mb-2 text-center text-lg text-gray-600">
          The right way to build your mobile app
        </Text>

        <Text className="my-1 pt-6 text-left text-lg">
          🚀 Production-ready{' '}
        </Text>
        <Text className="my-1 text-left text-lg">
          🥷 Developer experience + Productivity
        </Text>
        <Text className="my-1 text-left text-lg">
          🧩 Minimal code and dependencies
        </Text>
        <Text className="my-1 text-left text-lg">
          💪 well maintained third-party libraries
        </Text>
      </View>
      <View className="mt-6">
        <Button
          label="Let's Get Started "
          onPress={() => {
            setIsFirstTime(false);
            router.replace('/auth');
          }}
        />
      </View>
    </ScreenContainer>
  );
}
