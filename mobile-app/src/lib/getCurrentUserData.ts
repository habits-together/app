import { userWithIdT } from "./db_types";
import { mockCurrentUser } from "./mockData";

export async function fetchCurentUserInfo(): Promise<userWithIdT> {
  return mockCurrentUser;
}
