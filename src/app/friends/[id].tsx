import * as React from 'react';

import { type UserIDT } from '@/api';
import Profile from '@/components/profile';
import { type CompleteUserT } from '@/components/user-card';
import { Header, ScreenContainer } from '@/ui';

const mockUser: CompleteUserT = {
  id: '1' as UserIDT,
  displayName: 'John Doe',
  username: 'john_doe',
  createdAt: new Date(),
  picture: 'https://randomuser.me/api/portraits/men/1.jpg',
};

export default function ViewProfile() {
  // id automatically passed in from the route
  // const { id } = useLocalSearchParams<{
  //   id: string;
  // }>();

  return (
    <ScreenContainer>
      <Header leftButton="back" />
      <Profile data={mockUser} isFriend={true} />
    </ScreenContainer>
  );
}
