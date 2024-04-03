import { Icon as TablerIcon } from "@tabler/icons-react-native";
import { useColorScheme } from "nativewind";
import { colors } from "react-native-elements";

export default function Icon({
  icon: DisplayedIcon,
  size = 24,
  strokeWidth = 2,
  lightColor = colors.black,
  darkColor = colors.white,
}: {
  icon: TablerIcon;
  size?: number;
  strokeWidth?: number;
  lightColor?: string;
  darkColor?: string;
}) {
  const { colorScheme } = useColorScheme();

  return (
    <DisplayedIcon
      size={size}
      strokeWidth={strokeWidth}
      color={colorScheme === "dark" ? darkColor : lightColor}
    />
  );
}
