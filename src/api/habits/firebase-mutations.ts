import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  type FieldValue,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { getCurrentUserId } from '@/core/auth';
import { type habitColors } from '@/ui/colors';

import { db } from '../common/firebase';
import {
  getUserById,
  getUserWithRelationshipById,
  type UserIdT,
} from '../users';
import {
  type DbHabitT,
  type DbParticipantT,
  type HabitCreationT,
  type HabitEntryT,
  type HabitIdT,
} from './types';

type ColorName = keyof typeof habitColors;

export const createHabit = async (
  habitCreationInfo: HabitCreationT,
): Promise<DbHabitT> => {
  const myId = getCurrentUserId();
  const currentUserData = await getUserById(myId);
  if (currentUserData == null) throw new Error('User data not found');

  const newHabit = {
    title: habitCreationInfo.title,
    description: habitCreationInfo.description,
    colorName: habitCreationInfo.colorName as ColorName,
    icon: habitCreationInfo.icon,
    settings: {
      allowMultipleCompletions: habitCreationInfo.allowMultipleCompletions,
    },
    participants: {
      [myId]: {
        displayName: currentUserData.displayName,
        username: currentUserData.username,
        lastActivity: serverTimestamp(),
        isOwner: true,
      } satisfies Omit<DbParticipantT, 'lastActivity'> & {
        lastActivity: FieldValue;
      },
    },
    createdAt: serverTimestamp(),
  } satisfies Omit<DbHabitT, 'lastActivity' | 'createdAt'> & {
    createdAt: FieldValue;
  };

  const docRef = await addDoc(collection(db, 'habits'), newHabit);
  const created = await getDoc(docRef);
  if (!created.exists()) throw new Error('Failed to create habit');
  return created.data() as DbHabitT;
};

export const deleteHabit = async (habitId: HabitIdT): Promise<void> => {
  await deleteDoc(doc(db, 'habits', habitId));
};

export const editHabit = async (
  habitId: HabitIdT,
  newHabitInfo: HabitCreationT,
): Promise<DbHabitT> => {
  const habitRef = doc(db, 'habits', habitId);
  const habitDoc = await getDoc(habitRef);
  if (!habitDoc.exists()) throw new Error('Habit not found');

  const data = habitDoc.data() as DbHabitT;
  const updatedHabit = {
    ...data,
    title: newHabitInfo.title,
    description: newHabitInfo.description,
    colorName: newHabitInfo.colorName as ColorName,
    icon: newHabitInfo.icon,
    settings: {
      ...data.settings,
      allowMultipleCompletions: newHabitInfo.allowMultipleCompletions,
    },
  } satisfies DbHabitT;

  await updateDoc(habitRef, updatedHabit);
  return updatedHabit;
};

export const acceptHabitInvite = async (habitId: HabitIdT): Promise<void> => {
  const myId = getCurrentUserId();
  const me = await getUserWithRelationshipById(myId);
  if (!me) throw new Error('User not found');

  const habitRef = doc(db, 'habits', habitId);
  const habitDoc = await getDoc(habitRef);
  if (!habitDoc.exists()) throw new Error('Habit not found');

  // Add the user as a participant
  await updateDoc(habitRef, {
    [`participants.${myId}`]: {
      displayName: me.displayName,
      username: me.username,
      lastActivity: serverTimestamp(),
      isOwner: false,
    } satisfies Omit<DbParticipantT, 'lastActivity'> & {
      lastActivity: FieldValue;
    },
  });
};

export const modifyHabitEntry = async (
  habitId: HabitIdT,
  userId: UserIdT,
  date: string,
  modifiedEntry: HabitEntryT,
): Promise<void> => {
  const completionsRef = doc(db, 'habitCompletions', `${habitId}_${userId}`);
  const completionsDoc = await getDoc(completionsRef);

  // Clean up the entry by removing undefined values
  const cleanEntry = {
    numberOfCompletions: modifiedEntry.numberOfCompletions,
    ...(modifiedEntry.note && { note: modifiedEntry.note }),
    ...(modifiedEntry.image && { image: modifiedEntry.image }),
  };

  if (!completionsDoc.exists()) {
    await setDoc(completionsRef, {
      habitId,
      userId,
      entries: {
        [date]: cleanEntry,
      },
    });
  } else {
    await updateDoc(completionsRef, {
      [`entries.${date}`]: cleanEntry,
    });
  }

  // Update last activity
  const habitRef = doc(db, 'habits', habitId);
  const habitDoc = await getDoc(habitRef);
  if (!habitDoc.exists()) throw new Error('Habit not found');

  await updateDoc(habitRef, {
    [`participants.${userId}.lastActivity`]: serverTimestamp(),
  });
};
