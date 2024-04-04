import { router, Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { IconChevronLeft } from "@tabler/icons-react-native";
import colors from "@/constants/colors";
import Icon from "@/components/Icon";
import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import HeaderBackButton from "@/components/HeaderBackButton";

export default function SettingsLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerTitle: (props) => (
          <Text className="text-3xl font-bold text-black dark:text-white">
            {props.children}
          </Text>
        ),
        headerTitleAlign: "center",

        headerLeft: () => (
          <HeaderBackButton />
        ),

        headerStyle: {
          backgroundColor:
            colorScheme === "dark" ? colors.stone.base : colors.stone["50"],
        },
        headerShadowVisible: false,
        animation: "ios",
        headerBackVisible: false,
      }}
    >
      <Stack.Screen name="theme" options={{ title: "Theme" }} />
      <Stack.Screen
        name="widgetsettings"
        options={{ title: "Widget Settings" }}
      />
    </Stack>
  );
}
