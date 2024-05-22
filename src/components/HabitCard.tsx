import colors from "@/src/constants/colors";
import {
  getMockHabitData,
  getNumberOfDaysInLastWeek,
  Habit,
  HabitCompletion,
  HabitGoalPeriod,
  mockHabitFriendData,
} from "@/src/lib/mockData";
import { IconActivity, IconCheck } from "@tabler/icons-react-native";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { getLocalRandomProfilePics } from "../lib/getRandomProfilePics";
import { getTranslucentColor } from "../lib/getTranslucentColor";
import DotsMenu from "./DotsMenu";
import Icon from "./Icon";
import { SmallProfilePicture } from "./ProfilePicture";

export type ProfilePic = {
  imgurl: string;
  hasCompleted: boolean;
};
export type HabitDisplayType = "weekly-view" | "monthly-view";

export function HabitCard({
  habit,
  completionData,
}: {
  habit: Habit;
  completionData: HabitCompletion[];
}) {
  const { colorScheme } = useColorScheme();
  const [numberCompletionsToday, setNumberCompletionsToday] =
    useState<number>(0);

  // in the future want to save this in local storage too
  const [displayType, setDisplayType] =
    useState<HabitDisplayType>("weekly-view");

  return (
    <Link
      push
      href={{
        pathname: "/viewhabit",
        params: { id: habit.id },
      }}
      asChild
    >
      <Pressable
        className="flex h-[171px] flex-col items-start rounded-3xl px-3 pb-2"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.stone.light
              : colors.habitColors[habit.color].light,
        }}
      >
        <HabitCardHeader
          habit={habit}
          displayType={displayType}
          setDisplayType={setDisplayType}
        />
        {displayType === "weekly-view" && (
          <>
            <View className="h-[10px]" />
            <HabitCardFriendCompletions
              habit={habit}
              displayType={displayType}
            />
            <View className="h-[10px]" />
            <HabitCardCompletionsWeeklyView
              habit={habit}
              completionData={completionData.slice(completionData.length-6)}
              displayType={displayType}
              numberOfCompletionsToday={numberCompletionsToday}
              setNumberOfCompletionsToday={setNumberCompletionsToday}
            />
          </>
        )}
        {displayType === "monthly-view" && (
          <>
            <View className="h-[10px]" />
            <View className="flex w-full flex-1 flex-row">
              <HabitCardCompletionsMonthlyView
                completionData={completionData}
                goalPeriod={habit.goal.period}
                targetNumberOfCompletions={habit.goal.completionsPerPeriod}
                color={habit.color}
                numberOfCompletionsToday={numberCompletionsToday}
              />
              <View className="w-[10px]" />
              <View className="flex flex-1 flex-col items-end justify-between">
                <HabitCardFriendCompletions
                  habit={habit}
                  displayType={displayType}
                />
                <HabitCompletionButton
                  color={habit.color}
                  targetNumberOfCompletions={
                    habit.goal.period === "daily"
                      ? habit.goal.completionsPerPeriod
                      : 1
                  }
                  displayType={displayType}
                  numberOfCompletionsToday={numberCompletionsToday}
                  setNumberOfCompletionsToday={setNumberCompletionsToday}
                />
              </View>
            </View>
          </>
        )}
      </Pressable>
    </Link>
  );
}

