import { habitCompletionAtomsAtom } from "@/src/atoms/atoms";
import { currentUserIdAtom } from "@/src/atoms/currentUserAtom";
import { useAtomValue } from "jotai";
import React from "react";
import { View } from "react-native";
import HabitCompletionButton from "./HabitCompletionButton";
import WeeklyViewCompletionSquare from "./WeeklyViewCompletionSquare";
import { HabitIdT } from "@/src/lib/db_types";

export default function HabitCompletionsWeeklyView({
  habitId,
}: {
  habitId: HabitIdT;
}) {
  const userId = useAtomValue(currentUserIdAtom);
  const completionAtoms = useAtomValue(
    habitCompletionAtomsAtom({ habitId, participantId: userId }),
  );

  return (
    <View className="flex w-full flex-1 flex-row items-end justify-between">
      {completionAtoms.slice(-7, -1).map((completionAtom, index) => (
        <WeeklyViewCompletionSquare
          key={index}
          habitId={habitId}
          completionAtom={completionAtom}
        />
      ))}
      <HabitCompletionButton habitId={habitId} />
    </View>
  );
}
