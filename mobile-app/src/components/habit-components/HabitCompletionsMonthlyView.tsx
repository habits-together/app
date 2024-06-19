import {
  habitGoalAtom,
  myStructuredHabitCompletionsAtom,
  numberOfCompletionsTodayAtom,
  targetNumberOfCompletionsPerWeekAtom,
} from "@/src/atoms/atoms";
import { habitCompletionWithDateInfoT } from "@/src/lib/db_types";
import { getNumberOfDaysInLastWeek } from "@/src/lib/mockData";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MonthlyViewCompletionSquare from "./MonthlyViewCompletionSquare";
import WeekGoalMetCheckmark from "./WeekGoalMetCheckmark";

// const numDays = 4;

export default function HabitCompletionsMonthlyView({
  habitId,
}: {
  habitId: string;
}) {
  const goal = useAtomValue(habitGoalAtom(habitId));
  const completionData = useAtomValue(
    myStructuredHabitCompletionsAtom(habitId),
  );
  const numberOfCompletionsToday = useAtomValue(
    numberOfCompletionsTodayAtom(habitId),
  );
  const targetNumberOfCompletionsPerWeek = useAtomValue(
    targetNumberOfCompletionsPerWeekAtom(habitId),
  );

  const numberOfDaysInLastWeek = getNumberOfDaysInLastWeek();

  // calculate how many weeks we need to display
  const [numWeeks, setNumWeeks] = useState(0);
  useEffect(() => {
    setNumWeeks(Math.ceil(completionData.length / 7));
  }, [completionData.length]);

  // separate each week of completions into its own array
  const [completionsByWeek, setCompletionsByWeek] = useState<
    habitCompletionWithDateInfoT[][]
  >([]);

  useEffect(() => {
    if (completionData.length === 0) return;
    setCompletionsByWeek(
      Array.from({ length: numWeeks }, (_, index) =>
        completionData.slice(index * 7, (index + 1) * 7),
      ),
    );
  }, [numWeeks, completionData]);

  // see if each week's goal is met
  const [weekGoalsMet, setWeekGoalsMet] = useState<boolean[]>([]);
  useEffect(() => {
    if (completionsByWeek.length === 0) return;
    const allExceptThisWeek = completionsByWeek.slice(0, -1).map(
      (week) =>
        // calculate sum
        week.reduce(
          (acc, completion) => acc + completion.numberOfCompletions,
          0,
        ) >= targetNumberOfCompletionsPerWeek,
    );
    // this one includes today's completions
    const thisWeek =
      completionsByWeek[numWeeks - 1].reduce(
        (acc, completion) => acc + completion.numberOfCompletions,
        0,
      ) +
        numberOfCompletionsToday >=
      targetNumberOfCompletionsPerWeek;

    setWeekGoalsMet([...allExceptThisWeek, thisWeek]);
  }, [
    completionsByWeek,
    targetNumberOfCompletionsPerWeek,
    numberOfCompletionsToday,
  ]);

  return (
    <View
      className={`flex flex-row ${goal.period === "weekly" && "-mt-[13px]"}`}
    >
      {/* all columns except the last one */}
      {completionsByWeek.length > 0 &&
        completionsByWeek
          .slice(0, completionsByWeek.length - 1)
          .map((completions, index) => (
            <View key={index} className="mr-[3px] flex flex-col">
              {goal.period === "weekly" && (
                <WeekGoalMetCheckmark
                  habitId={habitId}
                  weekGoalMet={weekGoalsMet[index]}
                />
              )}
              {completions.map((completion, dayIndex) => (
                <MonthlyViewCompletionSquare
                  key={index * 7 + dayIndex}
                  habitId={habitId}
                  numberOfCompletions={completion.numberOfCompletions}
                />
              ))}
            </View>
          ))}
      {/* last column needs to be separate */}
      {/* because we need to pass numberOfCompletionsToday to today's square */}
      <View className="flex flex-col">
        {goal.period === "weekly" && (
          <WeekGoalMetCheckmark
            habitId={habitId}
            weekGoalMet={weekGoalsMet[completionsByWeek.length - 1]}
          />
        )}
        {completionsByWeek.length > 0 &&
          completionsByWeek[numWeeks - 1]
            .slice(0, numberOfDaysInLastWeek - 1)
            .map((completion, dayIndex) => (
              <MonthlyViewCompletionSquare
                key={7 * 7 + dayIndex}
                habitId={habitId}
                numberOfCompletions={completion.numberOfCompletions}
              />
            ))}
        <MonthlyViewCompletionSquare
          habitId={habitId}
          numberOfCompletions={numberOfCompletionsToday}
        />
      </View>
    </View>
  );
}
