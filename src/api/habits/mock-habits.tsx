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
          username: 'johndoe',
          mostRecentCompletionDate: new Date('2024-12-01T00:00:00'),
          isOwner: true,
        },
        ['2' as UserIdT]: {
          displayName: 'Sarah Johnson',
          username: 'sarahj',
          mostRecentCompletionDate: new Date('2024-12-08T00:00:00'),
          isOwner: false,
        },
        ['3' as UserIdT]: {
          displayName: 'Mike Wilson',
          username: 'mikew',
          mostRecentCompletionDate: new Date('2024-12-08T00:00:00'),
          isOwner: false,
        },
        ['4' as UserIdT]: {
          displayName: 'Emily Brown',
          username: 'emilyb',
          mostRecentCompletionDate: new Date('2024-12-07T00:00:00'),
          isOwner: false,
        },
        ['5' as UserIdT]: {
          displayName: 'Chris Lee',
          username: 'chrisl',
          mostRecentCompletionDate: new Date('2024-12-03T00:00:00'),
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
          displayName: 'Jane Smith',
          username: 'janesmith',
          mostRecentCompletionDate: new Date('2024-01-15T00:00:00'),
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
          displayName: 'Alex Chen',
          username: 'alexchen',
          mostRecentCompletionDate: new Date('2024-12-01T00:00:00'),
          isOwner: true,
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
  },
};
export const setMockHabitCompletions = (
  newCompletions: Record<HabitIdT, AllCompletionsT>,
) => {
  Object.assign(mockHabitCompletions, newCompletions);
};
