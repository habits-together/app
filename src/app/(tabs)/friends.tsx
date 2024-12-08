import { router } from 'expo-router';
import { UserPlus } from 'lucide-react-native';
import React from 'react';

import { type UserIDT } from '@/api';
import UserCard, { type CompleteUserT } from '@/components/user-card';
import { Header, ScreenContainer } from '@/ui';

const mockFriends: CompleteUserT[] = [
  {
    id: '1' as UserIDT,
    displayName: 'John Doe',
    username: 'john_doe',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2' as UserIDT,
    displayName: 'Jane Doe',
    username: 'jane_doe',
    createdAt: new Date(),
    picture: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

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
      {mockFriends.map((friend) => (
        <UserCard key={friend.id} data={friend} />
      ))}
    </ScreenContainer>
  );
}
