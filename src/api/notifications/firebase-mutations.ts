import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

import { getCurrentUserId } from '@/core';

import { db } from '../common/firebase';
import { type HabitIdT } from '../habits';
import { type UserIdT } from '../users';
import { type DbHabitNotificationT } from './types';

export const sendHabitInvite = async (
  habitId: HabitIdT,
  receiverId: UserIdT,
) => {
  const myId = getCurrentUserId();
  const notification: Omit<DbHabitNotificationT, 'sentAt'> & {
    sentAt: ReturnType<typeof serverTimestamp>;
  } = {
    type: 'habitInvite',
    habitId,
    senderId: myId,
    receiverId,
    sentAt: serverTimestamp(),
  };
  await addDoc(collection(db, 'notifications'), notification);
};

export const sendNudge = async (habitId: HabitIdT, receiverId: UserIdT) => {
  const myId = getCurrentUserId();
  const notification: Omit<DbHabitNotificationT, 'sentAt'> & {
    sentAt: ReturnType<typeof serverTimestamp>;
  } = {
    type: 'nudge',
    habitId,
    senderId: myId,
    receiverId,
    sentAt: serverTimestamp(),
  };
  await addDoc(collection(db, 'notifications'), notification);
};

export const deleteNotification = async (notificationId: string) => {
  await deleteDoc(doc(db, 'notifications', notificationId));
};
