import { router } from 'expo-router';
import { UserPlus } from 'lucide-react-native';
import React from 'react';

import { useFriends } from '@/api';
import { ErrorMessage } from '@/components/error-message';
import UserCard from '@/components/user-card';
import {
  Header,
  LoadingSpinner,
  ScreenContainer,
  ScrollView,
  View,
} from '@/ui';

export default function Friends() {
  const { data, isPending, isError, error, refetch } = useFriends();

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
      <ScrollView className="flex-1" style={{}}>
        <View className="flex-1 pb-10">
          {isPending ? (
            <LoadingSpinner />
          ) : isError ? (
            <ErrorMessage error={error} refetch={refetch} />
          ) : (
            data.map((friend) => <UserCard key={friend.id} data={friend} />)
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
