import AsyncStorage from "@react-native-async-storage/async-storage";
// import { atom } from "jotai";
import { atom, createStore } from "jotai";
import { atomFamily, atomWithStorage, createJSONStorage } from "jotai/utils";
import {
  createNewHabitInDb,
  editHabitInDb,
  fetchAllHabitsInfo,
  fetchFriends,
  fetchHabitCompletionsForAllParticipants,
  fetchHabitCompletionsForParticipant,
  fetchNotifications,
} from "../firebase/betterApi";
import {
  HabitDisplayType,
  allHabitsT,
  allNotificationsT,
  allParticipantCompletionsT,
  allUsersInfoT,
  friendNotificationT,
  habitCompletionsT,
  habitInfoT,
  habitNotificationT,
  userWithIdT,
} from "../lib/db_types";
import { todayString } from "../lib/todayString";
// import { atomFamily, atomWithStorage, createJSONStorage } from "jotai/utils";
import { AsyncStorage as AsyncStorageType } from "jotai/vanilla/utils/atomWithStorage";
import { mockUser } from "../lib/betterMock";
// import {
//   acceptFriendRequestInDB,
//   acceptHabitInviteInDB,
//   createNewHabitInDB,
//   deleteNotificationInDB,
//   fetchFriends,
//   fetchHabits,
//   fetchNotifications,
// getCurrentUserIdFromDB,
// getMutualFriendsInDB,
// searchForFriendsInDB,
//   updateHabitCompletionsInDB,
//   updateHabitInfoInDB,
//   updateHabitParticipantsInDB,
// } from "../firebase/api";
// import { genMockHabitCompletionData } from "../lib/mockData";
// import {
//   AllFriendsDataType,
//   AllHabitsDataType,
//   Habit,
//   HabitCompletion,
//   HabitDisplayType,
//   UserNotificationsDataType,
// } from "../lib/types";

// using Jotai atoms: https://jotai.org/docs/introduction
// we especially use the atomFamily atom: https://jotai.org/docs/utilities/family

export const atomStore = createStore();
const localStore = createJSONStorage(() => AsyncStorage);

const currentUserAtom = atom<userWithIdT>(mockUser);
export const currentUserIdAtom = atom((get) => get(currentUserAtom).id);

const allHabitsAtom = atom<allHabitsT>({});
allHabitsAtom.onMount = (set) => {
  fetchAllHabitsInfo().then(set);
};
export const habitIdsAtom = atom((get) => Object.keys(get(allHabitsAtom)));
const habitInfoAtom = atomFamily((habitId: string) =>
  atom((get) => {
    const { participants, ...habitInfo } = get(allHabitsAtom)[habitId];
    return habitInfo;
  }),
);
export const habitParticipantIdsAtom = atomFamily((habitId: string) =>
  atom((get) => Object.keys(get(habitParticipantsAtom(habitId)))),
);
export const habitParticipantsAtom = atomFamily((habitId: string) =>
  atom((get) => get(allHabitsAtom)[habitId].participants),
);
export const habitColorAtom = atomFamily((habitId: string) =>
  atom((get) => get(habitInfoAtom(habitId)).color),
);
export const habitDescriptionAtom = atomFamily((habitId: string) =>
  atom((get) => get(habitInfoAtom(habitId)).description),
);
export const habitTitleAtom = atomFamily((habitId: string) =>
  atom((get) => get(habitInfoAtom(habitId)).title),
);
export const habitGoalAtom = atomFamily((habitId: string) =>
  atom((get) => get(habitInfoAtom(habitId)).goal),
);
// export const habitGoalPeriodAtom = atomFamily((habitId: string) =>
//   atom((get) => get(habitInfoAtom(habitId)).goal.period),
// );
// export const habitGoalCompletionsPerPeriodAtom = atomFamily((habitId: string) =>
//   atom((get) => get(habitInfoAtom(habitId)).goal.completionsPerPeriod),
// );
export const habitIconAtom = atomFamily((habitId: string) =>
  atom((get) => get(habitInfoAtom(habitId)).icon),
);

