import { Icon as TablerIcon } from "@tabler/icons-react-native";
import { Pressable } from "react-native";
import colors from "../constants/colors";
import Icon from "./Icon";
import { Text } from "./Themed";

export default function RoundedButton({
  text,
  icon,
  strokeWidth = 3,
  onPress,
}: {
  text: string;
  icon: TablerIcon;
  strokeWidth?: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      className="w-auto flex-row items-center justify-center rounded-full border border-stone-300 px-3 py-1.5"
      android_ripple={{ color: colors.stone["300"], radius: 55 }}
      onPress={onPress}
    >
      <Icon icon={icon} size={16} strokeWidth={strokeWidth} />
      <Text className="ml-1 font-bold">{text}</Text>
    </Pressable>
  );
}
