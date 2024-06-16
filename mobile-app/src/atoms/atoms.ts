import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { atomFamily, atomWithStorage, createJSONStorage } from "jotai/utils";
import { AsyncStorage as AsyncStorageType } from "jotai/vanilla/utils/atomWithStorage";
import {
  acceptFriendRequestInDB,
  acceptHabitInviteInDB,
  createNewHabitInDB,
  deleteNotificationInDB,
  fetchFriends,
  fetchHabits,
  fetchNotifications,
  getCurrentUserIdFromDB,
  getMutualFriendsInDB,
  searchForFriendsInDB,
  updateHabitCompletionsInDB,
  updateHabitInfoInDB,
  updateHabitParticipantsInDB,
} from "../firebase/api";
import {
  AllFriendsDataType,
  AllHabitsDataType,
  AllUserNotificationsDataType,
  Habit,
  HabitCompletion,
  HabitDisplayType,
} from "../lib/frontend_types";
import { genMockHabitCompletionData } from "../lib/mockData";

// using Jotai atoms: https://jotai.org/docs/introduction
// we especially use the atomFamily atom: https://jotai.org/docs/utilities/family

const storage = createJSONStorage(() => AsyncStorage);

// HABITS -------------------------------------------------------------------------
const habitsAtom = atom<AllHabitsDataType>({});
habitsAtom.onMount = (set) => {
  fetchHabits().then(set);
};

// habit info
export const habitInfoAtom = atomFamily((id: string) =>
  atom((get) => get(habitsAtom)[id].habitInfo),
);
export const editHabitInfoAtom = atomFamily((id: string) =>
  atom(null, (_get, set, newValue: Habit) => {
    updateHabitInfoInDB(id, newValue);
    set(habitsAtom, (prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          habitInfo: newValue,
        },
      };
    });
  }),
);
export const createNewHabitAtom = atom(
  null,
  async (_get, set, newHabitInfo: Habit) => {
    const newId = await createNewHabitInDB(newHabitInfo);
    console.log("creating!");
    let date = new Date();
    date.setDate(date.getDate());
    set(habitsAtom, (prev) => {
      return {
        ...prev,
        [newId]: {
          habitInfo: { ...newHabitInfo, id: newId },
          habitCompletionData: genMockHabitCompletionData(
            newHabitInfo.goal.period === "daily"
              ? newHabitInfo.goal.completionsPerPeriod
              : 1,
          ),
          habitParticipants: ["69"], // This should be current user id, type should also be a string from auth.curentUser.uid
        },
      };
    });
  },
);

export const habitIdAtom = atom((get) =>
  Object.keys(get(habitsAtom)).map(Number),
);
export const habitColorAtom = atomFamily((id: string) =>
  atom((get) => get(habitInfoAtom(id)).color),
);
export const habitGoalAtom = atomFamily((id: string) =>
  atom((get) => get(habitInfoAtom(id)).goal),
);
export const targetNumberOfCompletionsPerDayAtom = atomFamily((id: string) =>
  atom((get) => {
    const habitGoal = get(habitInfoAtom(id)).goal;
    return habitGoal.period === "daily" ? habitGoal.completionsPerPeriod : 1;
  }),
);
export const targetNumberOfCompletionsPerWeekAtom = atomFamily((id: string) =>
  atom((get) => {
    const habitGoal = get(habitInfoAtom(id)).goal;
    return habitGoal.period === "weekly"
      ? habitGoal.completionsPerPeriod
      : habitGoal.completionsPerPeriod * 7;
  }),
);

// habit completions
export const habitCompletionsAtom = atomFamily((id: string) =>
  atom(
    (get) => get(habitsAtom)[id].habitCompletionData,
    (_get, set, newValue: HabitCompletion[]) => {
      set(habitsAtom, (prev) => {
        updateHabitCompletionsInDB(id, newValue);
        return {
          ...prev,
          [id]: {
            ...prev[id],
            habitCompletionData: newValue,
          },
        };
      });
    },
  ),
);
const habitCompletionsTodayAtom = atomFamily((id: string) =>
  atom(
    (get) => get(habitCompletionsAtom(id)).at(-1)!,
    (get, set, newValue: HabitCompletion) => {
      const prev = get(habitCompletionsAtom(id));
      const newCompletionData = [...prev];
      newCompletionData[newCompletionData.length - 1] = newValue;
      set(habitCompletionsAtom(id), newCompletionData);
    },
  ),
);
export const numberOfCompletionsTodayAtom = atomFamily((id: string) =>
  atom(
    (get) => get(habitCompletionsTodayAtom(id)).numberOfCompletions,
    (get, set, newValue: number) => {
      const prev = get(habitCompletionsTodayAtom(id));
      set(habitCompletionsTodayAtom(id), {
        ...prev,
        numberOfCompletions: newValue,
      });
    },
  ),
);
export const incrementNumberOfCompletionsTodayAtom = atomFamily((id: string) =>
  atom(null, (get, set) => {
    const currentNumberOfCompletions = get(numberOfCompletionsTodayAtom(id));
    const targetNumberOfCompletionsPerDay = get(
      targetNumberOfCompletionsPerDayAtom(id),
    );
    set(
      numberOfCompletionsTodayAtom(id),
      currentNumberOfCompletions === targetNumberOfCompletionsPerDay
        ? 0
        : currentNumberOfCompletions + 1,
    );
  }),
);

