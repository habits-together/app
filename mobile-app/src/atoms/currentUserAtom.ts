import { Atom, atom } from "jotai";
import { UserIdT, userWithIdT } from "../lib/db_types";
import { mockProfilePictures } from "../lib/mockBase64Images";
import { updateProfileDataInDB } from "../firebase/api";

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
export const currentUserAtom = atom(
  aliceData, // initial value

  async (get, set, newUserData: userWithIdT) => {

    const newDataForDb = {createdAt: newUserData.createdAt,
      displayName: newUserData.displayName,
      username: newUserData.username,
      picture: newUserData.picture} 

    await updateProfileDataInDB(newUserData.id, newDataForDb)
    set(currentUserAtom, newUserData);
  }

);

export const currentUserIdAtom = atom((get) => get(currentUserAtom).id);
