import { habitCompletionsAtom } from "@/src/atoms/atoms";
import { useAtomValue } from "jotai";
import React from "react";
import { View } from "react-native";
import HabitCompletionButton from "./HabitCompletionButton";
import WeeklyViewCompletionSquare from "./WeeklyViewCompletionSquare";

export default function HabitCompletionsWeeklyView({
  habitId,
}: {
  habitId: number;
}) {
  const completionData = useAtomValue(habitCompletionsAtom(habitId));

  return (
    <View className="flex w-full flex-1 flex-row items-end justify-between">
      {completionData.slice(-7, -1).map((completion, index) => (
        <WeeklyViewCompletionSquare
          key={index}
          habitId={habitId}
          completion={completion}
        />
      ))}
      <HabitCompletionButton habitId={habitId} />
    </View>
  );
}
