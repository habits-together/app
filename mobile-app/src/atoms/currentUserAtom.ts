import { atom } from "jotai";
import { userWithIdT } from "../lib/db_types";
import { mockCurrentUser } from "../lib/mockData";

export const currentUserAtom = atom<userWithIdT>(mockCurrentUser);
export const currentUserIdAtom = atom((get) => get(currentUserAtom).id);