function HabitCardHeader({
  habit,
  displayType,
  setDisplayType,
}: {
  habit: Habit;
  displayType: HabitDisplayType;
  setDisplayType: React.Dispatch<React.SetStateAction<HabitDisplayType>>;
}) {
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

function HabitCardFriendCompletions({
  displayType,
  habit,
}: {
  displayType: HabitDisplayType;
  habit: Habit;
}) {
  return (
    <View
      className={`flex w-full ${displayType === "weekly-view" ? "flex-row" : "flex-col-reverse"} items-center rounded-[10px] border p-[5px]`}
      style={{
        borderColor: getTranslucentColor(
          colors.habitColors[habit.color].text,
          0.5,
        ),
      }}
    >
      <FriendProfilePictures displayType={displayType} habit={habit} />
      <View className="h-[5px] w-[5px]" />
      <FriendCompletedBadge
        displayType={displayType}
        goalPeriod={habit.goal.period}
        habit={habit}
      />
    </View>
  );
}

function FriendProfilePictures({
  displayType,
  habit,
}: {
  displayType: HabitDisplayType;
  habit: Habit;
}) {
  const { colorScheme } = useColorScheme();

  // it would be good to figure out how to do this responsively based on screen width
  const maxPfps = displayType === "weekly-view" ? 6 : 4;

  const [mockPfps, setMockPfps] = useState<
    { imgurl: string; hasCompleted: boolean }[]
  >([]);
  const [numPfpsToDisplay, setNumPfpsToDisplay] = useState<number>(maxPfps);

  useEffect(() => {
    const mockFriendIds = mockHabitFriendData.filter(
      (data) => data.id === habit.id,
    )[0];
    setMockPfps(getLocalRandomProfilePics(mockFriendIds.friendIds));
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
              : colors.habitColors[habit.color].faded,
        }}
      >
        <Text
          className="mx-auto my-auto pl-1 text-xs font-semibold"
          style={{
            color:
              colorScheme === "dark"
                ? colors.stone.text
                : colors.habitColors[habit.color].text,
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
          style={{ borderColor: colors.habitColors[habit.color].base }}
        >
          <SmallProfilePicture picUrl={data.imgurl} isLocalImage={true} />
        </View>
      ))}
    </View>
  );
}

