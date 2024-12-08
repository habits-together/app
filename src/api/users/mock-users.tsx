import { type UserIdT, type UserWithFriendStatusT } from './types';

export const mockUsers: UserWithFriendStatusT[] = [
  {
    id: '1' as UserIdT,
    displayName: 'John Doe',
    username: 'john_doe',
    createdAt: new Date(),
    isFriend: true,
  },
  {
    id: '2' as UserIdT,
    displayName: 'Jane Doe',
    username: 'jane_doe',
    createdAt: new Date(),
    isFriend: true,
  },
  {
    id: '3' as UserIdT,
    displayName: 'Apple Smith',
    username: 'apple',
    createdAt: new Date(),
    isFriend: false,
  },
  {
    id: '4' as UserIdT,
    displayName: 'Bob Johnson',
    username: 'bob_johnson',
    createdAt: new Date(),
    isFriend: true,
  },
  {
    id: '5' as UserIdT,
    displayName: 'Lorem Ipsum',
    username: 'lorem_ipsum',
    createdAt: new Date(),
    isFriend: false,
  },
];

export const mockPictures: Record<UserIdT, string> = {
  ['1' as UserIdT]: 'https://randomuser.me/api/portraits/men/1.jpg',
  ['2' as UserIdT]: 'https://randomuser.me/api/portraits/women/3.jpg',
  ['3' as UserIdT]: 'https://randomuser.me/api/portraits/women/4.jpg',
  ['4' as UserIdT]: 'https://randomuser.me/api/portraits/men/5.jpg',
  ['5' as UserIdT]: 'https://randomuser.me/api/portraits/men/6.jpg',
};
