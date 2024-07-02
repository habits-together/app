import { atom } from "jotai";
import { userWithIdT } from "../lib/db_types";
import { mockProfilePictures } from "../lib/mockBase64Images";

// default user for now
// 1QsFUZQSFsV83tYNPnChFOwbhjK2 (Alice)
const aliceData: userWithIdT = {
  createdAt: new Date(),
  displayName: "Alice",
  username: "alice3",
  picture: mockProfilePictures[3],
  id: "1QsFUZQSFsV83tYNPnChFOwbhjK2",
};
// same email and pass -> alice3@gmail.com
export const currentUserAtom = atom<userWithIdT>(aliceData);
export const currentUserIdAtom = atom((get) => get(currentUserAtom).id);