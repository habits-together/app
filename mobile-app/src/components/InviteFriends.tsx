import { Text, View } from "@/src/components/Themed";
import { useAtomValue } from "jotai";
import { friendIdsAtom } from "../atoms/atoms";
import FriendSearchBar from "./FriendSearchBar";
import ShareInviteLink from "./ShareInviteLink";
import { FriendCard } from "./UserCard";

export default function InviteFriendsComponent() {
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
          displayType="inviteFriendsToHabit"
        />
      ))}
    </View>
  );
}
