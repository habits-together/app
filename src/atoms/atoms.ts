import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { atomFamily, atomWithStorage, createJSONStorage } from "jotai/utils";
import { AsyncStorage as AsyncStorageType } from "jotai/vanilla/utils/atomWithStorage";
import {
  getMockHabitCompletionData,
  mockHabitData,
  mockHabitFriendData,
} from "../lib/mockData";
import { Habit, HabitCompletion, HabitDisplayType } from "../lib/types";

const storage = createJSONStorage(() => AsyncStorage);

// HABITS -------------------------------------------------------------------------
// ids of the habits the user is part of
export const habitIdsAtom = atom(mockHabitData.map((habit) => habit.id));

// basic habit info
export const habitInfoAtom = atomFamily((id: number) =>
  atom<Habit>(mockHabitData.find((habit) => habit.id === id)!),
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
  atom<HabitCompletion[]>(getMockHabitCompletionData(id).slice(0, -1)),
);
const habitCompletionsTodayAtom = atomFamily((id: number) =>
  atom<HabitCompletion>(getMockHabitCompletionData(id).reverse()[0]),
);
export const numberOfCompletionsTodayAtom = atomFamily((id: number) =>
  atom(
    (get) => get(habitCompletionsTodayAtom(id)).numberOfCompletions,
    (get, set, newValue: number) => {
      set(habitCompletionsTodayAtom(id), (prev) => ({
        ...prev,
        numberOfCompletions: newValue,
      }));
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
  atom<number[]>(
    mockHabitFriendData.find((habit) => habit.habitId === id)!.participants,
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
