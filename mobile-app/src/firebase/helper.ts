import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { userT, userWithIdT } from "../lib/db_types";

export const userDataConverter = {
  fromFirestore: (snapshot: DocumentSnapshot): userWithIdT => {
    const data = snapshot.data();
    const typedData: userWithIdT = {
      createdAt: data?.createdAt,
      displayName: data?.displayName,
      id: data?.id,
      picture: data?.picture,
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
  };
};

export const userWithIdToUserT = (user: userWithIdT): userT => {
  const { id, ...userWithoutId } = user;
  return userWithoutId;
};
