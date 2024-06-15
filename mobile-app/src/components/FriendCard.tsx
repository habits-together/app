import { Text, View } from "@/src/components/Themed";
import { IconCheck, IconPlus } from "@tabler/icons-react-native";
import { Link } from "expo-router";
import { useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { friendInfoAtom, getMutualFriendsAtom } from "../atoms/atoms";
import colors from "../constants/colors";
import { Habit } from "../lib/types";
import DotsMenu from "./DotsMenu";
import Icon, { HabitIcon } from "./Icon";
import { MediumProfilePicture, SmallProfilePicture } from "./ProfilePicture";

export type FriendCardProps = {
  friendId: number;
  displayType?: "normal" | "invite" | "search";
};

export default function FriendCard({
  friendId,
  displayType = "normal",
}: FriendCardProps) {
  const [inviteSent, setInviteSent] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const friendData = useAtomValue(friendInfoAtom(friendId));
  const InviteFriends = () => {
    // TODO: Implement invite friends
    setInviteSent(true);
    // alert("Invite friends");
  };
  const sendFriendRequest = () => {
    // TODO: Implement adding a friend
    setRequestSent(true);
    alert("Request sent");
  };
  const mutualList = useAtomValue(getMutualFriendsAtom(friendId));
  return (
    <Link
      push
      href={{
        pathname: "/modals/viewprofile",
        params: {
          userName: friendData.userName,
          displayName: friendData.displayName,
        },
      }}
      asChild
    >
      <Pressable className="my-1 flex grow-0 flex-col rounded-3xl border border-stone-300 p-2">
        <View className="flex flex-row items-center">
          <MediumProfilePicture picUrl={friendData.profilePicUrl} />
          <View className="ml-2 flex flex-1 flex-col">
            <Text className="text-base font-semibold">
              {friendData.displayName}
            </Text>
            <Text className="text-xs font-semibold text-stone-400">
              {friendData.userName}
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
          {displayType === "invite" &&
            (inviteSent ? (
              <View className="flex-row items-center self-start pr-5 pt-2">
                <Icon icon={IconCheck} size={16} strokeWidth={3} />
                <Text className="ml-1 text-xs font-semibold">Sent</Text>
              </View>
            ) : (
              <View className="self-start">
                <InviteButton inviteFunc={InviteFriends} />
              </View>
            ))}
          {displayType === "search" &&
            (requestSent ? (
              <View className="flex-row items-center self-start pr-5 pt-2">
                <Icon icon={IconCheck} size={16} strokeWidth={3} />
                <Text className="ml-1 text-xs font-semibold">Sent</Text>
              </View>
            ) : (
              <View className="self-start">
                <AddButton sendRequest={sendFriendRequest} />
              </View>
            ))}
        </View>

        {displayType != "search" && (
          <CommonHabits commonHabits={friendData.commonHabits} />
        )}
        {displayType === "search" && (
          <MutualFriends mutualFriends={mutualList} />
        )}
      </Pressable>
    </Link>
  );
}

function InviteButton({ inviteFunc }: { inviteFunc: () => void }) {
  return (
    <Pressable
      className="mr-1 mt-1 flex flex-row items-center justify-center rounded-full border border-stone-300 px-3 py-1"
      android_ripple={{ color: colors.stone["300"], radius: 55 }}
      onPress={inviteFunc}
    >
      <Icon icon={IconPlus} size={16} strokeWidth={2.5} />
      <Text className="ml-1 text-xs font-semibold">Invite</Text>
    </Pressable>
  );
}

function AddButton({ sendRequest }: { sendRequest: () => void }) {
  return (
    <Pressable
      className="mr-1 mt-1 flex flex-row items-center justify-center rounded-full border border-stone-300 px-3 py-1"
      android_ripple={{ color: colors.stone["300"], radius: 55 }}
      onPress={sendRequest}
    >
      <Icon icon={IconPlus} size={16} strokeWidth={2.5} />
      <Text className="ml-1 text-xs font-semibold">Add</Text>
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

// Takes an array of userids, currently uses numbers but should be strings
function MutualFriends({ mutualFriends }: { mutualFriends: number[] }) {
  const mutualFriendData = mutualFriends.map((friendId) =>
    useAtomValue(friendInfoAtom(friendId)),
  );
  const { colorScheme } = useColorScheme();
  return (
    <View className="mt-1 flex flex-row items-center">
      {/* // TODO: Add user pfps once database query for mutuals is implemented */}
      {mutualFriendData.map((friend) => (
        <View
          key={friend.id}
          className="-mr-[7px] rounded-full border border-stone-400"
        >
          <SmallProfilePicture picUrl={friend.profilePicUrl} />
        </View>
      ))}
      {mutualFriends.length == 0 ? (
        <Text className="ml-3 text-xs font-semibold text-stone-400">
          No mutual friends
        </Text>
      ) : (
        <Text className="ml-3 text-xs font-semibold text-stone-400">
          {mutualFriends.length} mutual friends
        </Text>
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
      <HabitIcon
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
