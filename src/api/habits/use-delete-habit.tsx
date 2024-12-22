import { showMessage } from 'react-native-flash-message';
import { createMutation } from 'react-query-kit';

import { removeHabitFromOrder } from '@/core';

import { addTestDelay, queryClient } from '../common';
import { mockHabits, setMockHabits } from './mock-habits';
import { type DbHabitT, type HabitIdT } from './types';

type Response = DbHabitT;
type Variables = {
  habitId: HabitIdT;
};

export const useDeleteHabit = createMutation<Response, Variables, Error>({
  mutationFn: async ({ habitId }) => {
    const habit = mockHabits.find((h) => h.id === habitId);
    if (!habit) throw new Error('Habit not found');

    const updatedHabits = mockHabits.filter((h) => h.id !== habitId);
    setMockHabits(updatedHabits);
    removeHabitFromOrder(habitId);

    await addTestDelay(null);
    return habit.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['habits'] });
    showMessage({
      message: 'Habit deleted successfully',
      type: 'success',
      duration: 2000,
    });
  },
  onError: () => {
    showMessage({
      message: 'Failed to delete habit',
      type: 'danger',
      duration: 2000,
    });
  },
});
