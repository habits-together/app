import { showMessage } from 'react-native-flash-message';
import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import { deleteHabit } from './firebase-mutations';
import { type DbHabitT, type HabitIdT } from './types';

type Response = DbHabitT;
type Variables = {
  habitId: HabitIdT;
};

export const useDeleteHabit = createMutation<Response, Variables, Error>({
  mutationFn: async ({ habitId }) => {
    await deleteHabit(habitId);
    return {} as DbHabitT; // Return type is required but not used
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
