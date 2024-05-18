import { TextInput } from "react-native";
import { View, Text } from "./Themed";
import colors from "../constants/colors";
import { useColorScheme } from "nativewind";

export default function AuthInputField({
  text,
  isPass,
}: {
  text: string;
  isPass: boolean;
}) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex w-full items-center pb-5">
      <View className="mb-1 self-start">
        <Text className="text-base font-semibold">{text}</Text>
      </View>
      <TextInput
        className="h-10 w-full rounded-xl border border-stone-300 pl-3"
        secureTextEntry={isPass}
        keyboardType="default"
        // android only for the cursor color
        cursorColor={
          colorScheme === "dark" ? colors.stone[200] : colors.stone[600]
        }
        style={{
          color: colorScheme === "dark" ? colors.white : colors.black,
        }}
      />
    </View>
  );
}
