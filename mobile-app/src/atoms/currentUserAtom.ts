import { atom } from "jotai";
import { updateProfileDataInDB } from "../firebase/api";
import { UserIdT, userWithIdT } from "../lib/db_types";
import { mockProfilePictures } from "../lib/mockBase64Images";
import { betterAtomWithStorage } from "../lib/betterAtomWithStorage";
import { UserIdT } from "../lib/db_types";

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

export const currentUserIdAtom = atom((get) => {
  return get(currentUserAtom).id;
});
