import {
  habitCompletionAtomsAtom,
  habitGoalAtom,
  todaysCompletionAtom,
} from "@/src/atoms/atoms";
import { maxNumWeeksToDisplay } from "@/src/constants/constants";
import { getNumberOfDaysInLastWeek } from "@/src/lib/getNumberOfDaysInLastWeek";
import { useAtomValue } from "jotai";
import React from "react";
import { Dimensions, View } from "react-native";
import MonthlyViewCompletionSquare from "./MonthlyViewCompletionSquare";
import MonthlyViewWeeklyGoalCheckmarks from "./MonthlyViewWeeklyGoalCheckmarks";

export default function HabitCompletionsMonthlyView({
  habitId,
  userId,
  currentScreen,
}: {
  habitId: string;
  userId: string;
  currentScreen: "home" | "view-habit";
}) {
  const goal = useAtomValue(habitGoalAtom(habitId));
  const completionAtoms = useAtomValue(
    habitCompletionAtomsAtom({ habitId, participantId: userId }),
  );
  const numberOfDaysInLastWeek = getNumberOfDaysInLastWeek();

  // We want the completions to fill up any space on the screen
  // These are some calculations to accomodate for different screen widths
  const screenWidth = Dimensions.get("window").width;
  const completionSquareWidth = 16;
  // Magic number to account for other elements on the screen
  const containerWidth = screenWidth - (currentScreen === "home" ? 185 : 78);
  const numWeeksToDisplay = Math.min(
    Math.ceil(containerWidth / completionSquareWidth),
    maxNumWeeksToDisplay,
  );
  const numDaysToDisplay = (numWeeksToDisplay - 1) * 7 + numberOfDaysInLastWeek;

  return (
    <View className="relative mx-auto flex flex-col">
      {goal.period === "weekly" && (
        <MonthlyViewWeeklyGoalCheckmarks
          habitId={habitId}
          participantId={userId}
          numWeeksToDisplay={numWeeksToDisplay}
        />
      )}
      <View className={`flex flex-col flex-wrap`}>
        {completionAtoms.length >= numDaysToDisplay && // prevent errors on load
          completionAtoms
            .slice(completionAtoms.length - numDaysToDisplay, -1)
            .map((completionAtom, index) => (
              <View key={completionAtom.toString()}>
                <MonthlyViewCompletionSquare
                  habitId={habitId}
                  completionAtom={completionAtom}
                />
              </View>
            ))}
        <MonthlyViewCompletionSquare
          habitId={habitId}
          completionAtom={todaysCompletionAtom({
            habitId,
            participantId: userId,
          })}
        />
      </View>
    </View>
  );
}