function FriendCompletedBadge({
  displayType,
  goalPeriod,
  habit,
}: {
  displayType: HabitDisplayType;
  goalPeriod: HabitGoalPeriod;
  habit: Habit;
}) {
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

function HabitCardCompletionsWeeklyView({
  habit,
  completionData,
  displayType,
  numberOfCompletionsToday,
  setNumberOfCompletionsToday,
}: {
  habit: Habit;
  completionData: HabitCompletion[];
  displayType: HabitDisplayType;
  numberOfCompletionsToday: number;
  setNumberOfCompletionsToday: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <View className="flex w-full flex-1 flex-row items-end justify-between">
      {completionData.slice(0, 6).map((completion, index) => (
        <HabitCardWeeklyViewCompletionSquare
          key={index}
          numberOfCompletions={completion.numberOfCompletions}
          targetNumberOfCompletions={
            habit.goal.period === "daily" ? habit.goal.completionsPerPeriod : 1
          }
          color={habit.color}
          dayOfTheMonth={completion.dayOfTheMonth}
          dayOfTheWeek={completion.dayOfTheWeek}
        />
      ))}
      <HabitCompletionButton
        color={habit.color}
        targetNumberOfCompletions={
          habit.goal.period === "daily" ? habit.goal.completionsPerPeriod : 1
        }
        displayType={displayType}
        numberOfCompletionsToday={numberOfCompletionsToday}
        setNumberOfCompletionsToday={setNumberOfCompletionsToday}
      />
    </View>
  );
}

function HabitCardWeeklyViewCompletionSquare({
  numberOfCompletions,
  targetNumberOfCompletions,
  color,
  dayOfTheMonth,
  dayOfTheWeek,
}: {
  numberOfCompletions: number;
  targetNumberOfCompletions: number;
  color: keyof typeof colors.habitColors;
  dayOfTheMonth: string;
  dayOfTheWeek: string;
}) {
  const { colorScheme } = useColorScheme();

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
              height: (numberOfCompletions / targetNumberOfCompletions) * 32,
            }}
          ></View>
        )}
        {/* check mark */}
        {numberOfCompletions === targetNumberOfCompletions && (
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

function HabitCardCompletionsMonthlyView({
  completionData,
  goalPeriod,
  targetNumberOfCompletions,
  color,
  numberOfCompletionsToday,
}: {
  completionData: HabitCompletion[];
  goalPeriod: HabitGoalPeriod;
  targetNumberOfCompletions: number;
  color: keyof typeof colors.habitColors;
  numberOfCompletionsToday: number;
}) {
  const numberOfDaysInLastWeek = getNumberOfDaysInLastWeek();

  const numWeeks = Math.ceil(completionData.length / 7);
  const completionsByWeek = Array.from({ length: numWeeks }, (_, index) =>
    completionData.slice(index * 7, (index + 1) * 7),
  );
  const weekGoalsMet = completionsByWeek.map(
    (week) =>
      week.reduce(
        (acc, completion) => acc + completion.numberOfCompletions,
        0,
      ) >= targetNumberOfCompletions,
  );

  useEffect(() => {
    weekGoalsMet[numWeeks - 1] = false;
  }, [numberOfCompletionsToday]);

  return (
    <View
      className={`flex flex-row ${goalPeriod === "weekly" && "-mt-[13px]"}`}
    >
      {/* all columns except the last one */}
      {completionsByWeek
        .slice(0, completionsByWeek.length - 1)
        .map((completions, index) => (
          <View key={index} className="mr-[3px] flex flex-col">
            {goalPeriod === "weekly" && (
              <WeekGoalMetCheckmark
                weekGoalMet={weekGoalsMet[index]}
                color={color}
              />
            )}
            {completions.map((completion, dayIndex) => (
              <HabitCardMonthlyViewCompletionSquare
                key={index * 7 + dayIndex}
                completion={completion}
                goalPeriod={goalPeriod}
                targetNumberOfCompletions={targetNumberOfCompletions}
                color={color}
              />
            ))}
          </View>
        ))}
      {/* last column needs to be separate */}
      {/* because we need to pass numberOfCompletionsToday to today's square */}
      <View className="flex flex-col">
        {goalPeriod === "weekly" && (
          <WeekGoalMetCheckmark
            weekGoalMet={weekGoalsMet[numWeeks - 1]}
            color={color}
          />
        )}
        {completionsByWeek[numWeeks - 1]
          .slice(0, numberOfDaysInLastWeek)
          .map((completion, dayIndex) => (
            <HabitCardMonthlyViewCompletionSquare
              key={7 * 7 + dayIndex}
              completion={completion}
              goalPeriod={goalPeriod}
              targetNumberOfCompletions={targetNumberOfCompletions}
              color={color}
            />
          ))}
        <HabitCardMonthlyViewCompletionSquare
          completion={{
            numberOfCompletions: numberOfCompletionsToday,
            dayOfTheWeek: "Today",
            dayOfTheMonth: (new Date().getDay()).toString(),
          }}
          goalPeriod={goalPeriod}
          targetNumberOfCompletions={targetNumberOfCompletions}
          color={color}
        />
      </View>
    </View>
  );
}

function WeekGoalMetCheckmark({
  weekGoalMet,
  color,
}: {
  weekGoalMet: boolean;
  color: keyof typeof colors.habitColors;
}) {
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
  completion,
  goalPeriod,
  targetNumberOfCompletions,
  color,
}: {
  completion: HabitCompletion;
  goalPeriod: HabitGoalPeriod;
  targetNumberOfCompletions: number;
  color: keyof typeof colors.habitColors;
}) {
  const { colorScheme } = useColorScheme();

  function getHabitSquareOpacity(numCompletions: number) {
    switch (goalPeriod) {
      case "daily":
        return numCompletions / targetNumberOfCompletions;
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

function HabitCompletionButton({
  color,
  targetNumberOfCompletions,
  displayType,
  numberOfCompletionsToday,
  setNumberOfCompletionsToday,
}: {
  color: keyof typeof colors.habitColors;
  targetNumberOfCompletions: number;
  displayType: HabitDisplayType;
  numberOfCompletionsToday: number;
  setNumberOfCompletionsToday: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { colorScheme } = useColorScheme();
  // const [numberOfCompletions, setNumberOfCompletions] = useState(0);

  useEffect(() => {
    const updateInFirebase = async () => {
      // update the data in firebase here (current day compleation status)
    };
    updateInFirebase();
  }, [numberOfCompletionsToday]);

  function handleCompletionButtonPress() {
    setNumberOfCompletionsToday((prev) =>
      prev !== targetNumberOfCompletions ? prev + 1 : 0,
    );
  }

  return (
    <View className="flex flex-col items-center gap-1">
      <Pressable
        onPress={handleCompletionButtonPress}
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
            height: (numberOfCompletionsToday / targetNumberOfCompletions) * 48,
          }}
        />
        {/* check mark */}
        <Icon
          icon={IconCheck}
          size={28}
          strokeWidth={4}
          lightColor={
            numberOfCompletionsToday === targetNumberOfCompletions
              ? colors.white
              : colors.habitColors[color].light
          }
          darkColor={
            numberOfCompletionsToday === targetNumberOfCompletions
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
