import HeaderBackButton from "@/src/components/HeaderBackButton";
import colors from "@/src/constants/colors";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text } from "react-native";

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

        headerLeft: () => <HeaderBackButton />,

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
