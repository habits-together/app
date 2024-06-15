import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { atomFamily, atomWithStorage, createJSONStorage } from "jotai/utils";
import { AsyncStorage as AsyncStorageType } from "jotai/vanilla/utils/atomWithStorage";
import {
  acceptFriendRequestInDB,
  acceptHabitInviteInDB,
  deleteNotificationInDB,
  fetchFriends,
  fetchHabits,
  fetchNotifications,
  updateHabitCompletionsInDB,
  updateHabitInfoInDB,
  updateHabitParticipantsInDB,
} from "../firebase/api";
import {
  AllFriendsDataType,
  AllHabitsDataType,
  Habit,
  HabitCompletion,
  HabitDisplayType,
  UserNotificationsDataType,
} from "../lib/types";

// using Jotai atoms: https://jotai.org/docs/introduction
// we especially use the atomFamily atom: https://jotai.org/docs/utilities/family

const storage = createJSONStorage(() => AsyncStorage);

// HABITS -------------------------------------------------------------------------
const habitsAtom = atom<AllHabitsDataType>([]);
habitsAtom.onMount = (set) => {
  fetchHabits().then(set);
};

// habit info
export const habitInfoAtom = atomFamily((id: number) =>
  atom(
    (get) => get(habitsAtom)[id].habitInfo,
    (_get, set, newValue: Habit) => {
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
    },
  ),
);
export const habitIdAtom = atom((get) =>
  Object.keys(get(habitsAtom)).map(Number),
);
export const habitColorAtom = atomFamily((id: number) =>
  atom((get) => get(habitInfoAtom(id)).color),
);
export const habitGoalAtom = atomFamily((id: number) =>
  atom((get) => get(habitInfoAtom(id)).goal),
);
export const targetNumberOfCompletionsPerDayAtom = atomFamily((id: number) =>
  atom((get) => {
    const habitGoal = get(habitInfoAtom(id)).goal;
    return habitGoal.period === "daily" ? habitGoal.completionsPerPeriod : 1;
  }),
);
export const targetNumberOfCompletionsPerWeekAtom = atomFamily((id: number) =>
  atom((get) => {
    const habitGoal = get(habitInfoAtom(id)).goal;
    return habitGoal.period === "weekly"
      ? habitGoal.completionsPerPeriod
      : habitGoal.completionsPerPeriod * 7;
  }),
);

// habit completions
export const habitCompletionsAtom = atomFamily((id: number) =>
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
const habitCompletionsTodayAtom = atomFamily((id: number) =>
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
export const numberOfCompletionsTodayAtom = atomFamily((id: number) =>
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
export const incrementNumberOfCompletionsTodayAtom = atomFamily((id: number) =>
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
export const habitParticipantsAtom = atomFamily((id: number) =>
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
export const habitDisplayTypeAtom = atomFamily((id: number) =>
  atomWithStorage<HabitDisplayType>(
    `habitDisplayType-${id}`,
    "weekly-view",
    storage as AsyncStorageType<HabitDisplayType>,
    { getOnInit: true },
  ),
);

// FRIENDS
export const friendsAtom = atom<AllFriendsDataType>([]);
friendsAtom.onMount = (set) => {
  fetchFriends().then(set);
};

export const friendInfoAtom = atomFamily((id: number) =>
  atom((get) => get(friendsAtom)[id]),
);

export const friendIdsAtom = atom((get) =>
  Object.keys(get(friendsAtom)).map(Number),
);

// NOTIFICATIONS
const notificationsAtom = atom<UserNotificationsDataType>([]);
notificationsAtom.onMount = (set) => {
  fetchNotifications().then(set);
};

export const notificationInfoAtom = atomFamily((id: number) =>
  atom((get) => get(notificationsAtom)[id]),
);
export const notificationTypeAtom = atomFamily((id: number) =>
  atom((get) => get(notificationInfoAtom(id)).type),
);

export const notificationIdsAtom = atom((get) =>
  Object.keys(get(notificationsAtom)).map(Number),
);

export const acceptFriendRequestAtom = atomFamily((id: number) =>
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

export const acceptHabitInviteAtom = atomFamily((id: number) =>
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

export const deleteNotificationAtom = atomFamily((id: number) =>
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
