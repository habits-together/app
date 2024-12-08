import { createQuery } from 'react-query-kit';

import { addTestDelay, queryClient } from '../common';
import { loadingPicture } from '../users';
import { augmentParticipantsWithPicturesForAllHabits } from './augment-participant-pictures';
import { mockHabits } from './mock-habits';
import { type HabitWithParticipantPicturesT } from './types';

type Response = HabitWithParticipantPicturesT[];
type Variables = void;

export const useHabits = createQuery<Response, Variables, Error>({
  queryKey: ['habits'],
  fetcher: async () => {
    const habits = await addTestDelay(mockHabits);
    const habitsWithUserPictures: HabitWithParticipantPicturesT[] = habits.map(
      (habit) => ({
        ...habit,
        participants: Object.fromEntries(
          Object.entries(habit.participants).map(([id, participant]) => {
            if (!participant)
              throw new Error('Participant not found for habit ' + habit.title);

            return [
              id,
              {
                displayName: participant.displayName,
                username: participant.username,
                mostRecentCompletionDate: participant.mostRecentCompletionDate,
                picture: loadingPicture,
                isOwner: participant?.isOwner ?? false,
              },
            ];
          }),
        ),
      }),
    );

    augmentParticipantsWithPicturesForAllHabits(habitsWithUserPictures).then(
      (augmentedHabits) => {
        queryClient.setQueryData(['habits'], augmentedHabits);
      },
    );

    return habitsWithUserPictures;
  },
});
