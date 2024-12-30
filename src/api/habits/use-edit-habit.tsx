import { showMessage } from 'react-native-flash-message';
import { createMutation } from 'react-query-kit';

import { addTestDelay, queryClient } from '../common';
import { mockHabits, setMockHabits } from './mock-habits';
import { type DbHabitT, type HabitCreationT, type HabitIdT } from './types';

type Response = DbHabitT;
type Variables = {
  habitId: HabitIdT;
  newHabitInfo: HabitCreationT;
};

export const useEditHabit = createMutation<Response, Variables, Error>({
  mutationFn: async ({ habitId, newHabitInfo }) => {
    const habitIndex = mockHabits.findIndex((h) => h.id === habitId);
    if (habitIndex === -1) throw new Error('Habit not found');

    const updatedHabit = {
      ...mockHabits[habitIndex].data,
      ...newHabitInfo,
      colorName: newHabitInfo.colorName as DbHabitT['colorName'],
      settings: {
        ...mockHabits[habitIndex].data.settings,
        allowMultipleCompletions:
          newHabitInfo.allowMultipleCompletions ??
          mockHabits[habitIndex].data.settings.allowMultipleCompletions,
      },
    };

    const newMockHabits = [...mockHabits];
    newMockHabits[habitIndex] = { id: habitId, data: updatedHabit };
    setMockHabits(newMockHabits);

    return await addTestDelay(updatedHabit);
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
