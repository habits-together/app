import { createQuery } from 'react-query-kit';

import { habitColors } from '@/ui/colors';

import { addTestDelay } from '../common';
import { type UserIdT } from '../users';
import { mockHabits } from './mock-habits';
import { type HabitT } from './types';

type Variables = { id: HabitT['id'] };
type Response = HabitT;

export const useHabit = createQuery<Response, Variables, Error>({
  queryKey: ['habit'],
  fetcher: async ({ id }) => {
    const dbHabit = await addTestDelay(
      mockHabits.find((habit) => habit.id === id),
    );
    if (!dbHabit) throw new Error('Habit not found');

    const { data } = dbHabit;
    return {
      id,
      ...data,
      color: habitColors[data.colorName],
      participants: Object.fromEntries(
        Object.entries(data.participants).map(
          ([participantId, participant]) => {
            if (!participant)
              throw new Error('Participant not found for habit ' + id);

            return [
              participantId,
              {
                id: participantId as UserIdT,
                displayName: participant.displayName,
                username: participant.username,
                lastActivity: new Date(participant.lastActivity),
                hasActivityToday:
                  participant.lastActivity.toLocaleDateString('en-CA') ===
                  new Date().toLocaleDateString('en-CA'),
                isOwner: participant?.isOwner ?? false,
              },
            ];
          },
        ),
      ),
    };
  },
});
