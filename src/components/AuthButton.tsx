import { Pressable } from "react-native";
import { Text } from "@/src/components/Themed";

export default function AuthButton({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      className="flex h-14 w-full flex-row items-center justify-center rounded-xl border-2 p-2 dark:bg-white"
      onPress={onPress}
    >
      <Text className="ml-2 text-xl font-semibold text-black">{text}</Text>
    </Pressable>
  );
}