// habit participants
export const habitParticipantsAtom = atomFamily((id: string) =>
  atom(
    (get) => get(habitsAtom)[id].habitParticipants,
    (_get, set, newValue: number[]) => {
      updateHabitParticipantsInDB(id, newValue);
      set(habitsAtom, (prev) => {
        return {
          ...prev,
          [id]: {
            ...prev[id],
            habitParticipants: newValue,
          },
        };
      });
    },
  ),
);

// whether we should display the habit in weekly or monthly view
export const habitDisplayTypeAtom = atomFamily((id: string) =>
  atomWithStorage<HabitDisplayType>(
    `habitDisplayType-${id}`,
    "weekly-view",
    storage as AsyncStorageType<HabitDisplayType>,
    { getOnInit: true },
  ),
);

// FRIENDS
export const friendsAtom = atom<AllFriendsDataType>({});
friendsAtom.onMount = (set) => {
  fetchFriends().then(set);
};

export const friendInfoAtom = atomFamily((id: string) =>
  atom((get) => get(friendsAtom)[id]),
);

export const friendIdsAtom = atom((get) => {
  return Object.keys(get(friendsAtom)).map(Number);
});

// NOTIFICATIONS
const notificationsAtom = atom<AllUserNotificationsDataType>({});
notificationsAtom.onMount = (set) => {
  fetchNotifications().then(set);
};

export const notificationInfoAtom = atomFamily((id: string) =>
  atom((get) => get(notificationsAtom)[id]),
);
export const notificationTypeAtom = atomFamily((id: string) =>
  atom((get) => get(notificationInfoAtom(id)).type),
);

export const notificationIdsAtom = atom((get) =>
  Object.keys(get(notificationsAtom)).map(Number),
);

export const acceptFriendRequestAtom = atomFamily((id: string) =>
  atom(
    (get) => get(notificationsAtom),
    (_get, set) => {
      acceptFriendRequestInDB(id);
      set(notificationsAtom, (prev) => {
        const { [id]: _, ...remaining } = prev;
        return remaining;
      });
    },
  ),
);

export const acceptHabitInviteAtom = atomFamily((id: string) =>
  atom(
    (get) => get(notificationsAtom),
    (_get, set) => {
      acceptHabitInviteInDB(id);
      set(notificationsAtom, (prev) => {
        const { [id]: _, ...remaining } = prev;
        return remaining;
      });
    },
  ),
);

export const deleteNotificationAtom = atomFamily((id: string) =>
  atom(
    (get) => get(notificationsAtom),
    (_get, set) => {
      deleteNotificationInDB(id);
      set(notificationsAtom, (prev) => {
        const { [id]: _, ...remaining } = prev;
        return remaining;
      });
    },
  ),
);

// friend search
export const searchQueryAtom = atom("", (_get, set, newValue: string) => {
  set(searchQueryAtom, newValue);
});

export const searchResultsAtom = atom(async (get) => {
  console.log("searching for friends");
  return await searchForFriendsInDB(get(searchQueryAtom));
});

export const getMutualFriendsAtom = atomFamily((friendId: string) =>
  atom(async (get) => {
    try {
      const uid = get(currentUserIdAttom);
      const mutualList = await getMutualFriendsInDB(uid, friendId);
      return mutualList;
    } catch (error) {
      console.error("Error fetching mutual friends:", error);
      return [];
    }
  }),
);

export const currentUserIdAttom = atom<string>("0");
currentUserIdAttom.onMount = (set) => {
  getCurrentUserIdFromDB().then(set);
};
// do an onmount to get this
