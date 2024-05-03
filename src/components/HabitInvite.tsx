import { IconUsers, Icon as TablerIcon } from "@tabler/icons-react-native";
import { useColorScheme } from "nativewind";
import colors from "../constants/colors";
import ConfirmAndDeleteButtons from "./ConfirmDeleteButtons";
import Icon from "./Icon";
import { Text, View } from "./Themed";

export type HabitInviteProps = {
  // id: number;
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  numberOfParticipants: number;
  confirmInvite: () => void;

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
    <View
      className="my-1 flex grow-0 flex-row items-center rounded-3xl p-2"
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? colors.stone.light
            : colors.habitColors[color].light,
      }}
    >
      {/* icon */}
      <View
        className="h-12 w-12 rounded-full "
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

      {/* text */}
      <View className="mx-2 flex flex-shrink flex-col bg-transparent">
        <View className="flex flex-shrink flex-row items-center overflow-hidden bg-transparent">
          <Text
            className="mr-3 flex-shrink text-base font-semibold"
            numberOfLines={1}
          >
            {title}
          </Text>
          <Icon icon={IconUsers} size={17} strokeWidth={2.5} />
          <Text className="text-base font-semibold">
            {numberOfParticipants}
          </Text>
        </View>
        <Text
          className="text-xs font-semibold text-stone-400"
          numberOfLines={1}
        >
          Invited by {userName}
        </Text>
      </View>

      {/* confirm/delete */}
      <View className="ml-auto bg-transparent">
        <ConfirmAndDeleteButtons
          confirmInvite={confirmInvite}
          deleteInvite={deleteInvite}
        />
      </View>
    </View>
  );
}
