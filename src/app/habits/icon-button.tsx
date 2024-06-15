import Icon from "@/src/components/Icon";
import DefaultColors from "@/src/constants/DefaultColors";
import colors from "@/src/constants/colors";
import { Icon as IconType } from "@tabler/icons-react-native";
import { useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";

interface IconButtonProps {
  icon: IconType;
  onPress: () => void;
  className?: string;
  selected?: boolean;
  required?: boolean;
}

export function IconButton({
  icon,
  onPress,
  className,
  selected,
  required,
}: IconButtonProps) {
  const { colorScheme } = useColorScheme();
  const borderColor = DefaultColors[colorScheme].tint;

  return (
    <TouchableOpacity
      className={
        "grid h-10 w-10 items-center justify-center rounded-lg border p-2" +
        className
      }
      style={{
        borderColor,
        backgroundColor: selected
          ? colors.habitColors.green.base
          : required
            ? colors.habitColors.red.base
            : colors.transparent,
      }}
      onPress={onPress}
    >
      <Icon icon={icon} size={24} />
    </TouchableOpacity>
  );
}
