import { useAtom, useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import { Pressable } from "react-native";
import {
  acceptFriendRequestAtom,
  deleteNotificationAtom,
  notificationInfoAtom,
} from "../atoms/atoms";
import colors from "../constants/colors";
import ConfirmAndDeleteButtons from "./ConfirmDeleteButtons";
import Icon from "./Icon";
import { NotifProfilePicture } from "./ProfilePicture";
import { Text, View } from "./Themed";

export type HabitReminderProps = {
  notifId: number;
};

export function HabitReminder({ notifId }: HabitReminderProps) {
  const { colorScheme } = useColorScheme();
  const notifData = useAtomValue(notificationInfoAtom(notifId));
  const [, deleteNotif] = useAtom(deleteNotificationAtom(notifId));

  return (
    <View className="mt-2 flex grow-0 flex-row items-center rounded-3xl px-0 py-2">
      <View className="items-top flex flex-row">
        <View>
          <NotifProfilePicture picUrl={notifData.profilePicUrl} />
          <View
            className="absolute -right-[8px] -top-[-44px] h-9 w-9 rounded-full "
            style={{
              backgroundColor: colors.habitColors[notifData.color].base,
            }}
          >
            <View className="m-auto bg-transparent">
              <Icon
                icon={notifData.icon}
                lightColor="black"
                darkColor="black"
                strokeWidth={2}
              />
            </View>
          </View>
        </View>
        <View className="ml-3.5 flex shrink flex-col">
          <Text className="flex-row">
            <Text className="text-base font-semibold">
              {notifData.displayName}
            </Text>
            <Text className="text-base"> nudged you to complete </Text>
            <Text className="text-base font-semibold">{notifData.title}</Text>
          </Text>
          <Text className="text-xs font-semibold text-stone-400">
            {notifData.timeSent}h
          </Text>
          <Pressable
            className="mt-2 flex justify-center rounded-xl border border-stone-300 bg-white py-1.5 dark:bg-transparent"
            onPress={deleteNotif}
            android_ripple={{ color: colors.stone["300"], radius: 200 }}
          >
            <Text className="grow text-center font-semibold text-black dark:text-stone-100">
              Dismiss
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export type HabitInviteProps = {
  notifId: number;
};

export function HabitInvite({ notifId }: HabitInviteProps) {
  const { colorScheme } = useColorScheme();
  const notifData = useAtomValue(notificationInfoAtom(notifId));
  const [, deleteNotif] = useAtom(deleteNotificationAtom(notifId));
  const [, acceptInvite] = useAtom(acceptFriendRequestAtom(notifId));

  return (
    <View className="mt-2 flex grow-0 flex-row items-center rounded-3xl px-0 py-2">
      <View className="items-top flex flex-row">
        <View>
          <NotifProfilePicture picUrl={notifData.profilePicUrl} />
          <View
            className="absolute -right-[8px] -top-[-44px] h-9 w-9 rounded-full "
            style={{
              backgroundColor: colors.habitColors[notifData.color].base,
            }}
          >
            <View className="m-auto bg-transparent">
              <Icon
                icon={notifData.icon}
                lightColor="black"
                darkColor="black"
                strokeWidth={2}
              />
            </View>
          </View>
        </View>
        <View className="ml-3.5 flex shrink flex-col">
          <Text className="flex-row">
            <Text className="text-base font-semibold">
              {notifData.displayName}
            </Text>
            <Text className="text-base"> invited you to join </Text>
            <Text className="text-base font-semibold">{notifData.title}</Text>
          </Text>
          <Text className="text-xs font-semibold text-stone-400">
            {notifData.numberOfParticipants} other participants
          </Text>
          <View className="mt-2">
            <ConfirmAndDeleteButtons
              confirmInvite={acceptInvite}
              deleteInvite={deleteNotif}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export type FriendRequestProps = {
  notifId: number;
};

// fetch all invites a user has received
export function FriendRequest({ notifId }: FriendRequestProps) {
  const notifData = useAtomValue(notificationInfoAtom(notifId));
  const [, deleteNotif] = useAtom(deleteNotificationAtom(notifId));
  const [, acceptRequest] = useAtom(acceptFriendRequestAtom(notifId));
  return (
    <View className="mt-2 flex grow-0 flex-row items-center rounded-3xl px-0 py-2">
      <View className="items-top flex flex-row">
        <NotifProfilePicture picUrl={notifData.profilePicUrl} />
        <View className="ml-3.5 flex shrink flex-col">
          <Text className="flex-row">
            <Text className="text-base font-semibold">
              {notifData.displayName}
            </Text>
            <Text className="text-base"> sent you a friend request</Text>
          </Text>
          <Text className="text-xs font-semibold text-stone-400">
            {notifData.mutualCount} mutual friends
          </Text>
          <View className="mt-2">
            <ConfirmAndDeleteButtons
              confirmInvite={acceptRequest}
              deleteInvite={deleteNotif}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
