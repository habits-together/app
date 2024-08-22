import Icon from "@/src/components/Icon";
import RoundedButton from "@/src/components/RoundedButton";
import { View } from "@/src/components/Themed";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import colors from "@/src/constants/colors";
import {
  IconBell,
  IconPlus,
  IconSettings,
  IconStack2,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react-native";
import { Tabs, router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  const foreground = colorScheme === "dark" ? colors.white : colors.stone.base;
  const background = colorScheme === "dark" ? colors.stone.base : colors.white;
  const tabBackGround =
    colorScheme === "dark" ? colors.stone["900"] : colors.stone["100"];
  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          backgroundColor: background,
        },
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: "700",
          color: foreground,
        },
        headerShadowVisible: false,
        tabBarActiveTintColor: foreground,
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
        name="habits"
        options={{
          title: "Habits",
          headerRight: () => (
            <View className="mr-4">
              <RoundedButton
                text="New Habit"
                icon={IconPlus}
                onPress={() => {
                  router.push("/habits/createhabit");
                }}
              />
            </View>
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
          headerRight: () => (
            <View className="mr-4">
              <RoundedButton
                text="Add friends"
                icon={IconUserPlus}
                onPress={() => {
                  router.push("/friends/addfriends");
                }}
              />
            </View>
          ),
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
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <Icon
              icon={IconBell}
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
