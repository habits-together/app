import React, { useState } from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import colors from "@/constants/colors";
import { Icon as TablerIcon, IconCheck } from "@tabler/icons-react-native";
import DotsMenu from "./DotsMenu";
import { getMockCompletionsData } from "@/lib/mockHabitData";
import Icon from "./Icon";
const WeekDays = ["M", "T", "W", "T", "F", "S", "S"];

export type HabitCardProps = {
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  displayType: "habit-tab" | "view-habit-page" | "friend's-habit";
};

export type HabitCompletionValue = "completed" | "missed" | "not-applicable";

export function HabitCard({ title, color, icon, displayType }: HabitCardProps) {
  const colorScheme = useColorScheme();

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
        return colors.habitColors[color].base;
      case "missed":
        return colorScheme === "dark"
          ? colors.stone.faded
          : colors.habitColors[color].faded;
      case "not-applicable":
        return;
    }
  }

  return (
    <View
      className="w-full p-3 rounded-3xl"
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? colors.stone.light
            : colors.habitColors[color].light,
      }}
    >
      {displayType !== "view-habit-page" && (
        <View className="ml-2 flex-row items-center justify-between">
          <View className="mr-2 flex-row items-center gap-1 flex-1">
            <Icon icon={icon} />
            <Text
              numberOfLines={1}
              className="text-black dark:text-white font-bold text-xl mb-1 flex-1"
            >
              {title}
            </Text>
          </View>
          {displayType === "habit-tab" && <DotsMenu options={[]} />}
        </View>
      )}

      <View className="flex flex-row">
        {[1, 2].map(
          (
            order // need to repeat the days twice
          ) =>
            WeekDays.map((day, index) => (
              <Text
                key={order * index}
                style={{
                  color:
                    colorScheme === "dark"
                      ? colors.stone.text
                      : colors.habitColors[color].text,
                }}
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
              style={{
                backgroundColor: getColorClassesFromCompletionValue(data),
              }}
              className={`flex-1 aspect-square  rounded m-0.5`}
            />
          ))}
        </View>
      ))}
      {/* 
      pfps:
      - later create its own component 
      - max 10 pfps, after that show a "+5" or similar like social media
      */}
      {displayType !== "view-habit-page" && (
        <View className="flex-row mt-3 justify-between">
          <View className="flex flex-row-reverse shrink">
            {[1, 2, 3, 4, 5 /*, 6, 7, 8, 9, 10*/].map((index) => (
              <View key={index} className="ml-auto">
                <View className="w-12 h-12 rounded-full bg-stone-200 border-2 border-black -mr-3" />
              </View>
            ))}
          </View>
          {displayType === "habit-tab" && <CompletionButton color={color} />}
        </View>
      )}
    </View>
  );
}

function CompletionButton({
  color,
}: {
  color: keyof typeof colors.habitColors;
}) {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      className="rounded-full w-12 h-12 bg-blue-500 ml-8" // Adjust width (w-20) and height (h-20) to your needs
    >
      <View
        className="rounded-full w-full h-full items-center justify-center"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.stone.faded
              : colors.habitColors[color].faded,
        }}
      >
        <Icon
          icon={IconCheck}
          size={34}
          lightColor={colors.habitColors[color].light}
          darkColor={colors.stone.light}
          strokeWidth={4}
        />
      </View>
    </TouchableOpacity>
  );
}
