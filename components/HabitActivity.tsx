import React, { useState } from "react";
import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import colors from "@/constants/colors";
import { IconBook, IconCheck } from "@tabler/icons-react-native";
import DotsMenu from "./DotsMenu";
import { getMockCompletionsData } from "@/lib/mockHabitData";
const WeekDays = ["M", "T", "W", "T", "F", "S", "S"];

export function HabitActivity({ title }: { title: string }) {
  const activityData = getMockCompletionsData();

  // make an array with 14 days (2 weeks) chunks
  function chunkArray(array: any) {
    let result = [];
    for (let i = 0; i < array.length; i += 14) {
      result.push(array.slice(i, i + 14));
    }
    return result;
  }
  const chunkedActivityData = chunkArray(activityData);

  function getColorForValue(value: any) {
    switch (value) {
      case 0:
        return "bg-orange-faded dark:bg-stone-faded";
      case 1:
        return "bg-orange-base";
      default:
        return "bg-orange-faded dark:bg-stone-faded";
    }
  }
  const colorScheme = useColorScheme();
  const iconProps = {
    size: 24,
    color: colorScheme === "dark" ? colors.white : colors.black,
    strokeWidth: 2,
  };
  return (
    <View className="w-full py-3 bg-orange-light dark:bg-stone-light rounded-3xl pl-[10px]">
      <View className="flex-row items-center justify-between mr-4">
        <View className="flex-row items-center gap-1 flex-grow">
          <IconBook {...iconProps} />
          <Text className="text-black dark:text-white font-bold text-xl mb-1">
            {title}
          </Text>
        </View>
        <DotsMenu options={[]} />
      </View>

      <View className="flex flex-row">
        {WeekDays.map((day, index) => (
          <Text
            key={index}
            className="w-[5.7%] mx-0.5 text-center text-orange-text dark:text-stone-text font-semibold"
          >
            {day}
          </Text>
        ))}

        {WeekDays.map((day, index) => (
          <Text
            key={index}
            className="w-[5.7%] mx-0.5 text-center text-orange-text dark:text-stone-text font-semibold"
          >
            {day}
          </Text>
        ))}
      </View>
      {chunkedActivityData.map((weekRow, rowIndex) => (
        <View key={`row-${rowIndex}`} className="flex flex-row">
          {weekRow.map((data: any, index: any) => (
            <View
              key={`data-${rowIndex}-${index}`}
              className={`w-[5.7%] aspect-square ${getColorForValue(
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
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      className="self-end rounded-full w-12 h-12 bg-blue-500 mt-3 mr-3" // Adjust width (w-20) and height (h-20) to your needs
    >
      <View className="rounded-full bg-orange-faded dark:bg-stone-faded w-full h-full items-center justify-center">
        <IconCheck
          size={34}
          color={
            colorScheme === "dark" ? colors.stone.light : colors.orange.light
          }
          strokeWidth={4}
        />
      </View>
    </TouchableOpacity>
  );
}
