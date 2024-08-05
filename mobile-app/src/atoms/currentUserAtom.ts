import { atom } from "jotai";
import { UserIdT, userWithIdT } from "../lib/db_types";
import { mockProfilePictures } from "../lib/mockBase64Images";

// default user for now
// jwkcNPS3ynW7UlJKpKxqKIJHz3F2 (Alice)
const aliceData: userWithIdT = {
  createdAt: new Date(),
  displayName: "Alice",
  username: "alice3",
  picture: mockProfilePictures[3],
  id: "jwkcNPS3ynW7UlJKpKxqKIJHz3F2" as UserIdT,
};
// same email and pass -> alice3@gmail.com
export const currentUserAtom = atom<userWithIdT>(aliceData);
export const currentUserIdAtom = atom((get) => get(currentUserAtom).id);
