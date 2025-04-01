import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  type Timestamp,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

import { getCurrentUserId } from '@/core';

import { db, storage } from '../common/firebase';
import {
  type DbRelationshipT,
  type DbUserT,
  type RelationshipT,
  type UserIdT,
  type UserT,
  type UserWithRelationshipT,
} from './types';

const convertTimestampToDate = (timestamp: Timestamp) => timestamp.toDate();

const convertDbUserToUser = (id: UserIdT, dbUser: DbUserT): UserT => ({
  id,
  ...dbUser,
  createdAt: convertTimestampToDate(dbUser.createdAt as Timestamp),
});

const convertDbRelationshipToRelationship = (
  dbRelationship: DbRelationshipT,
): RelationshipT => {
  if (dbRelationship.status === 'friends') {
    return {
      status: 'friends',
      friendsSince: convertTimestampToDate(
        dbRelationship.friendsSince as Timestamp,
      ),
    };
  }
  return {
    status: dbRelationship.status,
  };
};

const getRelationshipStatus = async (
  userId1: UserIdT,
  userId2: UserIdT,
): Promise<RelationshipT> => {
  const relationshipsRef = collection(db, 'relationships');
  const q1 = query(
    relationshipsRef,
    where('userId1', '==', userId1),
    where('userId2', '==', userId2),
  );
  const q2 = query(
    relationshipsRef,
    where('userId1', '==', userId2),
    where('userId2', '==', userId1),
  );

  const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);
  const relationship = snapshot1.docs[0]?.data() || snapshot2.docs[0]?.data();

  if (!relationship) {
    return { status: 'none' };
  }

  return convertDbRelationshipToRelationship(relationship as DbRelationshipT);
};

export const getUserById = async (id: UserIdT): Promise<UserT | null> => {
  const userDoc = await getDoc(doc(db, 'users', id));
  if (!userDoc.exists()) return null;
  return convertDbUserToUser(id, userDoc.data() as DbUserT);
};

export const getUserWithRelationshipById = async (
  id: UserIdT,
): Promise<UserWithRelationshipT | null> => {
  const userDoc = await getDoc(doc(db, 'users', id));
  if (!userDoc.exists()) return null;

  const myId = getCurrentUserId();
  const relationship = await getRelationshipStatus(myId, id);

  return {
    ...convertDbUserToUser(id, userDoc.data() as DbUserT),
    relationship,
  };
};

export const searchUsers = async (searchQuery: string): Promise<UserT[]> => {
  const searchQueryLower = searchQuery.toLowerCase();
  const usersRef = collection(db, 'users');
  const querySnapshot = await getDocs(usersRef);

  // Get all users and filter/rank them in memory
  const users = querySnapshot.docs.map((doc) =>
    convertDbUserToUser(doc.id as UserIdT, doc.data() as DbUserT),
  );

  // Filter and rank users based on match quality
  const rankedUsers = users
    .map((user) => {
      const displayNameLower = user.displayName.toLowerCase();
      const usernameLower = user.username.toLowerCase();
      let score = 0;

      // Exact match gets highest score
      if (
        displayNameLower === searchQueryLower ||
        usernameLower === searchQueryLower
      ) {
        score = 4;
      }
      // Starts with gets high score
      else if (
        displayNameLower.startsWith(searchQueryLower) ||
        usernameLower.startsWith(searchQueryLower)
      ) {
        score = 3;
      }
      // Contains gets medium score
      else if (
        displayNameLower.includes(searchQueryLower) ||
        usernameLower.includes(searchQueryLower)
      ) {
        score = 2;
      }
      // Individual words start with gets low score
      else if (
        displayNameLower
          .split(' ')
          .some((word) => word.startsWith(searchQueryLower))
      ) {
        score = 1;
      }

      return { user, score };
    })
    .filter(({ score }) => score > 0) // Only keep matches
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .map(({ user }) => user); // Extract just the users

  // Limit to 10 results
  return rankedUsers.slice(0, 10);
};

export const getUserPicture = async (userId: UserIdT): Promise<string> => {
  const defaultProfilePic = require('/assets/images/default_profile_pic.png');
  try {
    const pictureRef = ref(storage, `profilePics/${userId}`);
    const url = await getDownloadURL(pictureRef);
    return url;
  } catch (error) {
    console.log(`No profile image found for ${userId}, using default.`);
    return defaultProfilePic;
  }
};

export const getFriends = async (userId: UserIdT): Promise<UserT[]> => {
  const relationshipsRef = collection(db, 'relationships');

  // Query for relationships where user is userId1
  const q1 = query(
    relationshipsRef,
    where('userId1', '==', userId),
    where('status', '==', 'friends'),
  );

  // Query for relationships where user is userId2
  const q2 = query(
    relationshipsRef,
    where('userId2', '==', userId),
    where('status', '==', 'friends'),
  );

  const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

  // Get friend IDs from both queries
  const friendIds = [
    ...snapshot1.docs.map((doc) => doc.data().userId2),
    ...snapshot2.docs.map((doc) => doc.data().userId1),
  ];

  // Remove duplicates
  const uniqueFriendIds = [...new Set(friendIds)];

  // Fetch user data for each friend
  const friends = await Promise.all(
    uniqueFriendIds.map(async (friendId) => {
      const friend = await getUserWithRelationshipById(friendId as UserIdT);
      if (!friend) throw new Error('Friend not found');
      return friend;
    }),
  );

  return friends;
};
