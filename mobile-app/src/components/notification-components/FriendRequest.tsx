import {
  acceptFriendRequestAtom,
  deleteNotificationAtom,
  friendNotificationAtom,
  getUserInfoAtom,
  numberOfMutualFriendsAtom,
} from "@/src/atoms/atoms";
import { useAtomValue } from "jotai";
import { NotifProfilePicture } from "../ProfilePicture";
import { Text, View } from "../Themed";
import { ConfirmButton, DeleteButton } from "./ConfirmDeleteButton";
import { NotificationIdT } from "@/src/lib/db_types";

export function FriendRequest({ notifId }: { notifId: NotificationIdT }) {
  const notifData = useAtomValue(friendNotificationAtom(notifId));
  const personData = useAtomValue(getUserInfoAtom(notifData.senderId));
  const numberOfMutualFriends = useAtomValue(
    numberOfMutualFriendsAtom(notifData.senderId),
  );

  return (
    <View className="mt-2 flex grow-0 flex-row items-center rounded-3xl px-0 py-2">
      <View className="items-top flex flex-row">
        <NotifProfilePicture picUrl={personData.picture} />
        <View className="ml-4 flex flex-1 flex-col">
          <Text className="flex-row">
            <Text className="text-base font-semibold">
              {personData.displayName}
            </Text>
            <Text className="text-base"> sent you a friend request</Text>
          </Text>
          <Text className="text-xs text-stone-400">
            {numberOfMutualFriends} mutual friend
            {numberOfMutualFriends > 1 ? "s" : ""}
          </Text>
          <View className="mt-2 flex flex-row bg-transparent">
            <ConfirmButton
              atomToSetOnClick={acceptFriendRequestAtom}
              notificationId={notifId}
            />
            <DeleteButton
              atomToSetOnClick={deleteNotificationAtom}
              notificationId={notifId}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
