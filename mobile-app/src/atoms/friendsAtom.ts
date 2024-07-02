import { collection, onSnapshot, or, query, where } from "firebase/firestore";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import {
  fetchCommonHabitIds,
  fetchFriendData,
  fetchMutualFriends,
} from "../firebase/api";
import { firestore } from "../firebase/config";
import { allUsersInfoT } from "../lib/db_types";
import { currentUserIdAtom } from "./currentUserAtom";
import { atomStore } from "./store";

export const allFriendsDataAtom = atom<allUsersInfoT>({});
allFriendsDataAtom.onMount = (set) => {
  // refetch everytime users friends change
  const currentUserId = atomStore.get(currentUserIdAtom);
  const q = query(
    collection(firestore, "friendships"),
    or(
      where("user1Id", "==", currentUserId),
      where("user2Id", "==", currentUserId),
    ),
  );
  const unsubscribeFriendlist = onSnapshot(q, () => {
    fetchFriendData({ userId: currentUserId }).then(set);
  });
  return () => {
    // close the socket when allFriendsDataAtom is unmount
    unsubscribeFriendlist();
  };
};

export const friendIdsAtom = atom((get) =>
  Object.keys(get(allFriendsDataAtom)),
);
export const friendAtom = atomFamily((friendId: string) =>
  atom((get) => get(allFriendsDataAtom)[friendId]),
);
export const friendDisplayNameAtom = atomFamily((friendId: string) =>
  atom((get) => get(friendAtom(friendId)).displayName),
);
export const friendUsernameAtom = atomFamily((friendId: string) =>
  atom((get) => get(friendAtom(friendId)).username),
);
export const friendPictureAtom = atomFamily((friendId: string) =>
  atom((get) => get(friendAtom(friendId)).picture),
);

export const commonHabitIdsAtom = atomFamily((friendId: string) =>
  atom(async () => {
    return await fetchCommonHabitIds({ participantId: friendId });
  }),
);

// console.log(`${friendId} -> ${Object.keys(mutualFriends).length}`);
export const mutualFriendsAtom = atomFamily((friendId: string) =>
  atom(async () => {
    const mutualFriends = await fetchMutualFriends({ friendId });
    return mutualFriends;
  }),
);

export const mutualFriendsPfpsListAtom = atomFamily((friendId: string) =>
  atom(async (get) => {
    const mutualFriends = await get(mutualFriendsAtom(friendId));
    return Object.values(mutualFriends).map((friend) => friend.picture);
  }),
);

export const numberOfMutualFriendsAtom = atomFamily((friendId: string) =>
  atom(async (get) => {
    const mutualFriends = await get(mutualFriendsAtom(friendId));
    return Object.keys(mutualFriends).length;
  }),
);

// console.log(`inside mutualFriendsPfpsListAtom ${friendId} -> ${Object.keys(mutualFriends).length}`)
