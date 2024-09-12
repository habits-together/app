import { homeScreenHabitDisplayTypeAtom } from "@/src/atoms/atoms";
import { currentUserIdAtom } from "@/src/atoms/currentUserAtom";
import { View } from "@/src/components/Themed";
import HabitCompletionButton from "@/src/components/habit-components/HabitCompletionButton";
import HabitCompletionsMonthlyView from "@/src/components/habit-components/HabitCompletionsMonthlyView";
import HabitCompletionsWeeklyView from "@/src/components/habit-components/HabitCompletionsWeeklyView";
import { HabitFriendCompletions } from "@/src/components/habit-components/HabitFriendCompletions";
import { HabitHeader } from "@/src/components/habit-components/HabitHeader";
import colors from "@/src/constants/colors";
import { HabitIdT, habitT } from "@/src/lib/db_types";
import { Link } from "expo-router";
import { useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import { Pressable } from "react-native";

export function HabitCard({
  habit,
  isInteractive = true,
}: {
  habit: habitT & { id: HabitIdT };
  isInteractive?: boolean;
}) {
  const { id: habitId, color } = habit;
  const { colorScheme } = useColorScheme();
  const displayType = useAtomValue(homeScreenHabitDisplayTypeAtom(habit.id)); // replace with useMMKV
  const userId = useAtomValue(currentUserIdAtom); // will be able to remove later

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
        {displayType === "weekly-view" && (
          <>
            <View className="h-[10px]" />
            {isInteractive && <HabitFriendCompletions habitId={habitId} />}
            <View className="h-[10px]" />
            <HabitCompletionsWeeklyView
              habitId={habitId}
              isInteractive={isInteractive}
            />
          </>
        )}
        {displayType === "monthly-view" && (
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
