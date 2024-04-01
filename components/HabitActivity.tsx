import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "@/constants/colors";
import { IconBook, IconCheck } from "@tabler/icons-react-native";
import DotsMenu from "./DotsMenu";
import { getMockCompletionsData } from "@/lib/mockHabitData";
import Icon from "./Icon";
const WeekDays = ["M", "T", "W", "T", "F", "S", "S"];

export type HabitCompletionValue =
  | "completed"
  | "missed"
  | "not-applicable" // for dates in the future
  | "partial"; // when the goal is multiple times per day

export function HabitActivity({ title }: { title: string }) {
  const activityData = getMockCompletionsData();
  // make an array with 14 days (2 weeks) chunks
  function chunkArray(array: HabitCompletionValue[]) {
    let result: HabitCompletionValue[][] = [];
    for (let i = 0; i < array.length; i += 14) {
      result.push(array.slice(i, i + 14));
    }
    return result;
  }
  const chunkedActivityData = chunkArray(activityData);

  function getColorClassesFromCompletionValue(value: HabitCompletionValue) {
    switch (value) {
      case "completed":
        return "bg-orange-base";
      case "missed":
        return "bg-orange-faded dark:bg-stone-faded";
      case "not-applicable":
        return "";
      case "partial":
        return "bg-orange-base"; // TODO
    }
  }

  return (
    <View className="w-full p-3 bg-orange-light dark:bg-stone-light rounded-3xl">
      <View className="ml-2 flex-row items-center justify-between">
        <View className="mr-2 flex-row items-center gap-1 flex-1">
          <Icon icon={IconBook} />
          <Text
            numberOfLines={1}
            className="text-black dark:text-white font-bold text-xl mb-1 flex-1"
          >
            {title}
          </Text>
        </View>
        <DotsMenu options={[]} />
      </View>

      <View className="flex flex-row">
        {[1, 2].map(
          (
            order // need to repeat the days twice
          ) =>
            WeekDays.map((day, index) => (
              <Text
                key={order * index}
                className="flex-1 mx-0.5 text-center text-orange-text dark:text-stone-text font-semibold"
              >
                {day}
              </Text>
            ))
        )}
      </View>
      {chunkedActivityData.map((weekRow, rowIndex) => (
        <View key={`row-${rowIndex}`} className="flex flex-row">
          {weekRow.map((data: HabitCompletionValue, index: number) => (
            <View
              key={`data-${rowIndex}-${index}`}
              className={`flex-1 aspect-square ${getColorClassesFromCompletionValue(
                data
              )} rounded m-0.5`}
            />
          ))}
        </View>
      ))}
      <CompletionButton />
    </View>
  );
}

function CompletionButton() {
  return (
    <TouchableOpacity
      className="self-end rounded-full w-12 h-12 bg-blue-500 mt-3" // Adjust width (w-20) and height (h-20) to your needs
    >
      <View className="rounded-full bg-orange-faded dark:bg-stone-faded w-full h-full items-center justify-center">
        <Icon
          icon={IconCheck}
          size={34}
          lightColor={colors.orange.light}
          darkColor={colors.stone.light}
          strokeWidth={4}
        />
      </View>
    </TouchableOpacity>
  );
}
