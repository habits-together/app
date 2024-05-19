import colors from "@/src/constants/colors";
import { Habit } from "@/src/lib/mockData";
import { IconCheck } from "@tabler/icons-react-native";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { getLocalRandomProfilePics } from "../lib/getRandomProfilePics";
import { getTranslucentColor } from "../lib/getTranslucentColor";
import DotsMenu from "./DotsMenu";
import Icon from "./Icon";
import SmallProfilePicture from "./ProfilePicture";

export type ProfilePic = {
  imgurl: string;
  hasCompleted: boolean;
};

const WeekDays = ["M", "T", "W", "T", "F", "S", "S"];

export type HabitCardProps = {
  habit: Habit;
  displayType: HabitDisplayType;
  currentPage: HabitDisplayPage;
};

type HabitDisplayType = "weekly-view" | "monthly-view";
type HabitDisplayPage = "habit-tab" | "view-friend-profile";

export type HabitCompletionValue = "completed" | "missed" | "not-applicable";

export function HabitCard({ habit, displayType, currentPage }: HabitCardProps) {
  const { colorScheme } = useColorScheme();

  // useEffect(() => {
  //   profilePicsDataPromise(10).then(setProfilePicsData);
  //   const [arrray, index] = getMockCompletionsData();
  //   setActivityData(arrray);
  //   setIndexOftoday(index);
  // }, []);

  // const updateActivityData = (index: number, value: HabitCompletionValue) => {
  //   const newData = [...activityData];
  //   newData[index] = value;
  //   setActivityData(newData);
  // };

  // make an array with 14 days (2 weeks) chunks
  // function chunkArray(array: HabitCompletionValue[]) {
  //   let result: HabitCompletionValue[][] = [];
  //   for (let i = 0; i < array.length; i += 14) {
  //     result.push(array.slice(i, i + 14));
  //   }
  //   return result;
  // }
  // const chunkedActivityData = chunkArray(activityData);

  // function getColorClassesFromCompletionValue(value: HabitCompletionValue) {
  //   switch (value) {
  //     case "completed":
  //       return colors.habitColors[color].base;
  //     case "missed":
  //       return colorScheme === "dark"
  //         ? colors.stone.faded
  //         : colors.habitColors[color].faded;
  //     case "not-applicable":
  //       return;
  //   }
  // }

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
        className="flex flex-col items-start rounded-3xl p-3"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.stone.light
              : colors.habitColors[habit.color].light,
        }}
      >
        <HabitCardHeader habit={habit} />
        {displayType === "weekly-view" && (
          <>
            <HabitCardFriendCompletions
              habit={habit}
              displayType={displayType}
            />
            <View className="h-[10px]" />
            <HabitCardCompletionsWeeklyView habit={habit} />
          </>
        )}
        {displayType === "monthly-view" && (
          <View className="flex flex-row">
            <HabitCardFriendCompletions
              habit={habit}
              displayType={displayType}
            />
            <View className="flex flex-col">
              {/* <HabitCardCompletionsMonthlyView />
              <HabitCompletionButton /> */}
            </View>
          </View>
        )}

        {/* <View className="flex flex-row">
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
              <HabitCompletionButton
                activityData={activityData}
                updateActivityData={updateActivityData}
                indexOftoday={indexOftoday}
                color={color}
              />
            )}
          </View>
        )} */}
      </Pressable>
    </Link>
  );
}

