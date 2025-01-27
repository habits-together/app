import { createQuery } from 'react-query-kit';

import { type UserIdT } from '../users';
import {
  getAllUsersHabitCompletions,
  getHabitCompletions,
} from './firebase-queries';
import { type HabitCompletionWithDateInfoT, type HabitIdT } from './types';

type SingleUserHabitCompletionsResponse = HabitCompletionWithDateInfoT[];
type SingleUserHabitCompletionsVariables = {
  habitId: HabitIdT;
  userId: UserIdT;
  numDays: number;
};

export const useHabitCompletions = createQuery<
  SingleUserHabitCompletionsResponse,
  SingleUserHabitCompletionsVariables,
  Error
>({
  queryKey: ['habit-completions'],
  fetcher: async (variables) => {
    return await getHabitCompletions(
      variables.habitId,
      variables.userId,
      variables.numDays,
    );
  },
});

type AllUsersHabitCompletionsResponse = {
  [key: UserIdT]: HabitCompletionWithDateInfoT[];
};
type AllUsersHabitCompletionsVariables = {
  habitId: HabitIdT;
  numDays: number;
};

export const useAllUsersHabitCompletions = createQuery<
  AllUsersHabitCompletionsResponse,
  AllUsersHabitCompletionsVariables,
  Error
>({
  queryKey: ['all-users-habit-completions'],
  fetcher: async (variables) => {
    return await getAllUsersHabitCompletions(
      variables.habitId,
      variables.numDays,
    );
  },
});
