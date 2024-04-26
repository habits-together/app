import { SafeAreaView, View } from "@/src/components/Themed";
import { useState } from "react";
import { TextInput } from "react-native";
import colors from "@/src/constants/colors";
import { useColorScheme } from "nativewind";
import { IconSearch } from "@tabler/icons-react-native";
import Icon from "./Icon";

export default function FriendSearchBar() {
    const [text, onChangeText] = useState('');
    const { colorScheme } = useColorScheme();
    return (
        <SafeAreaView className="relative">
            <View className="absolute top-5 left-5">
                <Icon
                    icon={IconSearch}
                    size={24}
                    darkColor={colors.stone[500]}
                    lightColor={colors.stone[300]}
                    strokeWidth={2.1}
                />
            </View>
            <TextInput
                className="h-10 m-3 p-2.5 border-2 rounded-xl pl-10"
                style={{
                    height: 40,
                    color: colorScheme === "dark"
                        ? colors.stone[200]
                        : colors.stone[600],
                    borderColor: colorScheme === "dark"
                        ? colors.stone[500]
                        : colors.stone[200],
                }}
                // android only for the cursor color
                cursorColor={colorScheme === "dark"
                    ? colors.stone[200]
                    : colors.stone[600]}
                placeholderTextColor={colorScheme === "dark"
                    ? colors.stone[400]
                    : colors.stone[400]}
                onChangeText={onChangeText}
                value={text}
                placeholder="Search your friends list..."
                keyboardType="default"
            />
        </SafeAreaView>
    );
};