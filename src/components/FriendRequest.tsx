import { View, Text } from "@/src/components/Themed";
import React from "react";
import { IconTrash } from "@tabler/icons-react-native";
import Icon from "./Icon";
import { Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import colors from "../constants/colors";

export type FriendRequestProps = {
  displayName: string;
  userName: string;
  profilePic: React.JSX.Element;
  deleteInvite: () => void;
  confirmInvite: () => void;
};

// fetch all invites a user has received
export default function FriendRequest({
  displayName,
  profilePic,
  userName,
  deleteInvite,
  confirmInvite,
}: FriendRequestProps) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex grow-0 flex-row items-center rounded-3xl px-0 py-2">
      <View className="flex flex-row">
        {profilePic}
        <View className="ml-2 flex flex-col">
          <Text className="text-lg font-semibold">{displayName}</Text>
          <Text
            className="font-semibold"
            style={{
              color:
                colorScheme === "dark" ? colors.stone[500] : colors.stone[300],
            }}
          >
            {userName}
          </Text>
        </View>
      </View>
      <View className="ml-auto flex flex-row">
        <Pressable
          className="flex justify-center rounded-xl border px-2.5 py-1.5"
          style={{
            backgroundColor:
              colorScheme === "dark" ? "transparent" : colors.white,
            borderColor:
              colorScheme === "dark" ? colors.stone[300] : colors.stone[400],
          }}
        >
          <Text
            className="font-semibold text-white"
            style={{
              color: colorScheme === "dark" ? colors.stone[100] : colors.black,
            }}
            onPress={confirmInvite}
          >
            Confirm
          </Text>
        </Pressable>
        <Pressable
          className="ml-1 flex justify-center rounded-xl border px-1.5 py-1"
          style={{
            backgroundColor:
              colorScheme === "dark" ? "transparent" : colors.white,
            borderColor:
              colorScheme === "dark" ? colors.stone[300] : colors.stone[400],
          }}
          onPress={deleteInvite}
        >
          <Icon
            icon={IconTrash}
            lightColor="black"
            darkColor="white"
            size={17}
            strokeWidth={2.5}
          />
        </Pressable>
      </View>
    </View>
  );
}
