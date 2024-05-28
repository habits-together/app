import { IconUsers, Icon as TablerIcon } from "@tabler/icons-react-native";
import { useColorScheme } from "nativewind";
import colors from "../constants/colors";
import ConfirmAndDeleteButtons from "./ConfirmDeleteButtons";
import Icon from "./Icon";
import { Text, View } from "./Themed";
import { Pressable } from "react-native";

export type HabitReminderProps = {
  // id: number;
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  timeSent: number;
  displayName: string;
  profilePic: React.JSX.Element;
  deleteInvite: () => void;
};

export function HabitReminder({
  title,
  color,
  icon,
  displayName,
  timeSent,
  profilePic,
  deleteInvite,
}: HabitReminderProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="mt-2 flex grow-0 flex-row items-center rounded-3xl px-0 py-2">
      <View className="items-top flex flex-row">
        <View>
          {profilePic}
          <View
            className="absolute -top-[-44px] -right-[8px] h-9 w-9 rounded-full "
            style={{
              backgroundColor: colors.habitColors[color].base,
            }}
          >
            <View className="m-auto bg-transparent">
              <Icon
                icon={icon}
                lightColor="black"
                darkColor="black"
                strokeWidth={2}
              />
            </View>
          </View>
        </View>
        <View className="ml-3.5 flex shrink flex-col">
          <Text className="flex-row">
            <Text className="text-base font-semibold">{displayName}</Text>
            <Text className="text-base"> nudged you to complete </Text>
            <Text className="text-base font-semibold">{title}</Text>
          </Text>
          <Text className="text-xs font-semibold text-stone-400">
            {timeSent}h
          </Text>
          <Pressable
            className="mt-2 flex justify-center rounded-xl border border-stone-300 bg-white py-1.5 dark:bg-transparent"
            onPress={deleteInvite}
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
  // id: number;
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  numberOfParticipants: number;
  displayName: string;
  profilePic: React.JSX.Element;
  deleteInvite: () => void;
  confirmInvite: () => void;
};

export function HabitInvite({
  title,
  color,
  icon,
  displayName,
  numberOfParticipants,
  profilePic,
  deleteInvite,
  confirmInvite,
}: HabitInviteProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="mt-2 flex grow-0 flex-row items-center rounded-3xl px-0 py-2">
      <View className="items-top flex flex-row">
        <View>
          {profilePic}
          <View
            className="absolute -top-[-44px] -right-[8px] h-9 w-9 rounded-full "
            style={{
              backgroundColor: colors.habitColors[color].base,
            }}
          >
            <View className="m-auto bg-transparent">
              <Icon
                icon={icon}
                lightColor="black"
                darkColor="black"
                strokeWidth={2}
              />
            </View>
          </View>
        </View>
        <View className="ml-3.5 flex shrink flex-col">
          <Text className="flex-row">
            <Text className="text-base font-semibold">{displayName}</Text>
            <Text className="text-base"> invited you to join </Text>
            <Text className="text-base font-semibold">{title}</Text>
          </Text>
          <Text className="text-xs font-semibold text-stone-400">
            {numberOfParticipants} other participants
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

export type FriendRequestProps = {
  displayName: string;
  mutualCount: number;
  profilePic: React.JSX.Element;
  deleteInvite: () => void;
  confirmInvite: () => void;
};

// fetch all invites a user has received
export function FriendRequest({
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
