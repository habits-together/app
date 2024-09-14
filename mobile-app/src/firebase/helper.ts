import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { userT, userWithIdT } from "../lib/db_types";

export const userDataConverter = {
  fromFirestore: (snapshot: DocumentSnapshot): userWithIdT => {
    const data = snapshot.data();
    const typedData: userWithIdT = {
      createdAt: data?.createdAt,
      displayName: data?.displayName,
      id: data?.id,
      username: data?.username,
    };
    return typedData;
  },
};

export const userSnapToUserWithIdT = (
  userDocSnap: QueryDocumentSnapshot<DocumentData, DocumentData>,
): userWithIdT => {
  return {
    ...(userDocSnap.data() as userT),
    id: userDocSnap.id,
  } as userWithIdT;
};

export const userWithIdToUserT = (user: userWithIdT): userT => {
  const { id, ...userWithoutId } = user;
  return userWithoutId;
};

export const convertTimestampToJSDate = (
  timestamp?: Timestamp | null,
): Date | null => {
  if (timestamp && timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return null;
};
