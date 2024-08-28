import { getAuth } from "firebase/auth";
import { atom } from "jotai";
import { fetchUserInfo } from "../firebase/api";
import { betterAtomWithStorage } from "../lib/betterAtomWithStorage";
import { UserIdT } from "../lib/db_types";
import { emptyUserObject } from "../lib/getCurrentUser";

export const currentUserAtom = betterAtomWithStorage(
  "current-user-data",
  emptyUserObject,
);

export const currentUserIdAtom = atom((get) => {
  return get(currentUserAtom).id;
});

/**
 * Refreshes the current user atom with the latest data based on the current auth
 */
export const refreshCurrentUserAtom = atom(null, async (_get, set) => {
  const user = getAuth().currentUser;
  if (user) {
    const userInfo = await fetchUserInfo({ userId: user.uid as UserIdT });
    set(currentUserAtom, { ...userInfo });
  } else {
    set(currentUserAtom, emptyUserObject);
  }
});
