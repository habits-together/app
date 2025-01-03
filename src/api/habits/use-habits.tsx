import { collection, getDocs } from 'firebase/firestore';
import { createQuery } from 'react-query-kit';

import { habitColors } from '@/ui/colors';

import { addTestDelay } from '../common';
import { firestore } from '../config';
import { mockHabits } from './mock-habits';
import { type HabitT } from './types';

type Response = HabitT[];
type Variables = void;

export const useHabits = createQuery<Response, Variables, Error>({
  queryKey: ['habits'],
  fetcher: async () => {
    const dbHabits = await addTestDelay(mockHabits);
    console.log("MOD's twin sister furgis");

    const habitsCollection = collection(firestore, 'habits');

    // Fetch all documents from the collection
    const snapshot = await getDocs(habitsCollection);

    // Map through documents and print each habit
    snapshot.forEach((doc) => {
      console.log(`Habit ID: ${doc.id}`, doc.data());
    });

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
