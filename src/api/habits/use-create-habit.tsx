import { showMessage } from 'react-native-flash-message';
import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import { createHabit } from './firebase-mutations';
import { type DbHabitT, type HabitCreationT } from './types';

type Response = DbHabitT;
type Variables = {
  habitCreationInfo: HabitCreationT;
};

export const useCreateHabit = createMutation<Response, Variables, Error>({
  mutationFn: async (variables) => {
    return await createHabit(variables.habitCreationInfo);
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
