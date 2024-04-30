import { View, Text } from "./Themed";
import colors from "../constants/colors";
import { useColorScheme } from "nativewind";
import {
  Icon as TablerIcon,
  IconTrash,
  IconUsers,
} from "@tabler/icons-react-native";
import Icon from "./Icon";
import { Pressable } from "react-native";

export type HabitInviteProps = {
  // id: number;
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  numberOfParticipants: number;
  userName: string;
  deleteInvite: () => void;
  confirmInvite: () => void;
};

export default function HabitInvite({
  title,
  color,
  icon,
  userName,
  numberOfParticipants,
  deleteInvite,
  confirmInvite,
}: HabitInviteProps) {
  const { colorScheme } = useColorScheme();
  return (
    // wanna remove the my-2 later, for some reason i cant use "gap" in ./HabitInviteList.tsx
    // gonna look into it later
    <View
      className="my-1 flex grow-0 flex-row items-center rounded-3xl px-3 py-2"
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? colors.stone.light
            : colors.habitColors[color].faded,
      }}
    >
      <View
        className="mr-4 rounded-full p-2"
        style={{
          backgroundColor: colors.habitColors[color].base,
        }}
      >
        <Icon
          icon={icon}
          lightColor="black"
          darkColor="black"
          strokeWidth={2}
        />
      </View>
      <View className="flex flex-col bg-transparent">
        <View className="flex flex-row justify-between bg-transparent">
          <Text className="text-lg font-bold">{title}</Text>
          <View className="flex flex-row items-center bg-transparent">
            <Icon icon={IconUsers} size={17} strokeWidth={2.5} />
            <Text className="pl-0.5 text-base font-extrabold">
              {numberOfParticipants}
            </Text>
          </View>
        </View>
        <Text
          className="font-medium"
          style={{
            color:
              colorScheme === "dark"
                ? colors.stone[400]
                : colors.habitColors[color].text,
          }}
        >
          Invited by {userName}
        </Text>
      </View>
      <View className="ml-auto flex flex-row bg-transparent">
        <Pressable className="flex justify-center rounded-xl border border-stone-400 bg-white px-2.5 py-1.5 dark:bg-transparent">
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
