import colors from "@/src/constants/colors";
import { getNumberOfDaysInLastWeek } from "@/src/lib/mockData";
import { IconActivity, IconCheck } from "@tabler/icons-react-native";
import { Link } from "expo-router";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  habitColorAtom,
  habitCompletionsAtom,
  habitDisplayTypeAtom,
  habitGoalAtom,
  habitInfoAtom,
  habitParticipantsAtom,
  incrementNumberOfCompletionsTodayAtom,
  numberOfCompletionsTodayAtom,
  targetNumberOfCompletionsPerDayAtom,
  targetNumberOfCompletionsPerWeekAtom,
} from "../atoms/atoms";
import { getLocalRandomProfilePics } from "../lib/getRandomProfilePics";
import { getTranslucentColor } from "../lib/getTranslucentColor";
import { HabitCompletion } from "../lib/types";
import DotsMenu from "./DotsMenu";
import Icon from "./Icon";
import { SmallProfilePicture } from "./ProfilePicture";

export function HabitCard({ habitId }: { habitId: number }) {
  const { colorScheme } = useColorScheme();
  const displayType = useAtomValue(
    habitDisplayTypeAtom(habitId),
  );

  const habitInfo = useAtomValue(habitInfoAtom(habitId));

  return (
    <Link
      push
      href={{
        pathname: "/viewhabit",
        params: { id: habitId },
      }}
      asChild
    >
      <Pressable
        className="flex h-[171px] flex-col items-start rounded-3xl px-3 pb-2"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.stone.light
              : colors.habitColors[habitInfo.color].light,
        }}
      >
        <HabitCardHeader habitId={habitId} />
        {displayType === "weekly-view" && (
          <>
            <View className="h-[10px]" />
            <HabitCardFriendCompletions habitId={habitId} />
            <View className="h-[10px]" />
            <HabitCardCompletionsWeeklyView habitId={habitId} />
          </>
        )}
        {displayType === "monthly-view" && (
          <>
            <View className="h-[10px]" />
            <View className="flex w-full flex-1 flex-row">
              <HabitCardCompletionsMonthlyView habitId={habitId} />
              <View className="w-[10px]" />
              <View className="flex flex-1 flex-col items-end justify-between">
                <HabitCardFriendCompletions habitId={habitId} />
                <HabitCompletionButton habitId={habitId} />
              </View>
            </View>
          </>
        )}
      </Pressable>
    </Link>
  );
}

