import { mmkvStorage } from "./betterAtomWithStorage";
import { UserIdT, userWithIdT } from "./db_types";

export const emptyUserObject: userWithIdT = {
  createdAt: new Date(),
  displayName: "",
  username: "",
  picture: "",
  id: "" as UserIdT,
};

export function getCurrentUser(): userWithIdT {
  const storedData = mmkvStorage.getString("current-user-data");

  if (!storedData) {
    return emptyUserObject;
  }

  return JSON.parse(storedData);
}

export function getCurrentUserId(): UserIdT {
  return getCurrentUser().id;
}
