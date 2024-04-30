import { View, Text } from "@/src/components/Themed";
import React from "react";
import { useColorScheme } from "nativewind";
import colors from "../constants/colors";
import { Habit } from "../lib/mockHabitData";
import DotsMenu from "./DotsMenu";
import Icon from "./Icon";
import { IconPlus } from "@tabler/icons-react-native";

export type FriendCardProps = {
  displayName: string;
  userName: string;
  profilePic: JSX.Element;
  commonHabits: Habit[];
};

export default function FriendCard({
  displayName,
  userName,
  profilePic,
  commonHabits,
}: FriendCardProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className="my-1 flex grow-0 flex-row items-center rounded-3xl border px-2 py-2"
      style={{
        borderColor:
          colorScheme === "dark" ? colors.stone[400] : colors.stone[200],
      }}
    >
      <View className="flex flex-col">
        <View className="flex flex-row">
          {profilePic}
          <View className="ml-2 flex flex-col">
            <Text className="text-lg font-semibold">{displayName}</Text>
            <Text
              className="font-semibold"
              style={{
                color:
                  colorScheme === "dark"
                    ? colors.stone[500]
                    : colors.stone[300],
              }}
            >
              {userName}
            </Text>
          </View>
        </View>
        <CommonHabits commonHabits={commonHabits} />
      </View>
      <View className="ml-auto -translate-y-7 bg-transparent">
        <DotsMenu
          options={[
            {
              label: "Remove Friend",
              color: colors.black,
              action: () => alert(`Remove Friend`),
            },
          ]}
        />
      </View>
    </View>
  );
}

function CommonHabits({ commonHabits }: { commonHabits: Habit[] }) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="mt-1 flex flex-row flex-wrap">
      {commonHabits.slice(0, 2).map((habit) => (
        <HabitTag key={habit.id} habit={habit} />
      ))}
      {commonHabits.length >= 2 && (
        <View
          className="mx-0.5 mt-1 flex flex-row items-center justify-center rounded-3xl px-2 py-1"
          style={{
            backgroundColor:
              colorScheme === "dark" ? colors.stone.light : colors.stone[100],
          }}
        >
          <Icon
            icon={IconPlus}
            size={10}
            strokeWidth={3}
            darkColor={colors.stone[400]}
            lightColor={colors.stone[800]}
          />
          <Text
            numberOfLines={1}
            className="text-xs font-bold"
            style={{
              color:
                colorScheme === "dark" ? colors.stone[400] : colors.stone[800],
            }}
          >
            {commonHabits.length - 2}
          </Text>
        </View>
      )}

      {commonHabits.length == 0 && (
        <View
          className="mx-0.5 mt-1 flex flex-row items-center justify-center rounded-3xl px-2 py-1"
          style={{
            backgroundColor:
              colorScheme === "dark" ? colors.stone.light : colors.stone[100],
          }}
        >
          <Text
            numberOfLines={1}
            className="text-xs font-bold"
            style={{
              color:
                colorScheme === "dark" ? colors.stone[400] : colors.stone[800],
            }}
          >
            No habits together
          </Text>
        </View>
      )}
    </View>
  );
}

function HabitTag({ habit }: { habit: Habit }) {
  const { colorScheme } = useColorScheme();
  return (
    <View
      className="mx-0.5 mt-1 flex flex-row items-center justify-center rounded-3xl border px-1.5 py-1"
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? "transparent"
            : colors.habitColors[habit.color].light,
        borderColor:
          colorScheme === "dark"
            ? colors.habitColors[habit.color].base
            : "transparent",
      }}
    >
      <Icon
        icon={habit.icon}
        size={12}
        darkColor={colors.habitColors[habit.color].light}
        lightColor={colors.black}
      />
      <Text
        numberOfLines={1}
        className="ml-1 text-xs font-semibold"
        style={{
          color:
            colorScheme === "dark"
              ? colors.habitColors[habit.color].light
              : colors.black,
        }}
      >
        {habit.title}
      </Text>
    </View>
  );
}
