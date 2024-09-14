import { atom } from "jotai";
import { defaultProfilePicUrl } from "../constants/constants";
import { updateOwnProfileDataInDB } from "../firebase/api";
import { betterAtomWithStorage } from "../lib/betterAtomWithStorage";
import { UserIdT, userT, userWithIdT } from "../lib/db_types";

export const currentUserAtom = betterAtomWithStorage("current-user-data", {
  createdAt: new Date(),
  displayName: "",
  username: "",
  id: "" as UserIdT,
});

export const currentUserIdAtom = atom((get) => {
  return get(currentUserAtom).id;
});

export const currentUserProfilePicAtom = betterAtomWithStorage(
  "current-user-pic",
  defaultProfilePicUrl,
);

export const currentUserAtomWithDB = atom(
  (get) => get(currentUserAtom),

  async (get, set, newUserData: userWithIdT) => {
    const newDataForDb = {
      displayName: newUserData.displayName,
      username: newUserData.username,
    };

    await updateOwnProfileDataInDB(newDataForDb);
    set(currentUserAtom, newUserData);
  },
);
