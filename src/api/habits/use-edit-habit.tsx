import { showMessage } from 'react-native-flash-message';
import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import { editHabit } from './firebase-mutations';
import { type DbHabitT, type HabitCreationT, type HabitIdT } from './types';

type Response = DbHabitT;
type Variables = {
  habitId: HabitIdT;
  newHabitInfo: HabitCreationT;
};

export const useEditHabit = createMutation<Response, Variables, Error>({
  mutationFn: async ({ habitId, newHabitInfo }) => {
    return await editHabit(habitId, newHabitInfo);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['habits'] });
    showMessage({
      message: 'Habit updated successfully',
      type: 'success',
      duration: 2000,
    });
  },
  onError: () => {
    showMessage({
      message: 'Failed to update habit',
      type: 'danger',
      duration: 2000,
    });
  },
});
