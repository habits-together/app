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

export default function HabitReminder({
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
    <View
      className="flex grow-0 flex-row items-center rounded-3xl px-0 py-2 mt-2">
      <View className="flex flex-row items-top">
        <View>
          {profilePic}
          <View
            className="absolute -right-[8px] -bottom-[-22px] h-9 w-9 rounded-full "
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
        <View className="ml-3.5 flex flex-col shrink">
          <Text className="flex-row">
            <Text className="text-base font-semibold">{displayName}</Text>
            <Text className="text-base"> nudged you to complete </Text>
            <Text className="text-base font-semibold">{title}</Text>
          </Text>
          <Text className="text-xs font-semibold text-stone-400">
            {timeSent}h
          </Text>
          <Pressable
            className="flex justify-center rounded-xl border border-stone-300 bg-white py-1.5 dark:bg-transparent mt-2"
            onPress={deleteInvite}
            android_ripple={{ color: colors.stone["300"], radius: 200 }}
          >
            <Text className="font-semibold text-black dark:text-stone-100 grow text-center">
              Dismiss
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
