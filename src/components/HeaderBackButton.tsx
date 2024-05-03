import { IconChevronDown, IconChevronLeft } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { Text, View } from "./Themed";

export default function HeaderBackButton({
  showText = false,
  chevronDirection = "left",
}: {
  showText?: boolean;
  chevronDirection?: "down" | "left";
}) {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <View className="flex flex-row items-center">
        <Icon
          icon={chevronDirection === "left" ? IconChevronLeft : IconChevronDown}
          size={32}
        />
        {showText && <Text className="text-base">Back</Text>}
      </View>
    </TouchableOpacity>
  );
}