function HabitCardHeader({ habitId }: { habitId: number }) {
  const habit = useAtomValue(habitInfoAtom(habitId));
  const [displayType, setDisplayType] = useAtom(
    habitDisplayTypeAtom(habitId),
  );

  return (
    <View className="-mb-[10px] ml-1 flex-row items-center justify-between">
      <View className="mr-2 flex-1 flex-row items-center gap-1">
        <Icon icon={habit.icon} />
        <Text
          numberOfLines={1}
          className="mb-1 flex-1 text-base font-bold text-black dark:text-white"
        >
          {habit.title}
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
              action: () => alert(`Edit`),
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

function HabitCardFriendCompletions({ habitId }: { habitId: number }) {
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
      <FriendProfilePictures habitId={habitId} />
      <View className="h-[5px] w-[5px]" />
      <FriendCompletedBadge habitId={habitId} />
    </View>
  );
}

function FriendProfilePictures({ habitId }: { habitId: number }) {
  const { colorScheme } = useColorScheme();

  const displayType = useAtomValue(habitDisplayTypeAtom(habitId));

  // it would be good to figure out how to do this responsively based on screen width
  const maxPfps = displayType === "weekly-view" ? 6 : 4;

  const habitParticipantIds = useAtomValue(
    habitParticipantsAtom(habitId),
  );
  const [mockPfps, setMockPfps] = useState<
    { imgurl: string; hasCompleted: boolean }[]
  >([]);
  const [numPfpsToDisplay, setNumPfpsToDisplay] = useState<number>(maxPfps);

  const habitColor = useAtomValue(habitColorAtom(habitId));

  useEffect(() => {
    setMockPfps(getLocalRandomProfilePics(habitParticipantIds));
  }, []);

  useEffect(() => {
    // since we want to display x pfps
    // but if there are more, we want to take one away
    // in order to display the +y circle
    if (mockPfps.length === maxPfps) {
      setNumPfpsToDisplay(maxPfps);
    } else {
      setNumPfpsToDisplay(maxPfps - 1);
    }
  }, [mockPfps]);

  function ExtraHiddenPfpsCircle() {
    return (
      <View
        className="-mr-[7px] h-[30px] w-[30px] rounded-full"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.stone.faded
              : colors.habitColors[habitColor].faded,
        }}
      >
        <Text
          className="mx-auto my-auto pl-1 text-xs font-semibold"
          style={{
            color:
              colorScheme === "dark"
                ? colors.stone.text
                : colors.habitColors[habitColor].text,
          }}
        >
          +{mockPfps.length - maxPfps}
        </Text>
      </View>
    );
  }
  return (
    <View className="mr-[7px] flex flex-row-reverse">
      {mockPfps.length > maxPfps && <ExtraHiddenPfpsCircle />}
      {mockPfps.slice(0, numPfpsToDisplay).map((data, index) => (
        <View
          key={data.imgurl + index}
          className="-mr-[7px] rounded-full border"
          style={{ borderColor: colors.habitColors[habitColor].base }}
        >
          <SmallProfilePicture picUrl={data.imgurl} isLocalImage={true} />
        </View>
      ))}
    </View>
  );
}

function FriendCompletedBadge({ habitId }: { habitId: number }) {
  const habit = useAtomValue(habitInfoAtom(habitId));
  const goalPeriod = habit.goal.period;
  const displayType = useAtomValue(habitDisplayTypeAtom(habitId));

  function getCompletedBadgeText() {
    if (
      displayType === "weekly-view" &&
      goalPeriod === "daily" &&
      habit.goal.completionsPerPeriod === 1
    )
      return "Completed today";
    if (
      displayType === "weekly-view" &&
      goalPeriod === "daily" &&
      habit.goal.completionsPerPeriod > 1
    )
      return "Activity today";
    if (displayType === "weekly-view" && goalPeriod === "weekly")
      return "Completed this week";
    if (displayType === "monthly-view" && goalPeriod === "daily")
      return "Today";
    if (displayType === "monthly-view" && goalPeriod === "weekly")
      return "This week";
  }

  return (
    <View
      className="flex h-5 flex-row items-center rounded-full border px-[10px] text-habitColors-red-base"
      style={{
        borderColor: colors.habitColors[habit.color].base,
        backgroundColor: getTranslucentColor(
          colors.habitColors[habit.color].base,
          0.15,
        ),
      }}
    >
      <Icon
        icon={
          goalPeriod === "daily" && habit.goal.completionsPerPeriod > 1
            ? IconActivity
            : IconCheck
        }
        size={12}
        strokeWidth={3}
        lightColor={colors.habitColors[habit.color].base}
        darkColor={colors.habitColors[habit.color].base}
      />
      <Text
        className="ml-[2px] text-xs font-semibold"
        style={{ color: colors.habitColors[habit.color].base }}
      >
        {getCompletedBadgeText()}
      </Text>
    </View>
  );
}

function HabitCardCompletionsWeeklyView({ habitId }: { habitId: number }) {
  const habit = useAtomValue(habitInfoAtom(habitId));
  const completionData = useAtomValue(habitCompletionsAtom(habitId));

  return (
    <View className="flex w-full flex-1 flex-row items-end justify-between">
      {completionData.slice(0, 6).map((completion, index) => (
        <HabitCardWeeklyViewCompletionSquare
          key={index}
          habitId={habitId}
          completion={completion}
        />
      ))}
      <HabitCompletionButton habitId={habitId} />
    </View>
  );
}