export const targetNumberOfCompletionsPerDayAtom = atomFamily(
  (habitId: string) =>
    atom((get) => {
      const habitGoal = get(habitInfoAtom(habitId)).goal;
      return habitGoal.period === "daily" ? habitGoal.completionsPerPeriod : 1;
    }),
);
export const targetNumberOfCompletionsPerWeekAtom = atomFamily(
  (habitId: string) =>
    atom((get) => {
      const habitGoal = get(habitInfoAtom(habitId)).goal;
      return habitGoal.period === "weekly"
        ? habitGoal.completionsPerPeriod
        : habitGoal.completionsPerPeriod * 7;
    }),
);

export const editHabitAtom = atomFamily((habitId: string) =>
  atom(null, async (get, set, newHabitInfo: habitInfoT) => {
    await editHabitInDb({ habitId, habitInfo: newHabitInfo });
    const habitParticipantInfo = get(habitParticipantsAtom(habitId));
    set(allHabitsAtom, (prev) => {
      return {
        ...prev,
        [habitId]: {
          ...newHabitInfo,
          participants: habitParticipantInfo,
        },
      };
    });
  }),
);
export const createNewHabitAtom = atom(
  null,
  async (get, set, newHabitInfo: habitInfoT) => {
    const newId = await createNewHabitInDb({ habitInfo: newHabitInfo });
    const currentUserInfo = get(currentUserAtom);
    set(allHabitsAtom, (prev) => {
      return {
        ...prev,
        [newId]: {
          ...newHabitInfo,
          participants: {
            [currentUserInfo.id]: {
              displayName: currentUserInfo.displayName,
              username: currentUserInfo.username,
              picture: currentUserInfo.picture,
              mostRecentCompletionDate: new Date(),
              isOwner: true,
            },
          },
        },
      };
    });
  },
);

export const habitCompletionsForAllParticipantsAtom = atomFamily(
  (habitId: string) => {
    const completionsAtom = atom<allParticipantCompletionsT>({});
    completionsAtom.onMount = (set) => {
      fetchHabitCompletionsForAllParticipants({ habitId }).then(set);
    };
    return completionsAtom;
  },
);

export const habitCompletionsForParticipantAtom = atomFamily(
  ({ habitId, participantId }: { habitId: string; participantId: string }) => {
    const completionsAtom = atom<habitCompletionsT>({});
    completionsAtom.onMount = (set) => {
      fetchHabitCompletionsForParticipant({ habitId, participantId }).then(set);
    };
    return completionsAtom;
  },
  (a, b) => a.habitId === b.habitId && a.participantId === b.participantId,
);

export const numberOfCompletionsTodayAtom = atomFamily((habitId: string) =>
  atom(
    (get) => {
      const userId = get(currentUserIdAtom);
      const habitCompletions = get(
        habitCompletionsForParticipantAtom({
          habitId,
          participantId: userId,
        }),
      );
      const completionsToday = habitCompletions[userId][todayString()] as
        | number
        | undefined;
      return completionsToday ?? 0;
    },
    (get, set, newValue: number) => {
      const userId = get(currentUserIdAtom);
      const habitCompletions = get(
        habitCompletionsForParticipantAtom({
          habitId,
          participantId: userId,
        }),
      );
      set(
        habitCompletionsForParticipantAtom({
          habitId,
          participantId: userId,
        }),
        {
          ...habitCompletions,
          [userId]: {
            ...habitCompletions[userId],
            [todayString()]: newValue,
          },
        },
      );
    },
  ),
);

export const incrementNumberOfCompletionsTodayAtom = atomFamily(
  (habitId: string) =>
    atom(null, (get, set) => {
      const currentNumberOfCompletions = get(
        numberOfCompletionsTodayAtom(habitId),
      );
      const targetNumberOfCompletionsPerDay = get(
        targetNumberOfCompletionsPerDayAtom(habitId),
      );
      const newNumberOfCompletions =
        currentNumberOfCompletions === targetNumberOfCompletionsPerDay
          ? 0
          : currentNumberOfCompletions + 1;
      set(numberOfCompletionsTodayAtom(habitId), newNumberOfCompletions);
    }),
);

