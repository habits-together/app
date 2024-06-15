import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { atomFamily, atomWithStorage, createJSONStorage } from "jotai/utils";
import { AsyncStorage as AsyncStorageType } from "jotai/vanilla/utils/atomWithStorage";
import {
  fetchHabits,
  updateHabitCompletionsInDB,
  updateHabitInfoInDB,
  updateHabitParticipantsInDB,
} from "../firebase/api";
import {
  AllHabitsDataType,
  HabitCompletion,
  HabitDisplayType,
  HabitInfo,
  HabitParticipant,
} from "../lib/types";

// using Jotai atoms: https://jotai.org/docs/introduction
// we especially use the atomFamily atom: https://jotai.org/docs/utilities/family

const storage = createJSONStorage(() => AsyncStorage);

// USER ---------------------------------------------------------------------------
export const userAtom = atom({
  id: 7,
  displayName: "John Doe",
  username: "johndoe",
  profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
});

// HABITS -------------------------------------------------------------------------
const habitsAtom = atom<AllHabitsDataType>([]);
habitsAtom.onMount = (set) => {
  console.log("fetched all habit data");
  fetchHabits().then(set);
};

// habit info
export const habitInfoAtom = atomFamily((id: number) =>
  atom(
    (get) => get(habitsAtom)[id].habitInfo,
    (_get, set, newValue: HabitInfo) => {
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
// export const habitInfoAtom = atomFamily((id: number) =>
//   atom(
//     (get) => get(habitsAtom)[id].habitInfo,
//     (_get, set, newValue: HabitInfo) => {
//       updateHabitInfoInDB(id, newValue);
//       set(habitsAtom, (prev) => {
//         return {
//           ...prev,
//           [id]: {
//             ...prev[id],
//             habitInfo: newValue,
//           },
//         };
//       });
//     },
//   ),
// );
export const habitParticipantsAtom = atomFamily((id: number) =>
  atom(
    (get) => get(habitsAtom)[id].habitParticipants,
    (_get, set, newValue: HabitParticipant[]) => {
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
export const habitParticipantIdsAtom = atomFamily((habitId: number) =>
  atom((get) => get(habitParticipantsAtom(habitId)).map((p) => p.id)),
);
export const habitParticipantAtom = atomFamily(
  ({ habitId, participantId }: { habitId: number; participantId: number }) =>
    atom((get) => {
      const habitParticipants = get(habitParticipantsAtom(habitId));
      const participant = habitParticipants.find(
        (participant) => participant.id === participantId,
      )!;
      return participant;
    }),
  (a, b) => a.habitId === b.habitId && a.participantId === b.participantId,
);
export const allHabitParticipantCompletionsAtom = atomFamily(
  (habitId: number) => {
    const allParticipantCompletionsAtom = atom<{
      [participantId: number]: HabitCompletion[];
    }>({});

    return allParticipantCompletionsAtom;
  },
);

// export const habitParticipantCompletionsAtom = atomFamily(
//   ({ habitId, participantId }: { habitId: number; participantId: number }) => {
//     const completionsAtom = atom<HabitCompletion[]>([]);
//     completionsAtom.onMount = (set) => {
//       if (participantId === 1) {
//         console.log("mounted")
//       }
//       const completions = getMockHabitCompletionData(habitId);
//       set(completions);
//     }
//     return completionsAtom;
//   },
//   (a, b) => a.habitId === b.habitId && a.participantId === b.participantId,
// );

// whether we should display the habit in weekly or monthly view
export const habitDisplayTypeAtom = atomFamily((id: number) =>
  atomWithStorage<HabitDisplayType>(
    `habitDisplayType-${id}`,
    "weekly-view",
    storage as AsyncStorageType<HabitDisplayType>,
    { getOnInit: true },
  ),
);
