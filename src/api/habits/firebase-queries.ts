import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  type Timestamp,
  where,
} from 'firebase/firestore';

import { habitColors } from '@/ui/colors';

import { db } from '../common/firebase';
import { type UserIdT } from '../users';
import {
  type DbHabitT,
  type HabitCompletionWithDateInfoT,
  type HabitIdT,
  type HabitT,
} from './types';

const convertTimestampToDate = (timestamp: Timestamp) => timestamp.toDate();

export const getHabitById = async (id: HabitIdT): Promise<HabitT | null> => {
  const habitDoc = await getDoc(doc(db, 'habits', id));
  if (!habitDoc.exists()) return null;

  const data = habitDoc.data() as DbHabitT;
  return {
    id: habitDoc.id as HabitIdT,
    ...data,
    createdAt: convertTimestampToDate(data.createdAt as Timestamp),
    color: habitColors[data.colorName],
    participants: Object.fromEntries(
      Object.entries(data.participants).map(([participantId, participant]) => {
        if (!participant)
          throw new Error('Participant not found for habit ' + id);

        const lastActivity = convertTimestampToDate(
          participant.lastActivity as Timestamp,
        );

        return [
          participantId,
          {
            id: participantId as UserIdT,
            displayName: participant.displayName,
            username: participant.username,
            lastActivity,
            hasActivityToday:
              lastActivity.toLocaleDateString('en-CA') ===
              new Date().toLocaleDateString('en-CA'),
            isOwner: participant?.isOwner ?? false,
          },
        ];
      }),
    ),
  };
};

export const getHabits = async (userId: UserIdT): Promise<HabitT[]> => {
  const habitsRef = collection(db, 'habits');
  const q = query(habitsRef, where(`participants.${userId}`, '!=', null));
  const querySnapshot = await getDocs(q);

  return Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const habit = await getHabitById(doc.id as HabitIdT);
      if (!habit) throw new Error('Habit not found');
      return habit;
    }),
  );
};

export const getHabitCompletions = async (
  habitId: HabitIdT,
  userId: UserIdT,
  numDays: number,
): Promise<HabitCompletionWithDateInfoT[]> => {
  const completionsDoc = await getDoc(
    doc(db, 'habitCompletions', `${habitId}_${userId}`),
  );

  const entries = completionsDoc.exists() ? completionsDoc.data().entries : {};

  const structuredCompletionData: HabitCompletionWithDateInfoT[] = [];

  let currentDate = new Date();
  // go back to the first day we want to display
  currentDate.setDate(currentDate.getDate() - numDays + 1);
  // loop through each day and add the completion data for that day to the structured data
  for (let i = 0; i < numDays; i++) {
    const dateString = currentDate.toLocaleDateString('en-CA');
    // if there is no completion data for the current date, default to 0 (no completions that day)
    structuredCompletionData.push({
      numberOfCompletions: entries?.[dateString]?.numberOfCompletions ?? 0,
      dayOfTheMonth: currentDate.getDate(),
      dayOfTheWeek: currentDate.toLocaleString('en-US', { weekday: 'short' }),
      date: currentDate.toLocaleDateString('en-CA'),
      note: entries?.[dateString]?.note,
      image: entries?.[dateString]?.image,
    });
    // move current date ahead 1 day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return structuredCompletionData;
};

export const getAllUsersHabitCompletions = async (
  habitId: HabitIdT,
  numDays: number,
): Promise<{ [key: UserIdT]: HabitCompletionWithDateInfoT[] }> => {
  const completionsRef = collection(db, 'habitCompletions');
  const q = query(completionsRef, where('habitId', '==', habitId));
  const querySnapshot = await getDocs(q);

  const result: { [key: UserIdT]: HabitCompletionWithDateInfoT[] } = {};
  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const userId = doc.data().userId as UserIdT;
      result[userId] = await getHabitCompletions(habitId, userId, numDays);
    }),
  );

  return result;
};
