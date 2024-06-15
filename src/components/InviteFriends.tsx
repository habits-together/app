import { Text, View } from "@/src/components/Themed";
import { IconShare2 } from "@tabler/icons-react-native";
import { Pressable } from "react-native";
import colors from "../constants/colors";
import FriendCard from "./FriendCard";
import FriendSearchBar from "./FriendSearchBar";
import Icon from "./Icon";
import { useAtomValue } from "jotai";
import { friendIdsAtom } from "../atoms/atoms";

export default function InviteFriends() {
  const friendIds = useAtomValue(friendIdsAtom);
  return (
    <View className="flex-1 p-4">
      <FriendSearchBar placeholder="Search for someone..." />
      <ShareInviteLink />
      <Text className="mt-4 text-xl font-bold">My friends</Text>
      {friendIds.map((friendId) => (
        <FriendCard
          key={friendId}
          friendId={friendId}
          displayType="invite"
        />
      ))}
    </View>
  );
}

function ShareInviteLink() {
  return (
    <Pressable
      className="mt-2 h-10 w-auto flex-row items-center justify-center rounded-xl border border-stone-300"
      android_ripple={{ color: colors.stone["300"], radius: 200 }}
    >
      <Icon icon={IconShare2} size={17} strokeWidth={3} />
      <Text className="ml-2 text-base font-semibold">Share Invite Link</Text>
    </Pressable>
  );
}InviteFriends