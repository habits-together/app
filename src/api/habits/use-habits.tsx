import { createQuery } from 'react-query-kit';

import { habitColors } from '@/ui/colors';

import { addTestDelay } from '../common';
import { mockHabits } from './mock-habits';
import { type HabitT } from './types';

type Response = HabitT[];
type Variables = void;

export const useHabits = createQuery<Response, Variables, Error>({
  queryKey: ['habits'],
  fetcher: async () => {
    const dbHabits = await addTestDelay(mockHabits);

    const habits: HabitT[] = dbHabits.map(({ id: habitId, data }) => ({
      id: habitId,
      ...data,
      color: habitColors[data.colorName],
      participants: Object.fromEntries(
        Object.entries(data.participants).map(
          ([participantId, participant]) => {
            if (!participant)
              throw new Error('Participant not found for habit ' + habitId);

            return [
              participantId,
              {
                displayName: participant.displayName,
                username: participant.username,
                mostRecentCompletionDate: participant.mostRecentCompletionDate,
                hasActivityToday:
                  participant.mostRecentCompletionDate.toLocaleDateString(
                    'en-CA',
                  ) === new Date().toLocaleDateString('en-CA'),
                isOwner: participant?.isOwner ?? false,
              },
            ];
          },
        ),
      ),
    }));

    return habits;
  },
});
