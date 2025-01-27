import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';

import { db } from '../common/firebase';
import { type DbRelationshipT, type UserIdT } from './types';

export const sendFriendRequest = async (userId: UserIdT) => {
  const myId = '1' as UserIdT; // TODO: Get from auth context
  await addDoc(collection(db, 'notifications'), {
    type: 'friendRequest',
    senderId: myId,
    receiverId: userId,
    sentAt: serverTimestamp(),
  });
};

export const acceptFriendRequest = async (userId: UserIdT) => {
  const myId = '1' as UserIdT; // TODO: Get from auth context
  
  const relationship: Omit<DbRelationshipT, 'friendsSince'> & { friendsSince: ReturnType<typeof serverTimestamp> } = {
    status: 'friends',
    friendsSince: serverTimestamp(),
  };

  // Create relationship documents for both users
  await addDoc(collection(db, 'relationships'), {
    userId1: myId,
    userId2: userId,
    ...relationship,
  });
  
  await addDoc(collection(db, 'relationships'), {
    userId1: userId,
    userId2: myId,
    ...relationship,
  });
};

export const removeFriend = async (userId: UserIdT) => {
  const myId = '1' as UserIdT; // TODO: Get from auth context
  
  // Find and delete both relationship documents
  const relationshipsRef = collection(db, 'relationships');
  const q1 = query(
    relationshipsRef,
    where('userId1', '==', myId),
    where('userId2', '==', userId),
  );
  const q2 = query(
    relationshipsRef,
    where('userId1', '==', userId),
    where('userId2', '==', myId),
  );

  const [snapshot1, snapshot2] = await Promise.all([
    getDocs(q1),
    getDocs(q2),
  ]);

  await Promise.all([
    ...snapshot1.docs.map((doc) => deleteDoc(doc.ref)),
    ...snapshot2.docs.map((doc) => deleteDoc(doc.ref)),
  ]);
}; 