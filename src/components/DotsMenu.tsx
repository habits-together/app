import colors from "@/src/constants/colors";
import { IconDots } from "@tabler/icons-react-native";
import { TouchableOpacity, Text } from "react-native";
import Icon from "./Icon";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { IconCheck } from "@tabler/icons-react-native";
import { View } from "./Themed";

type Option = {
  label: string;
  color: string;
  action: () => void;
};

export default function DotsMenu({ options }: { options: Option[] }) {
  return (
    <Menu>
      <MenuTrigger>
        <View className="p-2 bg-transparent">
          <Icon icon={IconDots} />
        </View>
      </MenuTrigger>
      <MenuOptions>
        {options.map((item) => (
          <MenuOption onSelect={item.action}>
            <Text style={{ color: item.color }}>{item.label}</Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
}
