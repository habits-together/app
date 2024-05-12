import { TextInput } from "react-native";
import { View, Text } from "./Themed";
import colors from "../constants/colors";
import { useColorScheme } from "nativewind";

export default function AuthInputFienld({ text, isPass }: { text: string, isPass: boolean }) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex items-center w-full pb-5">
      <View className="self-start mb-1">
        <Text className="font-semibold text-base">{text}</Text>
      </View>
      <TextInput
        className="rounded-xl border border-stone-300 pl-3 w-full h-10"
        secureTextEntry={isPass}
        keyboardType="default"
        // android only for the cursor color
        cursorColor={
          colorScheme === "dark" ? colors.stone[200] : colors.stone[600]
        }
      />
    </View>
  );
}

