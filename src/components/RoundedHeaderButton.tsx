import { Icon as TablerIcon } from "@tabler/icons-react-native";
import { Pressable } from "react-native";
import colors from "../constants/colors";
import Icon from "./Icon";
import { Text } from "./Themed";

export default function RoundedHeaderButton({
  text,
  icon,
  onPress,
}: {
  text: string;
  icon: TablerIcon;
  onPress: () => void;
}) {
  return (
    <Pressable
      className="absolute right-4 w-32 flex-row items-center justify-center rounded-full border border-stone-300 py-1.5"
      android_ripple={{ color: colors.stone["300"], radius: 55 }}
      onPress={onPress}
    >
      <Icon icon={icon} size={16} strokeWidth={3} />
      <Text className="ml-1 font-bold">{text}</Text>
    </Pressable>
  );
}
