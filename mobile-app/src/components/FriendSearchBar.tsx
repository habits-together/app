import { SafeAreaView, View } from "@/src/components/Themed";
import colors from "@/src/constants/colors";
import { IconSearch } from "@tabler/icons-react-native";
import { useAtom } from "jotai";
import { useColorScheme } from "nativewind";
import { TextInput } from "react-native";
import { searchQueryAtom } from "../atoms/atoms";
import Icon from "./Icon";
import { useEffect, useState } from "react";

export default function FriendSearchBar({
  placeholder,
}: {
  placeholder: string;
}) {
  const [localSearchText, setLocalSearchText] = useState('');
  const [searchText, setSearchText] = useAtom(searchQueryAtom);
  const { colorScheme } = useColorScheme();

  // Setup debounce effect
  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchText(localSearchText);
    }, 500); // 500ms delay

    return () => clearTimeout(timerId);
  }, [localSearchText, setSearchText]);

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
        onChangeText={setLocalSearchText}
        value={localSearchText}
        placeholder={placeholder}
        keyboardType="default"
      />
    </SafeAreaView>
  );
}
