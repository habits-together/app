import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Feather, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import {
  IconSettings,
  IconStack2,
  IconUsers,
} from "@tabler/icons-react-native";

import { Appearance, useColorScheme } from "react-native";
import colors from "@/constants/colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const foreground = colorScheme === "dark" ? colors.grey["50"] : colors.black;
  const background = colorScheme === "dark" ? colors.black : colors.grey["50"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: foreground,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          height: 110,
          backgroundColor: background,
          borderBottomWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontSize: 32,
          fontWeight: "700",
          color: foreground,
        },
        tabBarStyle: {
          backgroundColor: background,
          height: Platform.select({ ios: 90, android: 75 }),
          paddingTop: Platform.select({ ios: 12, android: 10 }),
          alignItems: "center",
        },
        tabBarLabelStyle: {
          textAlign: "center",
          paddingBottom: Platform.select({ ios: 0, android: 17 }),
          fontWeight: "600",
          color: foreground,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Habits",
          tabBarIcon: ({ color }) => (
            <IconStack2 color={color} size={24} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: ({ color }) => (
            <IconUsers color={color} size={24} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSettings color={color} size={24} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}
