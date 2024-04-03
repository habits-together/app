import { Icon as TablerIcon } from "@tabler/icons-react-native";
import Icon from "./Icon";
import { Text, View } from "./Themed";
import { useColorScheme } from "react-native";
import colors from "@/constants/colors";

interface IconButtonInterface {
  icon: TablerIcon
  text: String
}

export default function IconButton({ icon, text }: IconButtonInterface) {
  const colorScheme = useColorScheme();

  return (
    <View className="flex-1 flex flex-row border border-1 rounded-2xl pb-2 pt-2 content-center justify-center"
      style={{
        borderColor:
          colorScheme === "dark"
            ? colors.stone.light
            : colors.stone[200],
        gap: 2
      }}
    >
      <Icon icon={icon} />
      <Text>{text}</Text>
    </View>
  );
}
