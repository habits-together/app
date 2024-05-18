import { Text, View } from "@/src/components/Themed";
import React from "react";
import ConfirmAndDeleteButtons from "./ConfirmDeleteButtons";

export type FriendRequestProps = {
  displayName: string;
  mutualCount: number;
  profilePic: React.JSX.Element;
  deleteInvite: () => void;
  confirmInvite: () => void;
};

// fetch all invites a user has received
export default function FriendRequest({
  displayName,
  profilePic,
  mutualCount,
  confirmInvite,
  deleteInvite,
}: FriendRequestProps) {
  return (
    <View className="mt-2 flex grow-0 flex-row items-center rounded-3xl px-0 py-2">
      <View className="items-top flex flex-row">
        {profilePic}
        <View className="ml-3.5 flex shrink flex-col">
          <Text className="flex-row">
            <Text className="text-base font-semibold">{displayName}</Text>
            <Text className="text-base"> sent you a friend request</Text>
          </Text>
          <Text className="text-xs font-semibold text-stone-400">
            {mutualCount} mutual friends
          </Text>
          <View className="mt-2">
            <ConfirmAndDeleteButtons
              confirmInvite={confirmInvite}
              deleteInvite={deleteInvite}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
