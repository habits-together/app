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
      title: 'Stay Hydrated',
      goal: {
        period: 'daily',
        completionsPerPeriod: 8,
      },
      icon: '💧',
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
      title: 'Daily Exercise',
      goal: {
        period: 'daily',
        completionsPerPeriod: 2,
      },
      icon: '🏃',
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
      title: 'Daily Reading',
      goal: {
        period: 'daily',
        completionsPerPeriod: 1,
      },
      icon: '📚',
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
  Object.assign(mockHabits, newHabits);
};

export const mockHabitCompletions: Record<HabitIdT, AllCompletionsT> = {
  ['1' as HabitIdT]: {
    ['1' as UserIdT]: {
      completions: {
        '2024-12-04': 0,
        '2024-12-05': 1,
        '2024-12-06': 1,
      },
    },
    ['2' as UserIdT]: {
      completions: {
        '2024-12-04': 2,
        '2024-12-05': 3,
        '2024-12-06': 1,
      },
    },
    ['3' as UserIdT]: {
      completions: {
        '2024-12-04': 1,
        '2024-12-05': 2,
        '2024-12-06': 2,
      },
    },
    ['4' as UserIdT]: {
      completions: {
        '2024-12-04': 3,
        '2024-12-05': 1,
        '2024-12-06': 0,
      },
    },
    ['4' as UserIdT]: {
      completions: {
        '2024-12-04': 3,
        '2024-12-05': 1,
        '2024-12-06': 0,
      },
    },
  },
  ['2' as HabitIdT]: {
    ['1' as UserIdT]: {
      completions: {
        '2024-12-04': 1,
        '2024-12-05': 0,
        '2024-12-06': 1,
      },
    },
  },
  ['3' as HabitIdT]: {
    ['1' as UserIdT]: {
      completions: {
        '2024-12-04': 0,
        '2024-12-05': 0,
        '2024-12-06': 1,
      },
    },
  },
};
export const setMockHabitCompletions = (
  newCompletions: Record<HabitIdT, AllCompletionsT>,
) => {
  Object.assign(mockHabitCompletions, newCompletions);
};
