import React from "react";
import { Platform, Pressable } from "react-native";
import { Text } from "@/src/components/Themed";
import { Tabs } from "expo-router";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import {
  IconSettings,
  IconStack2,
  IconUsers,
  IconPlus
} from "@tabler/icons-react-native";
import colors from "@/src/constants/colors";
import Icon from "@/src/components/Icon";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  const foreground = colorScheme === "dark" ? colors.white : colors.stone.base;
  const background = colorScheme === "dark" ? colors.stone.base : colors.white;
  const tabBackGround =
    colorScheme === "dark" ? colors.stone["900"] : colors.stone["100"];
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: foreground,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          backgroundColor: background,
        },
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontSize: 32,
          fontWeight: "700",
          color: foreground,
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: tabBackGround,
          height: Platform.select({ ios: 90, android: 75 }),
          paddingTop: Platform.select({ ios: 12, android: 10 }),
          alignItems: "center",
          borderBlockColor: "transparent",
        },
        tabBarLabelStyle: {
          textAlign: "center",
          paddingBottom: Platform.select({ ios: 0, android: 17 }),
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Habits",
          headerRight: () => (
            <Pressable
              className="flex-row items-center justify-between absolute right-4 top-4 px-4 py-1.5 border-2 rounded-3xl w-28"
              android_ripple={{ color: colors.stone["300"] , radius: 55}}
              style={{
                borderColor: foreground,
              }}
              onPress={() => {
                console.log('Add new habit pressed');
              }}
            >
              <Icon
                icon={IconPlus}
                size={15}
                lightColor={foreground}
                darkColor={foreground}
                strokeWidth={3}
              />
              <Text className="font-bold">New habit</Text>
            </Pressable>
          ),
          tabBarIcon: ({ color }) => (
            <Icon
              icon={IconStack2}
              lightColor={color}
              darkColor={color}
              strokeWidth={2.5}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: ({ color }) => (
            <Icon
              icon={IconUsers}
              lightColor={color}
              darkColor={color}
              strokeWidth={2.5}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Icon
              icon={IconSettings}
              lightColor={color}
              darkColor={color}
              strokeWidth={2.5}
            />
          ),
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? colors.stone.base : colors.stone["50"],
          },
        }}
      />
    </Tabs>
  );
}
