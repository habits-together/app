import { currentUserIdAtom } from "@/src/atoms/currentUserAtom";
import colors from "@/src/constants/colors";
import { HabitIdT } from "@/src/lib/db_types";
import { Link } from "expo-router";
import { useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import React from "react";
import { Pressable, View } from "react-native";
import {
  habitColorAtom,
  homeScreenHabitDisplayTypeAtom,
} from "../../atoms/atoms";
import HabitCompletionButton from "./HabitCompletionButton";
import HabitCompletionsMonthlyView from "./HabitCompletionsMonthlyView";
import HabitCompletionsWeeklyView from "./HabitCompletionsWeeklyView";
import { HabitFriendCompletions } from "./HabitFriendCompletions";
import { HabitHeader } from "./HabitHeader";

export function HabitCard({
  habitId,
  isInteractive = true,
}: {
  habitId: HabitIdT;
  isInteractive?: boolean;
}) {
  const { colorScheme } = useColorScheme();
  const displayTypeValue = useAtomValue(
    homeScreenHabitDisplayTypeAtom(habitId),
  );
  const color = useAtomValue(habitColorAtom(habitId));
  const userId = useAtomValue(currentUserIdAtom);
  return (
    <Link
      push
      href={{
        pathname: "/habits/viewhabit",
        params: { habitId: habitId },
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
        <HabitHeader habitId={habitId} isInteractive={isInteractive} />
        {displayTypeValue === "weekly-view" && (
          <>
            <View className="h-[10px]" />
            {isInteractive && <HabitFriendCompletions habitId={habitId} />}
            <View className="h-[10px]" />
            <HabitCompletionsWeeklyView habitId={habitId} isInteractive={isInteractive} />
          </>
        )}
        {displayTypeValue === "monthly-view" && (
          <>
            <View className="h-[10px]" />
            <View className="flex w-full flex-1 flex-row">
              <HabitCompletionsMonthlyView
                habitId={habitId}
                userId={userId}
                currentScreen="home"
              />
              {isInteractive && (
                <>
                  <View className="w-[10px]" />
                  <View className="flex flex-1 flex-col items-end justify-between">
                    <HabitFriendCompletions habitId={habitId} />
                    <HabitCompletionButton habitId={habitId} />
                  </View>
                </>
              )}
            </View>
          </>
        )}
      </Pressable>
    </Link>
  );
}
