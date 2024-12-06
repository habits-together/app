import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { useFriend, type UserIDT } from '@/api';
import { ErrorMessage } from '@/components/error-message';
import Profile from '@/components/profile';
import {
  Header,
  LoadingSpinner,
  ScreenContainer,
  ScrollView,
  View,
} from '@/ui';

export default function ViewProfile() {
  const { id } = useLocalSearchParams<{
    id: UserIDT;
  }>();

  const { data, isPending, isError, error, refetch } = useFriend({
    variables: { id },
  });

  return (
    <ScreenContainer>
      <Header leftButton="back" />
      <ScrollView className="flex-1" style={{}}>
        <View className="flex-1 pb-10">
          {isPending ? (
            <LoadingSpinner />
          ) : isError || !data ? (
            <ErrorMessage error={error} refetch={refetch} />
          ) : (
            <Profile data={data} isFriend={true} />
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
