import {
  deleteHabitAtom,
  habitIconAtom,
  habitTitleAtom,
  homeScreenHabitDisplayTypeAtom,
} from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { HabitIdT } from "@/src/lib/db_types";
import { router } from "expo-router";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { Text, View } from "react-native";
import DotsMenu from "../DotsMenu";
import { HabitIcon } from "../Icon";

export function HabitHeader({ habitId }: { habitId: HabitIdT }) {
  const [displayType, setDisplayType] = useAtom(
    homeScreenHabitDisplayTypeAtom(habitId),
  );
  const title = useAtomValue(habitTitleAtom(habitId));
  const icon = useAtomValue(habitIconAtom(habitId));
  const deleteHabit = useSetAtom(deleteHabitAtom(habitId));

  return (
    <View className="-mb-[10px] ml-1 flex-row items-center justify-between">
      <View className="mr-2 flex-1 flex-row items-center gap-1">
        <HabitIcon icon={icon} />
        <Text
          numberOfLines={1}
          className="mb-1 flex-1 text-base font-bold text-black dark:text-white"
        >
          {title}
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
                  params: { habitidStr: habitId },
                });
              },
            },
            {
              label: "Delete",
              color: colors.black,
              action: () => {
                deleteHabit();
              },
            },
          ]}
        />
      </View>
    </View>
  );
}
