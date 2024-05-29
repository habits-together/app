import {
  habitColorAtom,
  habitDisplayTypeAtom,
  incrementNumberOfCompletionsTodayAtom,
  numberOfCompletionsTodayAtom,
  targetNumberOfCompletionsPerDayAtom,
} from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { IconCheck } from "@tabler/icons-react-native";
import { useAtomValue, useSetAtom } from "jotai";
import { useColorScheme } from "nativewind";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "../Icon";

export default function HabitCompletionButton({
  habitId,
}: {
  habitId: number;
}) {
  const { colorScheme } = useColorScheme();

  const color = useAtomValue(habitColorAtom(habitId));

  const numberOfCompletionsToday = useAtomValue(
    numberOfCompletionsTodayAtom(habitId),
  );
  const incrementNumberOfCompletionsToday = useSetAtom(
    incrementNumberOfCompletionsTodayAtom(habitId),
  );
  const targetNumberOfCompletionsPerDay = useAtomValue(
    targetNumberOfCompletionsPerDayAtom(habitId),
  );

  const displayType = useAtomValue(habitDisplayTypeAtom(habitId));

  return (
    <View className="flex flex-col items-center gap-1">
      <Pressable
        onPress={incrementNumberOfCompletionsToday}
        className={`relative flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-full`}
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.stone.faded
              : colors.habitColors[color].faded,
        }}
      >
        {/* base color fill (can be partial for multiple-times-per-day habit) */}
        <View
          className="absolute bottom-0 w-full"
          style={{
            backgroundColor: colors.habitColors[color].base,
            // constant is height of button
            height:
              (numberOfCompletionsToday / targetNumberOfCompletionsPerDay) * 48,
          }}
        />
        {/* check mark */}
        <Icon
          icon={IconCheck}
          size={28}
          strokeWidth={4}
          lightColor={
            numberOfCompletionsToday === targetNumberOfCompletionsPerDay
              ? colors.white
              : colors.habitColors[color].light
          }
          darkColor={
            numberOfCompletionsToday === targetNumberOfCompletionsPerDay
              ? colors.white
              : colors.stone.light
          }
        />
      </Pressable>
      {displayType === "weekly-view" && (
        <Text
          className="text-xs font-semibold"
          style={{
            color:
              colorScheme === "dark"
                ? colors.stone.text
                : colors.habitColors[color].text,
          }}
        >
          Today
        </Text>
      )}
    </View>
  );
}
