import colors from "@/src/constants/colors";
import { profilePicsDataPromise } from "@/src/lib/getRandomProfilePics";
import { getMockCompletionsData } from "@/src/lib/mockHabitData";
import { IconCheck, Icon as TablerIcon } from "@tabler/icons-react-native";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import DotsMenu from "./DotsMenu";
import Icon from "./Icon";
import ProfilePicture from "./ProfilePicture";

export type ProfilePic = {
  imgurl: string;
  hasCompleted: boolean;
};

const WeekDays = ["M", "T", "W", "T", "F", "S", "S"];

export type HabitCardProps = {
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  displayType: "habit-tab" | "view-habit-page" | "friend's-habit";
};


export type HabitCompletionValue = "completed" | "missed" | "not-applicable";

export function HabitCard({ title, color, icon, displayType }: HabitCardProps) {
  const { colorScheme } = useColorScheme();
  const [profilePicsData, setProfilePicsData] = useState<ProfilePic[]>([]);
  const [activityData, setActivityData] = useState<HabitCompletionValue[]>([]);
  const [indexOftoday, setIndexOftoday] = useState<number>(0);
  useEffect(() => {
    profilePicsDataPromise.then(setProfilePicsData);
    const [arrray, index] = getMockCompletionsData();
    setActivityData(arrray);
    setIndexOftoday(index);
  }, []);

  const updateActivityData = (index: number, value: HabitCompletionValue) => {
    const newData = [...activityData];
    newData[index] = value;
    setActivityData(newData);
  };

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
      className="w-full rounded-3xl p-3"
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? colors.stone.light
            : colors.habitColors[color].light,
      }}
    >
      {displayType !== "view-habit-page" && (
        <View className="ml-2 flex-row items-center justify-between">
          <View className="mr-2 flex-1 flex-row items-center gap-1">
            <Icon icon={icon} />
            <Text
              numberOfLines={1}
              className="mb-1 flex-1 text-xl font-bold text-black dark:text-white"
            >
              {title}
            </Text>
          </View>
          {displayType === "habit-tab" && (
            <View className="">
              <DotsMenu
                options={[
                  {
                    label: "Edit",
                    color: colors.habitColors[color].text,
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
          )}
        </View>
      )}

      <View className="flex flex-row">
        {[1, 2].map(
          (
            order, // need to repeat the days twice
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
                className="text-orange-text mx-0.5 flex-1 text-center font-semibold dark:text-stone-text"
              >
                {day}
              </Text>
            )),
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
              className={`m-0.5 aspect-square flex-1 rounded`}
            />
          ))}
        </View>
      ))}
      {displayType !== "view-habit-page" && (
        <View className="mt-4 flex flex-row justify-between">
          <FriendProfilePictures
            profilePicsData={profilePicsData}
            color={color}
          />
          {displayType === "habit-tab" && (
            <CompletionButton
              activityData={activityData}
              updateActivityData={updateActivityData}
              indexOftoday={indexOftoday}
              color={color}
            />
          )}
        </View>
      )}
    </View>
  );
}

function CompletionButton({
  color,
  activityData,
  indexOftoday,
  updateActivityData,
}: {
  color: keyof typeof colors.habitColors;
  activityData: HabitCompletionValue[];
  indexOftoday: number;
  updateActivityData: (index: number, newValue: HabitCompletionValue) => void;
}) {
  const { colorScheme } = useColorScheme();
  const [active, setActive] = useState(false);

  const toggleCompletion = () => {
    // update the data in firebase here (current day compleation status)
    const newValue =
      activityData[indexOftoday] === "completed" ? "missed" : "completed";
    updateActivityData(indexOftoday, newValue);
    setActive(newValue === "completed");
  };
  return (
    <Pressable
      onPress={toggleCompletion}
      className="bg-blue-500 h-12 w-12 rounded-full"
    >
      <View
        className="h-full w-full items-center justify-center rounded-full"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? active
                ? colors.habitColors[color].base
                : colors.stone.faded
              : active
                ? colors.habitColors[color].base
                : colors.habitColors[color].faded,
        }}
      >
        <Icon
          icon={IconCheck}
          size={34}
          lightColor={active ? colors.white : colors.habitColors[color].light}
          darkColor={active ? colors.white : colors.stone.light}
          strokeWidth={4}
        />
      </View>
    </Pressable>
  );
}

function FriendProfilePictures({
  profilePicsData,
  color,
}: {
  profilePicsData: ProfilePic[];
  color: keyof typeof colors.habitColors;
}) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex-row justify-between">
      <View className="flex shrink flex-row-reverse gap-[0.2rem]">
        {profilePicsData.length > 5 && (
          <View
            className="h-12 w-12 rounded-full"
            style={{
              backgroundColor:
                colorScheme === "dark"
                  ? colors.stone.faded
                  : colors.habitColors[color].faded,
            }}
          >
            <Text
              className="m-auto text-lg"
              style={{
                color:
                  colorScheme === "dark"
                    ? colors.stone.text
                    : colors.habitColors[color].text,
              }}
            >
              +{profilePicsData.length - 5}
            </Text>
          </View>
        )}
        {profilePicsData.slice(0, 5).map((data, index) => (
          <View className="-mr-3 h-12 w-12 rounded-full" key={data.imgurl + index}>
            {data.hasCompleted && (
              <>
                <View className="absolute -right-[4px] -top-[3px] z-10">
                  <Icon
                    icon={IconCheck}
                    size={18}
                    lightColor={colors.stone.light}
                    darkColor={colors.stone.light}
                    strokeWidth={7}
                  />
                </View>
                <View className="absolute -right-[4px] -top-[3px] z-10">
                  <Icon
                    icon={IconCheck}
                    size={18}
                    lightColor={colors.habitColors.green.base}
                    darkColor={colors.habitColors.green.base}
                    strokeWidth={3}
                  />
                </View>
              </>
            )}
            <ProfilePicture picUrl={data.imgurl} />
          </View>
        ))}
      </View>
    </View>
  );
}
