import { Text, View } from "@/src/components/Themed";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Pressable } from "react-native";
import colors from "../constants/colors";
import { Habit } from "../lib/mockData";
import DotsMenu from "./DotsMenu";
import Icon from "./Icon";
import { IconPlus } from "@tabler/icons-react-native";

export type FriendCardProps = {
  displayName: string;
  userName: string;
  profilePic: JSX.Element;
  commonHabits: Habit[];
  displayType?: "normal" | "invite";
};

export default function FriendCard({
  displayName,
  userName,
  profilePic,
  commonHabits,
  displayType = "normal",
}: FriendCardProps) {
  return (
    <Link
      push
      href={{
        pathname: "/modals/viewprofile",
        params: { userName: userName, displayName: displayName },
      }}
      asChild
    >
      <Pressable className="my-1 flex grow-0 flex-col rounded-3xl border border-stone-300 p-2">
        <View className="flex flex-row items-center">
          {profilePic}
          <View className="ml-2 flex flex-1 flex-col">
            <Text className="text-base font-semibold">{displayName}</Text>
            <Text className="text-xs font-semibold text-stone-400">
              {userName}
            </Text>
          </View>
          {displayType === "normal" && (
            <View className="self-start">
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
          )}
          {displayType === "invite" && (
            <View className="self-start">
              <InviteButton />
            </View>
          )}
        </View>
        <CommonHabits commonHabits={commonHabits} />
      </Pressable>
    </Link>
  );
}

function InviteButton() {
  const InviteFriends = () => {
    // TODO: Implement invite friends
    alert("Invite friends");
  }
  return (
    <Pressable
      className="flex flex-row items-center justify-center rounded-full border border-stone-300 py-1 px-3 mt-1 mr-1"
      android_ripple={{ color: colors.stone["300"], radius: 55 }}
      onPress={InviteFriends}
    >
      <Icon icon={IconPlus} size={16} strokeWidth={2.5} />
      <Text className="ml-1 text-xs font-semibold">Invite</Text>
    </Pressable>
  );
}


function CommonHabits({ commonHabits }: { commonHabits: Habit[] }) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="mt-1 flex flex-row flex-wrap">
      {commonHabits.map((habit) => (
        <HabitTag key={habit.id} habit={habit} />
      ))}

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
