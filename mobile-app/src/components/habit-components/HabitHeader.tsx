import { habitDisplayTypeAtom, habitInfoAtom } from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { router } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import { Text, View } from "react-native";
import DotsMenu from "../DotsMenu";
import { HabitIcon } from "../Icon";

export function HabitHeader({ habitId }: { habitId: number }) {
  const habit = useAtomValue(habitInfoAtom(habitId));
  const [displayType, setDisplayType] = useAtom(habitDisplayTypeAtom(habitId));

  return (
    <View className="-mb-[10px] ml-1 flex-row items-center justify-between">
      <View className="mr-2 flex-1 flex-row items-center gap-1">
        <HabitIcon icon={"habit.icon"} />
        <Text
          numberOfLines={1}
          className="mb-1 flex-1 text-base font-bold text-black dark:text-white"
        >
          {"habit.title"}
        </Text>
      </View>

      <View className="">
        <DotsMenu
          options={[
            // change to other view
            {
              label: `Change to ${displayType === "weekly-view" ? "monthly" : "weekly"} view`,
              color: colors.black,
              action: () =>
                setDisplayType(
                  displayType === "weekly-view"
                    ? "monthly-view"
                    : "weekly-view",
                ),
            },
            {
              label: "Edit",
              color: colors.black,
              action: () => {
                router.push({
                  pathname: "/habits/edithabit",
                  params: { habitidStr: habitId.toString() },
                });
              },
            },
            {
              label: "Delete",
              color: colors.black,
              action: () => alert(`Delete`),
            },
          ]}
        />
      </View>
    </View>
  );
}
