import { SafeAreaView, View } from "@/src/components/Themed";
import colors from "@/src/constants/colors";
import { IconSearch } from "@tabler/icons-react-native";
import { useAtom } from "jotai";
import { useColorScheme } from "nativewind";
import { TextInput } from "react-native";
import { searchQueryAtom } from "../atoms/atoms";
import Icon from "./Icon";

export default function FriendSearchBar({
  placeholder,
}: {
  placeholder: string;
}) {
  const [searchText, setSearchText] = useAtom(searchQueryAtom);
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
        onChangeText={setSearchText}
        value={searchText}
        placeholder={placeholder}
        keyboardType="default"
      />
    </SafeAreaView>
  );
}
