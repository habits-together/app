import { addTestDelay } from '../common';
import { type UserIdT } from '../users';
import { mockPictures } from '../users/mock-users';
import { type HabitT, type HabitWithParticipantPicturesT } from './types';

export const augmentParticipantsWithPicturesForAllHabits = async (
  habits: HabitT[],
) => {
  const habitsWithUserPictures: HabitWithParticipantPicturesT[] = habits.map(
    (habit) => ({
      ...habit,
      participants: Object.fromEntries(
        Object.entries(habit.participants).map(([id, participant]) => {
          try {
            const picture = mockPictures[id as UserIdT];
            return [
              id,
              {
                ...participant,
                picture: {
                  url: picture,
                  isPending: false,
                  isError: false,
                  error: null,
                },
              },
            ];
          } catch (error) {
            return [
              id,
              {
                ...participant,
                picture: {
                  url: null,
                  isPending: false,
                  isError: true,
                  error: error as string,
                },
              },
            ];
          }
        }),
      ),
    }),
  );
  return addTestDelay(habitsWithUserPictures);
};
