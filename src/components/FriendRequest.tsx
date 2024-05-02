import { Text, View } from "@/src/components/Themed";
import React from "react";
import ConfirmAndDeleteButtons from "./ConfirmDeleteButtons";

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
  confirmInvite,
  deleteInvite,
}: FriendRequestProps) {
  return (
    <View className="flex grow-0 flex-row items-center rounded-3xl px-0 py-2">
      <View className="flex flex-row">
        {profilePic}
        <View className="ml-2 flex flex-col">
          <Text className="text-lg font-semibold">{displayName}</Text>
          <Text className="text-xs font-semibold text-stone-400">
            {userName}
          </Text>
        </View>
      </View>
      <View className="ml-auto">
        <ConfirmAndDeleteButtons
          confirmInvite={confirmInvite}
          deleteInvite={deleteInvite}
        />
      </View>
    </View>
  );
}
