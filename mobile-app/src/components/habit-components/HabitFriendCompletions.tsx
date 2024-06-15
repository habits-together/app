import { habitColorAtom, habitDisplayTypeAtom } from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { getTranslucentColor } from "@/src/lib/getTranslucentColor";
import { useAtomValue } from "jotai";
import React from "react";
import { View } from "react-native";
import HabitParticipantCompletedBadge from "./HabitParticipantCompletedBadge";
import ParticipantProfilePictures from "./ParticipantProfilePictures";

export function HabitFriendCompletions({ habitId }: { habitId: number }) {
  const habitColor = useAtomValue(habitColorAtom(habitId));
  const displayType = useAtomValue(habitDisplayTypeAtom(habitId));

  return (
    <View
      className={`flex ${displayType === "weekly-view" ? "flex-row" : "w-full flex-col-reverse"} items-center rounded-[10px] border p-[5px]`}
      style={{
        borderColor: getTranslucentColor(
          colors.habitColors[habitColor].text,
          0.5,
        ),
      }}
    >
      <ParticipantProfilePictures habitId={habitId} />
      <View className="h-[5px] w-[5px]" />
      <HabitParticipantCompletedBadge habitId={habitId} />
    </View>
  );
}
