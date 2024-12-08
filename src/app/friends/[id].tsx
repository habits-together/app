import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { type UserIdT, useUser } from '@/api';
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
    id: UserIdT;
  }>();

  const { data, isPending, isError, error, refetch } = useUser({
    variables: { id },
  });

  return (
    <ScreenContainer>
      <Header leftButton="back" />
      <ScrollView className="flex-1" style={{}}>
        <View className="flex-1 pb-10">
          {isPending ? (
            <LoadingSpinner />
          ) : isError ? (
            <ErrorMessage error={error} refetch={refetch} />
          ) : (
            <Profile data={data} />
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
