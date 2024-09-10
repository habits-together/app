import { atom } from "jotai";
import { updateProfileDataInDB } from "../firebase/api";
import { betterAtomWithStorage } from "../lib/betterAtomWithStorage";
import { UserIdT, userWithIdT } from "../lib/db_types";

// export const currentUserAtom = atom<userWithIdT>({
//   createdAt: new Date(),
//   displayName: "",
//   username: "",
//   picture: "",
//   id: "" as UserIdT,
// });

export const currentUserAtom = betterAtomWithStorage("current-user-data", {
  createdAt: new Date(),
  displayName: "",
  username: "",
  picture: "",
  id: "" as UserIdT,
});

export const currentUserAtomWithDB = atom(
  (get) => get(currentUserAtom),

  async (get, set, newUserData: userWithIdT) => {
    const newDataForDb = {
      createdAt: newUserData.createdAt,
      displayName: newUserData.displayName,
      username: newUserData.username,
      picture: newUserData.picture,
    };

    await updateProfileDataInDB(newUserData.id, newDataForDb);
    set(currentUserAtom, newUserData);
  },
);

export const currentUserIdAtom = atom((get) => {
  return get(currentUserAtom).id;
});
