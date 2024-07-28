import {
  habitColorAtom,
  targetNumberOfCompletionsPerDayAtom,
} from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { habitCompletionWithDateInfoT, HabitIdT } from "@/src/lib/db_types";
import { IconCheck } from "@tabler/icons-react-native";
import { Atom, useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, View } from "react-native";
import Icon from "../Icon";

export default function WeeklyViewCompletionSquare({
  habitId,
  completionAtom,
}: {
  habitId: HabitIdT;
  completionAtom: Atom<habitCompletionWithDateInfoT>;
}) {
  const { colorScheme } = useColorScheme();

  const color = useAtomValue(habitColorAtom(habitId));
  const targetNumberOfCompletionsPerDay = useAtomValue(
    targetNumberOfCompletionsPerDayAtom(habitId),
  );

  const { numberOfCompletions, dayOfTheWeek, dayOfTheMonth } =
    useAtomValue(completionAtom);

  return (
    <View className="flex flex-col items-center gap-1">
      <View
        className="relative flex h-8 w-8 overflow-hidden rounded"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.stone.faded
              : colors.habitColors[color].faded,
        }}
      >
        {/* day of the month text */}
        {numberOfCompletions === 0 && (
          <Text
            className="mx-auto my-auto text-xs font-semibold"
            style={{
              color:
                colorScheme === "dark"
                  ? colors.stone.text
                  : colors.habitColors[color].text,
            }}
          >
            {dayOfTheMonth}
          </Text>
        )}
        {/* base color fill (can be partial for multiple-times-per-day habit) */}
        {numberOfCompletions > 0 && (
          <View
            className="absolute bottom-0 w-full"
            style={{
              backgroundColor: colors.habitColors[color].base,
              height:
                (numberOfCompletions / targetNumberOfCompletionsPerDay) * 32,
            }}
          ></View>
        )}
        {/* check mark */}
        {numberOfCompletions === targetNumberOfCompletionsPerDay && (
          <View className="mx-auto my-auto">
            <Icon
              icon={IconCheck}
              size={20}
              strokeWidth={4}
              lightColor={colors.white}
            />
          </View>
        )}
      </View>
      <Text
        className="text-xs font-semibold"
        style={{
          color:
            colorScheme === "dark"
              ? colors.stone.text
              : colors.habitColors[color].text,
        }}
      >
        {dayOfTheWeek}
      </Text>
    </View>
  );
}