function HabitCardHeader({ habit }: { habit: Habit }) {
  return (
    <View className="ml-2 flex-row items-center justify-between">
      <View className="mr-2 flex-1 flex-row items-center gap-1">
        <Icon icon={habit.icon} />
        <Text
          numberOfLines={1}
          className="mb-1 flex-1 text-xl font-bold text-black dark:text-white"
        >
          {habit.title}
        </Text>
      </View>

      <View className="">
        <DotsMenu
          options={[
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
      className="flex h-10 flex-row items-center rounded-[10px] border px-[5px]"
      style={{
        borderColor: getTranslucentColor(
          colors.habitColors[habit.color].text,
          0.5,
        ),
      }}
    >
      <FriendProfilePictures displayType={displayType} habit={habit} />
      <FriendCompletedBadge displayType={displayType} habit={habit} />
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
  const maxPfps = displayType === "weekly-view" ? 6 : 4;

  const [mockPfps, setMockPfps] = useState<
    { imgurl: string; hasCompleted: boolean }[]
  >([]);
  const [numPfpsToDisplay, setNumPfpsToDisplay] = useState<number>(maxPfps);
  // const [pfpsTruncated, setPfpsTruncated] = useState(false);

  useEffect(() => {
    let pfps = getLocalRandomProfilePics(8);
    // if (pfps.length)
    setMockPfps(pfps);
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
    <View className="mr-[12px] flex flex-row-reverse">
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
  habit,
}: {
  displayType: HabitDisplayType;
  habit: Habit;
}) {
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
        icon={IconCheck}
        size={12}
        strokeWidth={4}
        lightColor={colors.habitColors[habit.color].base}
        darkColor={colors.habitColors[habit.color].base}
      />
      <Text
        className="ml-[2px] text-xs font-semibold"
        style={{ color: colors.habitColors[habit.color].base }}
      >
        Completed today
      </Text>
    </View>
  );
}

function HabitCardCompletionsWeeklyView({ habit }: { habit: Habit }) {
  // const completions = [true, false, true, false, true, false, true];
  // const pastSevenDays = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];

  const completions = [
    {
      completed: true,
      dayOfTheWeek: "Fri",
      dayOfTheMonth: 19,
    },
    {
      completed: false,
      dayOfTheWeek: "Sat",
      dayOfTheMonth: 20,
    },
    {
      completed: true,
      dayOfTheWeek: "Sun",
      dayOfTheMonth: 21,
    },
    {
      completed: true,
      dayOfTheWeek: "Mon",
      dayOfTheMonth: 22,
    },
    {
      completed: false,
      dayOfTheWeek: "Tue",
      dayOfTheMonth: 23,
    },
    {
      completed: false,
      dayOfTheWeek: "Wed",
      dayOfTheMonth: 24,
    },
    {
      completed: true,
      dayOfTheWeek: "Thu",
      dayOfTheMonth: 25,
    },
  ];

  return (
    <View className="flex w-full flex-1 flex-row items-end justify-between">
      {completions.slice(0, 6).map((dayData, index) => (
        <HabitCardWeeklyViewCompletionSquare
          key={index}
          completed={dayData.completed}
          color={habit.color}
          dayOfTheMonth={dayData.dayOfTheMonth}
          dayOfTheWeek={dayData.dayOfTheWeek}
        />
      ))}
      <HabitCompletionButton
        color={habit.color}
        // dayOfTheMonth={completions[6].dayOfTheMonth}
        // dayOfTheWeek={completions[6].dayOfTheWeek}
      />
    </View>
  );
}

function HabitCardWeeklyViewCompletionSquare({
  completed,
  color,
  dayOfTheMonth,
  dayOfTheWeek,
}: {
  completed: boolean;
  color: keyof typeof colors.habitColors;
  dayOfTheMonth: number;
  dayOfTheWeek: string;
}) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex flex-col items-center gap-1">
      <View
        className="flex h-8 w-8 items-center justify-center rounded"
        style={{
          backgroundColor: completed
            ? colors.habitColors[color].base
            : colorScheme === "dark"
              ? colors.stone.faded
              : colors.habitColors[color].faded,
        }}
      >
        {completed && (
          <Icon
            icon={IconCheck}
            size={20}
            strokeWidth={4}
            lightColor={colors.white}
          />
        )}
        {!completed && (
          <Text
            className="text-xs font-semibold"
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

function HabitCardCompletionsMonthlyView({}) {
  return <View className=""></View>;
}

function HabitCompletionButton({
  color,
}: {
  color: keyof typeof colors.habitColors;
}) {
  const { colorScheme } = useColorScheme();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const updateInFirebase = async () => {
      // update the data in firebase here (current day compleation status)
    };
    updateInFirebase();
  }, [completed]);

  return (
    <View className="flex flex-col items-center gap-1">
      <Pressable
        onPress={() => setCompleted(!completed)}
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          backgroundColor: completed
            ? colors.habitColors[color].base
            : colorScheme === "dark"
              ? colors.stone.faded
              : colors.habitColors[color].faded,
        }}
      >
        <Icon
          icon={IconCheck}
          size={28}
          strokeWidth={4}
          lightColor={
            completed ? colors.white : colors.habitColors[color].light
          }
          darkColor={completed ? colors.white : colors.stone.light}
        />
      </Pressable>
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
    </View>
  );
}

// function CompletionButton({
//   color,
//   activityData,
//   indexOftoday,
//   updateActivityData,
// }: {
//   color: keyof typeof colors.habitColors;
//   activityData: HabitCompletionValue[];
//   indexOftoday: number;
//   updateActivityData: (index: number, newValue: HabitCompletionValue) => void;
// }) {
//   const { colorScheme } = useColorScheme();
//   const [active, setActive] = useState(false);

//   const toggleCompletion = () => {
//     // update the data in firebase here (current day compleation status)
//     const newValue =
//       activityData[indexOftoday] === "completed" ? "missed" : "completed";
//     updateActivityData(indexOftoday, newValue);
//     setActive(newValue === "completed");
//   };
//   return (
//     <Pressable
//       onPress={toggleCompletion}
//       className="bg-blue-500 h-12 w-12 rounded-full"
//     >
//       <View
//         className="h-full w-full items-center justify-center rounded-full"
//         style={{
//           backgroundColor:
//             colorScheme === "dark"
//               ? active
//                 ? colors.habitColors[color].base
//                 : colors.stone.faded
//               : active
//                 ? colors.habitColors[color].base
//                 : colors.habitColors[color].faded,
//         }}
//       >
//         <Icon
//           icon={IconCheck}
//           size={34}
//           lightColor={active ? colors.white : colors.habitColors[color].light}
//           darkColor={active ? colors.white : colors.stone.light}
//           strokeWidth={4}
//         />
//       </View>
//     </Pressable>
//   );
// }

// function FriendProfilePictures({
//   profilePicsData,
//   color,
// }: {
//   profilePicsData: ProfilePic[];
//   color: keyof typeof colors.habitColors;
// }) {
//   const { colorScheme } = useColorScheme();
//   return (
//     <View className="flex-row justify-between">
//       <View className="flex shrink flex-row-reverse gap-[0.2rem]">
//         {profilePicsData.length > 5 && (
//           <View
//             className="h-12 w-12 rounded-full"
//             style={{
//               backgroundColor:
//                 colorScheme === "dark"
//                   ? colors.stone.faded
//                   : colors.habitColors[color].faded,
//             }}
//           >
//             <Text
//               className="m-auto text-lg"
//               style={{
//                 color:
//                   colorScheme === "dark"
//                     ? colors.stone.text
//                     : colors.habitColors[color].text,
//               }}
//             >
//               +{profilePicsData.length - 5}
//             </Text>
//           </View>
//         )}
//         {profilePicsData.slice(0, 5).map((data, index) => (
//           <View
//             className="-mr-3 h-12 w-12 rounded-full"
//             key={data.imgurl + index}
//           >
//             {data.hasCompleted && (
//               <>
//                 <View className="absolute -right-[4px] -top-[3px] z-10">
//                   <Icon
//                     icon={IconCheck}
//                     size={18}
//                     lightColor={colors.stone.light}
//                     darkColor={colors.stone.light}
//                     strokeWidth={7}
//                   />
//                 </View>
//                 <View className="absolute -right-[4px] -top-[3px] z-10">
//                   <Icon
//                     icon={IconCheck}
//                     size={18}
//                     lightColor={colors.habitColors.green.base}
//                     darkColor={colors.habitColors.green.base}
//                     strokeWidth={3}
//                   />
//                 </View>
//               </>
//             )}
//             <SmallProfilePicture picUrl={data.imgurl} />
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// }