function HabitCardWeeklyViewCompletionSquare({
  habitId,
  completion,
}: {
  habitId: number;
  completion: HabitCompletion;
}) {
  const { colorScheme } = useColorScheme();

  const color = useAtomValue(habitColorAtom(habitId));
  const targetNumberOfCompletionsPerDay = useAtomValue(
    targetNumberOfCompletionsPerDayAtom(habitId),
  );
  const { numberOfCompletions, dayOfTheMonth, dayOfTheWeek } = completion;

  return (
    <View className="flex flex-col items-center gap-1">
      <View
        className="relative flex h-8 w-8 overflow-hidden rounded"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.stone.faded
              : colors.habitColors[color].faded,
        }}
      >
        {/* day of the month text */}
        {numberOfCompletions === 0 && (
          <Text
            className="mx-auto my-auto text-xs font-semibold"
            style={{
              color:
                colorScheme === "dark"
                  ? colors.stone.text
                  : colors.habitColors[color].text,
            }}
          >
            {dayOfTheMonth}
          </Text>
        )}
        {/* base color fill (can be partial for multiple-times-per-day habit) */}
        {numberOfCompletions > 0 && (
          <View
            className="absolute bottom-0 w-full"
            style={{
              backgroundColor: colors.habitColors[color].base,
              height:
                (numberOfCompletions / targetNumberOfCompletionsPerDay) * 32,
            }}
          ></View>
        )}
        {/* check mark */}
        {numberOfCompletions === targetNumberOfCompletionsPerDay && (
          <View className="mx-auto my-auto">
            <Icon
              icon={IconCheck}
              size={20}
              strokeWidth={4}
              lightColor={colors.white}
            />
          </View>
        )}
      </View>
      <Text
        className="text-xs font-semibold"
        style={{
          color:
            colorScheme === "dark"
              ? colors.stone.text
              : colors.habitColors[color].text,
        }}
      >
        {dayOfTheWeek}
      </Text>
    </View>
  );
}

function HabitCardCompletionsMonthlyView({ habitId }: { habitId: number }) {
  const habit = useAtomValue(habitInfoAtom(habitId));
  const completionData = useAtomValue(habitCompletionsAtom(habitId));
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
    HabitCompletion[][]
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
    // include today's completions
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
      className={`flex flex-row ${habit.goal.period === "weekly" && "-mt-[13px]"}`}
    >
      {/* all columns except the last one */}
      {completionsByWeek.length > 0 &&
        completionsByWeek
          .slice(0, completionsByWeek.length - 1)
          .map((completions, index) => (
            <View key={index} className="mr-[3px] flex flex-col">
              {habit.goal.period === "weekly" && (
                <WeekGoalMetCheckmark
                  habitId={habitId}
                  weekGoalMet={weekGoalsMet[index]}
                />
              )}
              {completions.map((completion, dayIndex) => (
                <HabitCardMonthlyViewCompletionSquare
                  key={index * 7 + dayIndex}
                  habitId={habitId}
                  completion={completion}
                />
              ))}
            </View>
          ))}
      {/* last column needs to be separate */}
      {/* because we need to pass numberOfCompletionsToday to today's square */}
      <View className="flex flex-col">
        {habit.goal.period === "weekly" && (
          <WeekGoalMetCheckmark
            habitId={habitId}
            weekGoalMet={weekGoalsMet[completionsByWeek.length - 1]}
          />
        )}
        {completionsByWeek.length > 0 &&
          completionsByWeek[numWeeks - 1]
            .slice(0, numberOfDaysInLastWeek)
            .map((completion, dayIndex) => (
              <HabitCardMonthlyViewCompletionSquare
                key={7 * 7 + dayIndex}
                habitId={habitId}
                completion={completion}
              />
            ))}
        <HabitCardMonthlyViewCompletionSquare
          habitId={habitId}
          completion={{
            numberOfCompletions: numberOfCompletionsToday,
            dayOfTheWeek: "Today",
            dayOfTheMonth: new Date().getDay().toString(),
            date: new Date().toISOString().split("T")[0],
          }}
        />
      </View>
    </View>
  );
}

