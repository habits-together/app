import {
  habitColorAtom,
  habitGoalAtom,
  targetNumberOfCompletionsPerDayAtom,
} from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { habitCompletionWithDateInfoT } from "@/src/lib/db_types";
import { Atom, useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import React from "react";
import { View } from "react-native";

export default function MonthlyViewCompletionSquare({
  habitId,
  completionAtom,
}: {
  habitId: string;
  completionAtom: Atom<habitCompletionWithDateInfoT>;
}) {
  const { colorScheme } = useColorScheme();

  const completion = useAtomValue(completionAtom);
  const goalPeriod = useAtomValue(habitGoalAtom(habitId)).period;
  const targetNumberOfCompletionsPerDay = useAtomValue(
    targetNumberOfCompletionsPerDayAtom(habitId),
  );
  const color = useAtomValue(habitColorAtom(habitId));

  function getHabitSquareOpacity(numCompletions: number) {
    switch (goalPeriod) {
      case "daily":
        return numCompletions / targetNumberOfCompletionsPerDay;
      case "weekly":
        return numCompletions;
    }
  }

  return (
    <View
      className="relative mx-[1.5px] my-[1.5px] h-[13px] w-[13px] overflow-hidden rounded"
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? colors.stone.faded
            : colors.habitColors[color].faded,
      }}
    >
      {/* base color fill (can be partially transparent for multiple-times-per-day habit) */}
      <View
        className="absolute h-full w-full"
        style={{
          backgroundColor: colors.habitColors[color].base,
          opacity: getHabitSquareOpacity(completion.numberOfCompletions),
        }}
      />
    </View>
  );
}
