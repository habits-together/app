import {
  habitColorAtom,
  habitDisplayTypeAtom,
  habitGoalAtom,
} from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { getTranslucentColor } from "@/src/lib/getTranslucentColor";
import { IconActivity, IconCheck } from "@tabler/icons-react-native";
import { useAtomValue } from "jotai";
import React from "react";
import { Text, View } from "react-native";
import Icon from "../Icon";

export default function HabitParticipantCompletedBadge({
  habitId,
}: {
  habitId: string;
}) {
  const goal = useAtomValue(habitGoalAtom(habitId));
  const color = useAtomValue(habitColorAtom(habitId));
  const displayType = useAtomValue(habitDisplayTypeAtom(habitId));

  function getCompletedBadgeText() {
    if (
      displayType === "weekly-view" &&
      goal.period === "daily" &&
      goal.completionsPerPeriod === 1
    )
      return "Completed today";
    if (
      displayType === "weekly-view" &&
      goal.period === "daily" &&
      goal.completionsPerPeriod > 1
    )
      return "Activity today";
    if (displayType === "weekly-view" && goal.period === "weekly")
      return "Completed this week";
    if (displayType === "monthly-view" && goal.period === "daily")
      return "Today";
    if (displayType === "monthly-view" && goal.period === "weekly")
      return "This week";
  }

  return (
    <View
      className="flex h-5 flex-row items-center rounded-full border px-[10px] text-habitColors-red-base"
      style={{
        borderColor: colors.habitColors[color].base,
        backgroundColor: getTranslucentColor(
          colors.habitColors[color].base,
          0.15,
        ),
      }}
    >
      <Icon
        icon={
          goal.period === "daily" && goal.completionsPerPeriod > 1
            ? IconActivity
            : IconCheck
        }
        size={12}
        strokeWidth={3}
        lightColor={colors.habitColors[color].base}
        darkColor={colors.habitColors[color].base}
      />
      <Text
        className="ml-[2px] text-xs font-semibold"
        style={{ color: colors.habitColors[color].base }}
      >
        {getCompletedBadgeText()}
      </Text>
    </View>
  );
}
