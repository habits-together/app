import { showMessage } from 'react-native-flash-message';
import { createMutation } from 'react-query-kit';

import { addHabitToOrder } from '@/core';

import { type HabitColorNameT } from '../colors-schemas';
import { addTestDelay, queryClient } from '../common';
import { type UserIdT } from '../users';
import {
  mockHabits,
  setMockHabitCompletions,
  setMockHabits,
} from './mock-habits';
import { type DbHabitT, type HabitCreationT, type HabitIdT } from './types';

type Response = DbHabitT;
type Variables = {
  habitCreationInfo: HabitCreationT;
};

export const useCreateHabit = createMutation<Response, Variables, Error>({
  mutationFn: async (variables) => {
    const newHabit: DbHabitT = {
      title: variables.habitCreationInfo.title,
      description: variables.habitCreationInfo.description,
      colorName: variables.habitCreationInfo.colorName as HabitColorNameT,
      icon: variables.habitCreationInfo.icon,
      settings: {
        allowMultipleCompletions:
          variables.habitCreationInfo.allowMultipleCompletions,
      },
      participants: {
        ['1' as UserIdT]: {
          displayName: 'Alex Chen',
          username: 'alexchen',
          lastActivity: new Date(),
          isOwner: true,
        },
      },
      createdAt: new Date(),
    };

    const id = Math.random().toString() as HabitIdT;

    setMockHabits([...mockHabits, { id: id, data: newHabit }]);

    setMockHabitCompletions(
      Object.assign({}, setMockHabitCompletions, {
        [id]: {
          ['1' as UserIdT]: {
            entries: {},
          },
        },
      }),
    );

    addHabitToOrder(id);

    return await addTestDelay(newHabit);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['habits'] });
  },
  onError: () => {
    showMessage({
      message: 'Failed to create habit',
      type: 'danger',
      duration: 2000,
    });
  },
});