function WeekGoalMetCheckmark({
  habitId,
  weekGoalMet,
}: {
  habitId: number;
  weekGoalMet: boolean;
}) {
  const color = useAtomValue(habitColorAtom(habitId));

  return (
    <View className="h-[13px] w-[13px]">
      {weekGoalMet && (
        <Icon
          icon={IconCheck}
          size={12}
          strokeWidth={4}
          lightColor={colors.habitColors[color].base}
          darkColor={colors.habitColors[color].base}
        />
      )}
    </View>
  );
}

function HabitCardMonthlyViewCompletionSquare({
  habitId,
  completion,
}: {
  habitId: number;
  completion: HabitCompletion;
}) {
  const { colorScheme } = useColorScheme();

  const goalPeriod = useAtomValue(habitGoalAtom(habitId)).period;
  const targetNumberOfCompletionsPerDay = useAtomValue(
    targetNumberOfCompletionsPerDayAtom(habitId),
  );
  const color = useAtomValue(habitColorAtom(habitId));

  function getHabitSquareOpacity(numCompletions: number) {
    switch (goalPeriod) {
      case "daily":
        return numCompletions / targetNumberOfCompletionsPerDay;
      case "weekly":
        return numCompletions;
    }
  }

  return (
    <View
      className="relative mb-[3px] h-[13px] w-[13px] overflow-hidden rounded"
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? colors.stone.faded
            : colors.habitColors[color].faded,
      }}
    >
      {/* base color fill (can be partially transparent for multiple-times-per-day habit) */}
      <View
        className="absolute h-full w-full"
        style={{
          backgroundColor: colors.habitColors[color].base,
          opacity: getHabitSquareOpacity(completion.numberOfCompletions),
        }}
      />
    </View>
  );
}

function HabitCompletionButton({ habitId }: { habitId: number }) {
  const { colorScheme } = useColorScheme();

  const color = useAtomValue(habitColorAtom(habitId));

  const numberOfCompletionsToday = useAtomValue(
    numberOfCompletionsTodayAtom(habitId),
  );
  const incrementNumberOfCompletionsToday = useSetAtom(
    incrementNumberOfCompletionsTodayAtom(habitId),
  );
  const targetNumberOfCompletionsPerDay = useAtomValue(
    targetNumberOfCompletionsPerDayAtom(habitId),
  );

  const displayType = useAtomValue(habitDisplayTypeAtom(habitId));

  return (
    <View className="flex flex-col items-center gap-1">
      <Pressable
        onPress={incrementNumberOfCompletionsToday}
        className={`relative flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-full`}
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.stone.faded
              : colors.habitColors[color].faded,
        }}
      >
        {/* base color fill (can be partial for multiple-times-per-day habit) */}
        <View
          className="absolute bottom-0 w-full"
          style={{
            backgroundColor: colors.habitColors[color].base,
            // constant is height of button
            height:
              (numberOfCompletionsToday / targetNumberOfCompletionsPerDay) * 48,
          }}
        />
        {/* check mark */}
        <Icon
          icon={IconCheck}
          size={28}
          strokeWidth={4}
          lightColor={
            numberOfCompletionsToday === targetNumberOfCompletionsPerDay
              ? colors.white
              : colors.habitColors[color].light
          }
          darkColor={
            numberOfCompletionsToday === targetNumberOfCompletionsPerDay
              ? colors.white
              : colors.stone.light
          }
        />
      </Pressable>
      {displayType === "weekly-view" && (
        <Text
          className="text-xs font-semibold"
          style={{
            color:
              colorScheme === "dark"
                ? colors.stone.text
                : colors.habitColors[color].text,
          }}
        >
          Today
        </Text>
      )}
    </View>
  );
}
