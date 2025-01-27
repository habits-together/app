import {
  collection,
  getDocs,
  query,
  type Timestamp,
  where,
} from 'firebase/firestore';

import { db } from '../common/firebase';
import { type UserIdT } from '../users';
import { type FriendNotificationT, type HabitNotificationT } from './types';

const convertTimestampToDate = (timestamp: Timestamp) => timestamp.toDate();

export const getNotifications = async (
  userId: UserIdT,
): Promise<(FriendNotificationT | HabitNotificationT)[]> => {
  const notificationsRef = collection(db, 'notifications');
  const q = query(notificationsRef, where('receiverId', '==', userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      sentAt: convertTimestampToDate(data.sentAt as Timestamp),
    } as FriendNotificationT | HabitNotificationT;
  });
};
