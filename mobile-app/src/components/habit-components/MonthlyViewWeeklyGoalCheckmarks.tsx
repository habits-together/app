import {
  structuredHabitCompletionsAtom,
  targetNumberOfCompletionsPerWeekAtom,
  todaysCompletionAtom,
} from "@/src/atoms/atoms";
import { getNumberOfDaysInLastWeek } from "@/src/lib/getNumberOfDaysInLastWeek";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import WeekGoalMetCheckmark from "./WeekGoalMetCheckmark";

export default function MonthlyViewWeeklyGoalCheckmarks({
  habitId,
  participantId,
  numWeeksToDisplay,
}: {
  habitId: string;
  participantId: string;
  numWeeksToDisplay: number;
}) {
  const [previousWeeksGoalsMet, setPreviousWeeksGoalsMet] = useState<boolean[]>(
    [],
  );
  const [thisWeekGoalMet, setThisWeekGoalMet] = useState<boolean>(false);
  const completions = useAtomValue(
    structuredHabitCompletionsAtom({ habitId, participantId }),
  );
  const targetNumberOfCompletionsPerWeek = useAtomValue(
    targetNumberOfCompletionsPerWeekAtom(habitId),
  );
  const numCompletionsToday = useAtomValue(
    todaysCompletionAtom({ habitId, participantId }),
  ).numberOfCompletions;

  useEffect(() => {
    const goalsMet = [];
    const offset =
      (completions.length - getNumberOfDaysInLastWeek()) / 7 -
      numWeeksToDisplay +
      1;
    for (let i = 0; i < numWeeksToDisplay - 1; i++) {
      let numCompletions = 0;
      for (let j = 0; j < 7; j++) {
        numCompletions +=
          completions[(offset + i) * 7 + j]?.numberOfCompletions ?? 1;
      }
      goalsMet.push(numCompletions >= targetNumberOfCompletionsPerWeek);
    }
    setPreviousWeeksGoalsMet(goalsMet);
  }, [completions, targetNumberOfCompletionsPerWeek]);

  useEffect(() => {
    setThisWeekGoalMet(
      completions
        .slice(-getNumberOfDaysInLastWeek())
        .reduce(
          (acc, completion) => acc + completion.numberOfCompletions,
          numCompletionsToday,
        ) >= targetNumberOfCompletionsPerWeek,
    );
  }, [completions, targetNumberOfCompletionsPerWeek, numCompletionsToday]);

  return (
    <View className="absolute flex -translate-y-[12px] flex-row">
      {previousWeeksGoalsMet.map((goalMet, index) => (
        <WeekGoalMetCheckmark
          key={index}
          habitId={habitId}
          weekGoalMet={goalMet}
        />
      ))}
      <WeekGoalMetCheckmark habitId={habitId} weekGoalMet={thisWeekGoalMet} />
    </View>
  );
}
