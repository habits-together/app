import { type HabitIdT, type HabitWithCompletionsT, type UserIdT } from '@/api';
import { habitColors } from '@/ui/colors';

export const mockHabits: HabitWithCompletionsT[] = [
  {
    id: '1' as HabitIdT,
    color: habitColors.orange,
    createdAt: new Date('2024-01-01'),
    description: 'Drink 8 glasses of water daily',
    title: 'Stay Hydrated',
    goal: {
      period: 'daily',
      completionsPerPeriod: 8,
    },
    icon: '💧',
    participants: {
      user1: {
        displayName: 'John Doe',
        username: 'johndoe',
        mostRecentCompletionDate: new Date('2024-01-15'),
        isOwner: true,
      },
    },
    participantCompletions: {
      ['1' as UserIdT]: {
        completions: {
          '2024-12-06': 1,
          '2024-12-05': 2,
        },
      },
    },
  },
  {
    id: '2' as HabitIdT,
    color: habitColors.green,
    createdAt: new Date('2024-01-02'),
    description: 'Go for a 30-minute run',
    title: 'Daily Exercise',
    goal: {
      period: 'daily',
      completionsPerPeriod: 2,
    },
    icon: '🏃',
    participants: {
      user2: {
        displayName: 'Jane Smith',
        username: 'janesmith',
        mostRecentCompletionDate: new Date('2024-01-15'),
        isOwner: true,
      },
    },
    participantCompletions: {
      ['1' as UserIdT]: {
        completions: {
          '2024-12-06': 1,
          '2024-12-05': 2,
        },
      },
    },
  },
  {
    id: '3' as HabitIdT,
    color: habitColors.purple,
    createdAt: new Date('2024-01-03'),
    description: 'Read for 20 minutes before bed',
    title: 'Daily Reading',
    goal: {
      period: 'daily',
      completionsPerPeriod: 1,
    },
    icon: '📚',
    participants: {
      user3: {
        displayName: 'Alex Chen',
        username: 'alexchen',
        mostRecentCompletionDate: new Date('2024-01-15'),
        isOwner: true,
      },
    },
    participantCompletions: {
      ['1' as UserIdT]: {
        completions: {
          '2024-12-06': 1,
          '2024-12-05': 1,
        },
      },
    },
  },
];
