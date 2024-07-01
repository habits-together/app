import colors from "@/src/constants/colors";
import { Link } from "expo-router";
import { useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import React from "react";
import { Pressable, View } from "react-native";
import { habitColorAtom, habitDisplayTypeAtom } from "../../atoms/atoms";
import HabitCompletionButton from "./HabitCompletionButton";
import HabitCompletionsMonthlyView from "./HabitCompletionsMonthlyView";
import HabitCompletionsWeeklyView from "./HabitCompletionsWeeklyView";
import { HabitFriendCompletions } from "./HabitFriendCompletions";
import { HabitHeader } from "./HabitHeader";

export function HabitCard({ habitId }: { habitId: string }) {
  const { colorScheme } = useColorScheme();
  const displayType = useAtomValue(habitDisplayTypeAtom(habitId));
  const color = useAtomValue(habitColorAtom(habitId));

  return (
    <Link
      push
      href={{
        pathname: "/viewhabit",
        params: { id: habitId },
      }}
      asChild
    >
      <Pressable
        className="flex h-[171px] flex-col items-start rounded-3xl px-3 pb-2"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.stone.light
              : colors.habitColors[color].light,
        }}
      >
        <HabitHeader habitId={habitId} />
        {displayType === "weekly-view" && (
          <>
            <View className="h-[10px]" />
            <HabitFriendCompletions habitId={habitId} />
            <View className="h-[10px]" />
            <HabitCompletionsWeeklyView habitId={habitId} />
          </>
        )}
        {displayType === "monthly-view" && (
          <>
            <View className="h-[10px]" />
            <View className="flex w-full flex-1 flex-row">
              <HabitCompletionsMonthlyView habitId={habitId} />
              <View className="w-[10px]" />
              <View className="flex flex-1 flex-col items-end justify-between">
                <HabitFriendCompletions habitId={habitId} />
                <HabitCompletionButton habitId={habitId} />
              </View>
            </View>
          </>
        )}
      </Pressable>
    </Link>
  );
}
