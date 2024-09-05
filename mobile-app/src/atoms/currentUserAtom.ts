import { atom } from "jotai";
import { defaultProfilePicUrl } from "../constants/constants";
import { betterAtomWithStorage } from "../lib/betterAtomWithStorage";
import { UserIdT } from "../lib/db_types";

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