import { IconDots } from "@tabler/icons-react-native";
import { useColorScheme } from "nativewind";
import { Text } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import colors from "../constants/colors";
import Icon from "./Icon";
import { View } from "./Themed";

export type Option = {
  label: string;
  color: string;
  action: () => void;
};

export default function DotsMenu({ options }: { options: Option[] }) {
  const { colorScheme } = useColorScheme();

  return (
    <Menu>
      <MenuTrigger>
        <View className="bg-transparent p-2">
          <Icon icon={IconDots} />
        </View>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor:
              colorScheme === "dark" ? colors.stone[800] : colors.white,
            borderRadius: 8,
          },
        }}
      >
        {options.map((item) => (
          <MenuOption onSelect={item.action} key={item.label}>
            <Text
              style={{
                color: colorScheme === "dark" ? colors.white : colors.black,
              }}
            >
              {item.label}
            </Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
}
