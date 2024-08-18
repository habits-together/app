import { atom } from "jotai";
import { UserIdT, userWithIdT } from "../lib/db_types";

export const currentUserAtom = atom<userWithIdT>({
  createdAt: new Date(),
  displayName: "",
  username: "",
  picture: "",
  id: "" as UserIdT,
});

export const currentUserIdAtom = atom((get) => {
  return get(currentUserAtom).id;
});
