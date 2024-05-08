import { SafeAreaView, View } from "@/src/components/Themed";
import { useState } from "react";
import { TextInput } from "react-native";
import colors from "@/src/constants/colors";
import { useColorScheme } from "nativewind";
import { IconSearch } from "@tabler/icons-react-native";
import Icon from "./Icon";

export default function FriendSearchBar({
  placeholder,
}: {
  placeholder: string;
}) {
  const [text, onChangeText] = useState("");
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className="my-1 h-10">
      <View className="absolute left-2 top-2">
        <Icon
          icon={IconSearch}
          size={24}
          darkColor={colors.stone[300]}
          lightColor={colors.stone[300]}
          strokeWidth={2.1}
        />
      </View>
      <TextInput
        className="rounded-xl border border-stone-300 pl-10"
        style={{
          height: 40,
          color: colorScheme === "dark" ? colors.stone[200] : colors.stone[600],
        }}
        // android only for the cursor color
        cursorColor={
          colorScheme === "dark" ? colors.stone[200] : colors.stone[600]
        }
        placeholderTextColor={colors.stone[300]}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        keyboardType="default"
      />
    </SafeAreaView>
  );
}
