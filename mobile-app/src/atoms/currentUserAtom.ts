import { atom } from "jotai";
import { defaultProfilePicUrl } from "../constants/constants";
import { updateProfileDataInDB } from "../firebase/api";
import { betterAtomWithStorage } from "../lib/betterAtomWithStorage";
import { UserIdT, userWithIdT } from "../lib/db_types";

export const currentUserAtom = betterAtomWithStorage("current-user-data", {
  createdAt: new Date(),
  displayName: "",
  username: "",
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

export const currentUserProfilePicAtom = betterAtomWithStorage(
  "current-user-pic",
  defaultProfilePicUrl,
);
