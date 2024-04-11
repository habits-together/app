import { TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { router } from "expo-router";
import { IconChevronLeft } from "@tabler/icons-react-native";
import { Text, View } from "./Themed";

export default function HeaderBackButton({
  showText = false,
}: {
  showText?: boolean;
}) {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <View className="flex flex-row items-center">
        <Icon icon={IconChevronLeft} size={32} />
        {showText && <Text className="text-base">Back</Text>}
      </View>
    </TouchableOpacity>
  );
}
