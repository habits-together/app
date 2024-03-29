import colors from "@/constants/colors";
import { IconDots } from "@tabler/icons-react-native";
import { TouchableOpacity, useColorScheme } from "react-native";

type Option = {
  label: string;
  color: string;
  action: () => void;
};

export default function DotsMenu({ options }: { options: Option[] }) {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity>
      <IconDots
        size={24}
        color={colorScheme === "dark" ? colors.white : colors.black}
        strokeWidth={2}
      />
    </TouchableOpacity>
  );
}
