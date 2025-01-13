import {
  type AllCompletionsT,
  type DbHabitT,
  type HabitIdT,
  type UserIdT,
} from '@/api';

export const mockHabits: { id: HabitIdT; data: DbHabitT }[] = [
  {
    id: '1' as HabitIdT,
    data: {
      colorName: 'orange',
      createdAt: new Date('2024-01-01T00:00:00'),
      description: 'Drink 8 glasses of water daily',
      title: 'Drink a Glass of Water',
      settings: {
        allowMultipleCompletions: true,
      },
      icon: 'glassWater',
      participants: {
        ['1' as UserIdT]: {
          displayName: 'John Doe',
          username: 'john_doe',
          lastActivity: new Date('2024-12-01T00:00:00'),
          isOwner: true,
        },
        ['2' as UserIdT]: {
          displayName: 'Jane Doe',
          username: 'jane_doe',
          lastActivity: new Date('2025-01-11T00:00:00'),
          isOwner: false,
        },
        ['3' as UserIdT]: {
          displayName: 'Apple Smith',
          username: 'apple',
          lastActivity: new Date('2024-12-08T00:00:00'),
          isOwner: false,
        },
        ['4' as UserIdT]: {
          displayName: 'Bob Johnson',
          username: 'bob_johnson',
          lastActivity: new Date('2024-12-07T00:00:00'),
          isOwner: false,
        },
        ['5' as UserIdT]: {
          displayName: 'Lorem Ipsum',
          username: 'lorem_ipsum',
          lastActivity: new Date('2024-12-03T00:00:00'),
          isOwner: false,
        },
      },
    },
  },
  {
    id: '2' as HabitIdT,
    data: {
      colorName: 'green',
      createdAt: new Date('2024-01-02T00:00:00'),
      description: 'Go for a 30-minute run',
      title: 'Exercise',
      settings: {
        allowMultipleCompletions: false,
      },
      icon: 'dumbbell',
      participants: {
        ['1' as UserIdT]: {
          displayName: 'John Doe',
          username: 'john_doe',
          lastActivity: new Date('2024-01-15T00:00:00'),
          isOwner: true,
        },
      },
    },
  },
  {
    id: '3' as HabitIdT,
    data: {
      colorName: 'purple',
      createdAt: new Date('2024-01-03T00:00:00'),
      description: 'Read for 20 minutes before bed',
      title: 'Reading',
      settings: {
        allowMultipleCompletions: false,
      },
      icon: 'book',
      participants: {
        ['1' as UserIdT]: {
          displayName: 'John Doe',
          username: 'john_doe',
          lastActivity: new Date('2024-12-01T00:00:00'),
        },
        ['6' as UserIdT]: {
          displayName: 'Sarah Wilson',
          username: 'sarah_wilson',
          lastActivity: new Date('2024-12-15T00:00:00'),
          isOwner: true,
        },
      },
    },
  },
  {
    id: '4' as HabitIdT,
    data: {
      colorName: 'blue',
      createdAt: new Date('2024-01-04T00:00:00'),
      description: 'Meditate for 10 minutes',
      title: 'Daily Meditation',
      settings: {
        allowMultipleCompletions: false,
      },
      icon: 'star',
      participants: {
        ['2' as UserIdT]: {
          displayName: 'Jane Doe',
          username: 'jane_doe',
          lastActivity: new Date('2024-12-15T00:00:00'),
          isOwner: true,
        },
        ['4' as UserIdT]: {
          displayName: 'Bob Johnson',
          username: 'bob_johnson',
          lastActivity: new Date('2024-12-14T00:00:00'),
          isOwner: false,
        },
      },
    },
  },
];
export const setMockHabits = (
  newHabits: { id: HabitIdT; data: DbHabitT }[],
) => {
  mockHabits.length = 0;
  mockHabits.push(...newHabits);
};

export const mockHabitCompletions: Record<HabitIdT, AllCompletionsT> = {
  ['1' as HabitIdT]: {
    ['1' as UserIdT]: {
      entries: {
        '2024-12-04': { numberOfCompletions: 0 },
        '2024-12-05': { numberOfCompletions: 1 },
        '2024-12-06': { numberOfCompletions: 1 },
        '2024-12-18': {
          numberOfCompletions: 1,
          note: 'Drank 8 glasses of water today!',
        },
      },
    },
    ['2' as UserIdT]: {
      entries: {
        '2024-12-04': { numberOfCompletions: 2 },
        '2024-12-05': { numberOfCompletions: 3 },
        '2024-12-06': { numberOfCompletions: 1 },
        '2025-01-11': { numberOfCompletions: 1, note: 'Drank 8 glasses' },
      },
    },
    ['3' as UserIdT]: {
      entries: {
        '2024-12-04': { numberOfCompletions: 1 },
        '2024-12-05': { numberOfCompletions: 2 },
        '2024-12-06': { numberOfCompletions: 2 },
      },
    },
    ['4' as UserIdT]: {
      entries: {
        '2024-12-04': { numberOfCompletions: 3 },
        '2024-12-05': { numberOfCompletions: 1 },
        '2024-12-06': { numberOfCompletions: 0 },
      },
    },
    ['5' as UserIdT]: {
      entries: {
        '2024-12-04': { numberOfCompletions: 3 },
        '2024-12-05': { numberOfCompletions: 1 },
        '2024-12-06': { numberOfCompletions: 0 },
      },
    },
  },
  ['2' as HabitIdT]: {
    ['1' as UserIdT]: {
      entries: {
        '2024-12-04': { numberOfCompletions: 1 },
        '2024-12-05': { numberOfCompletions: 0 },
        '2024-12-06': { numberOfCompletions: 1 },
      },
    },
  },
  ['3' as HabitIdT]: {
    ['1' as UserIdT]: {
      entries: {
        '2024-12-04': { numberOfCompletions: 0 },
        '2024-12-05': { numberOfCompletions: 0 },
        '2024-12-06': { numberOfCompletions: 1 },
      },
    },
    ['6' as UserIdT]: {
      entries: {
        '2024-12-13': { numberOfCompletions: 1 },
        '2024-12-14': { numberOfCompletions: 1 },
        '2024-12-15': { numberOfCompletions: 1, note: 'Great book tonight!' },
      },
    },
  },
};
export const setMockHabitCompletions = (
  newCompletions: Record<HabitIdT, AllCompletionsT>,
) => {
  Object.assign(mockHabitCompletions, newCompletions);
};
