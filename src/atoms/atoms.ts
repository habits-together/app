import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import {
  atomFamily,
  atomWithStorage,
  createJSONStorage,
  splitAtom,
} from "jotai/utils";
import { AsyncStorage as AsyncStorageType } from "jotai/vanilla/utils/atomWithStorage";
import { HabitDisplayType } from "../components/HabitCard";
import {
  getMockFriends,
  getMockHabitCompletionData,
  mockHabitData,
  mockHabitFriendData,
} from "../lib/mockData";
import { FriendData, Habit, HabitCompletion } from "../lib/types";

const storage = createJSONStorage(() => AsyncStorage);

// HABITS -------------------------------------------------------------------------
// ids of the habits the user is part of
export const habitIdsAtom = atom(mockHabitData.map((habit) => habit.id));

// basic habit info
export const habitInfoAtomFamily = atomFamily((id: number) =>
  atom<Habit>(mockHabitData.find((habit) => habit.id === id)!),
);
export const habitColorAtom = atomFamily((id: number) =>
  atom((get) => get(habitInfoAtomFamily(id)).color),
);

// habit completions
export const habitCompletionsAtomFamily = atomFamily((id: number) =>
  atom<HabitCompletion[]>(getMockHabitCompletionData(id)),
);

// habit participants
export const habitParticipantsAtomFamily = atomFamily((id: number) =>
  atom<number[]>(
    mockHabitFriendData.find((habit) => habit.habitId === id)!.participants,
  ),
);

// whether we should display the habit in weekly or monthly view
export const habitDisplayTypeAtomFamily = atomFamily((id: number) =>
  atomWithStorage<HabitDisplayType>(
    `habitDisplayType-${id}`,
    "weekly-view",
    storage as AsyncStorageType<HabitDisplayType>,
    { getOnInit: true },
  ),
);

// const allHabitsAtom = atom<AllHabitsDataType>({});

// const allHabitsAtom = atom<HabitData[]>([]);
// allHabitsAtom.onMount = (setAtom) => {
//   // replace getAllHabitData with function that gets data from firebase
//   getAllHabitData().then((habits) => setAtom(habits));
// };
// export const splitHabitsAtom = splitAtom(allHabitsAtom);
// export const getHabitCompletionsAtom

// const allHabitsAtom = atom<Habit[]>([]);
// allHabitsAtom.onMount = (setAtom) => {
//   // replace getMockHabitData with function that gets data from firebase
//   getMockHabitData().then((habits) => setAtom(habits));
// };
// export const splitHabitsAtom = splitAtom(allHabitsAtom);

// const allHabitsCompletionsAtom = atom<HabitCompletions[]>([]);
// allHabitsCompletionsAtom.onMount = (setAtom) => {
//   // replace generateAllMockHabitCompletionData with function that gets data from firebase
//   generateAllMockHabitCompletionData().then((habitCompletions) =>
//     setAtom(habitCompletions),
//   );
// };
// export const splitHabitCompletionsAtom = splitAtom(allHabitsCompletionsAtom);

// const allHabitsParticipantsAtom = atom<HabitParticipants[]>([]);
// allHabitsParticipantsAtom.onMount = (setAtom) => {
//   // replace getMockHabitParticipantData with function that gets data from firebase
//   getMockHabitParticipantData().then((habitParticipants) =>
//     setAtom(habitParticipants),
//   );
// };
// export const splitHabitParticipantsAtom = splitAtom(allHabitsParticipantsAtom);

// FRIENDS -------------------------------------------------------------------------
// const allFriendsAtom = atom<FriendData[]>([]);
// allFriendsAtom.onMount = (setAtom) => {
//   // replace getMockFriends with function that gets data from firebase
//   getMockFriends().then((friends) => setAtom(friends));
// };
// export const splitFriendsAtom = splitAtom(allFriendsAtom);
