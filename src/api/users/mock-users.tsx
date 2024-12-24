import { type RelationshipT, type UserIdT, type UserT } from './types';

export const mockUsers: UserT[] = [
  {
    id: '1' as UserIdT,
    displayName: 'John Doe',
    username: 'john_doe',
    createdAt: new Date(),
  },
  {
    id: '2' as UserIdT,
    displayName: 'Jane Doe',
    username: 'jane_doe',
    createdAt: new Date(),
  },
  {
    id: '3' as UserIdT,
    displayName: 'Apple Smith',
    username: 'apple',
    createdAt: new Date(),
  },
  {
    id: '4' as UserIdT,
    displayName: 'Bob Johnson',
    username: 'bob_johnson',
    createdAt: new Date(),
  },
  {
    id: '5' as UserIdT,
    displayName: 'Lorem Ipsum',
    username: 'lorem_ipsum',
    createdAt: new Date(),
  },
];

export const mockPictures: Record<UserIdT, string> = {
  ['1' as UserIdT]: 'https://randomuser.me/api/portraits/men/1.jpg',
  ['2' as UserIdT]: 'https://randomuser.me/api/portraits/women/3.jpg',
  ['3' as UserIdT]: 'https://randomuser.me/api/portraits/women/4.jpg',
  ['4' as UserIdT]: 'https://randomuser.me/api/portraits/men/5.jpg',
  ['5' as UserIdT]: 'https://randomuser.me/api/portraits/men/6.jpg',
};

export const mockRelationships: Record<
  UserIdT,
  Record<UserIdT, RelationshipT>
> = {
  ['1' as UserIdT]: {
    ['2' as UserIdT]: { status: 'friends', friendsSince: new Date() },
    ['4' as UserIdT]: { status: 'friends', friendsSince: new Date() },
  },
  ['2' as UserIdT]: {
    ['1' as UserIdT]: { status: 'friends', friendsSince: new Date() },
    ['4' as UserIdT]: { status: 'friends', friendsSince: new Date() },
  },
  ['4' as UserIdT]: {
    ['1' as UserIdT]: { status: 'friends', friendsSince: new Date() },
    ['2' as UserIdT]: { status: 'friends', friendsSince: new Date() },
  },
};
