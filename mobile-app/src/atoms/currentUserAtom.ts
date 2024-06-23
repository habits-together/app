import { atom } from "jotai";
import { mockCurrentUser } from "../lib/betterMock";
import { userWithIdT } from "../lib/db_types";

export const currentUserAtom = atom<userWithIdT>(mockCurrentUser);
export const currentUserIdAtom = atom((get) => get(currentUserAtom).id);