// FRIENDS
const friendsAtom = atom<allUsersInfoT>({});
friendsAtom.onMount = (set) => {
  fetchFriends().then(set);
};
export const friendIdsAtom = atom((get) => Object.keys(get(friendsAtom)));
export const friendAtom = atomFamily((friendId: string) =>
  atom((get) => get(friendsAtom)[friendId]),
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

// NOTIFICATIONS
const notificationsAtom = atom<allNotificationsT>({});
notificationsAtom.onMount = (set) => {
  fetchNotifications().then(set);
};
export const notificationIdsAtom = atom((get) =>
  Object.keys(get(notificationsAtom)),
);
export const notificationAtom = atomFamily((notificationId: string) =>
  atom((get) => get(notificationsAtom)[notificationId]),
);
export const notificationTypeAtom = atomFamily((notificationId: string) =>
  atom((get) => get(notificationAtom(notificationId)).type),
);
export const friendNotificationAtom = atomFamily((notificationId: string) =>
  atom<friendNotificationT>((get) => {
    const notiAtom = get(notificationAtom(notificationId));
    if ("habitId" in notiAtom) throw new Error("Not a friend notification");
    return notiAtom as friendNotificationT;
  }),
);
export const habitNotificationAtom = atomFamily((notificationId: string) =>
  atom<habitNotificationT>((get) => {
    const notiAtom = get(notificationAtom(notificationId));
    if (!("habitId" in notiAtom)) throw new Error("Not a habit notification");
    return notiAtom as habitNotificationT;
  }),
);

// export const acceptFriendRequestAtom = atomFamily((id: number) =>
//   atom(
//     (get) => get(notificationsAtom),
//     (_get, set) => {
//       acceptFriendRequestInDB(id);
//       set(notificationsAtom, (prev) => {
//         const { [id]: _, ...remaining } = prev;
//         return remaining;
//       });
//     },
//   ),
// );

// export const acceptHabitInviteAtom = atomFamily((id: number) =>
//   atom(
//     (get) => get(notificationsAtom),
//     (_get, set) => {
//       acceptHabitInviteInDB(id);
//       set(notificationsAtom, (prev) => {
//         const { [id]: _, ...remaining } = prev;
//         return remaining;
//       });
//     },
//   ),
// );

// export const deleteNotificationAtom = atomFamily((id: number) =>
//   atom(
//     (get) => get(notificationsAtom),
//     (_get, set) => {
//       deleteNotificationInDB(id);
//       set(notificationsAtom, (prev) => {
//         const { [id]: _, ...remaining } = prev;
//         return remaining;
//       });
//     },
//   ),
// );

// // friend search
// export const searchQueryAtom = atom("", (_get, set, newValue: string) => {
//   set(searchQueryAtom, newValue);
// });

// export const searchResultsAtom = atom(async (get) => {
//   console.log("searching for friends");
//   return await searchForFriendsInDB(get(searchQueryAtom));
// });

// export const getMutualFriendsAtom = atomFamily((friendId: number) =>
//   atom(async (get) => {
//     try {
//       const uid = get(currentUserIdAttom);
//       const mutualList = await getMutualFriendsInDB(uid, friendId);
//       return mutualList;
//     } catch (error) {
//       console.error("Error fetching mutual friends:", error);
//       return [];
//     }
//   }),
// );

// export const currentUserIdAttom = atom(10);
// currentUserIdAttom.onMount = (set) => {
//   getCurrentUserIdFromDB().then(set);
// };
// // do an onmount to get this

// whether we should display the habit in weekly or monthly view
export const habitDisplayTypeAtom = atomFamily((id: string) =>
  atomWithStorage<HabitDisplayType>(
    `habitDisplayType-${id}`,
    "weekly-view",
    localStore as AsyncStorageType<HabitDisplayType>,
    { getOnInit: true },
  ),
);
