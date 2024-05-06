import { Icon as TablerIcon } from "@tabler/icons-react-native";
import Icon from "./Icon";
import { Text, View } from "./Themed";
import colors from "@/src/constants/colors";
import { useColorScheme } from "nativewind";

interface IconButtonInterface {
  icon: TablerIcon;
  text: String;
}

export default function IconButton({ icon, text }: IconButtonInterface) {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className="border-1 flex flex-row content-center justify-center rounded-2xl border pb-2 pt-2"
      style={{
        borderColor:
          colorScheme === "dark" ? colors.stone.light : colors.stone[200],
        gap: 2,
      }}
    >
      <Icon icon={icon} />
      <Text>{text}</Text>
    </View>
  );
}
