import {
  addFriendsOptions,
  editProfileOptions,
  inviteFriendsOptions,
  viewHabitOptions,
  viewProfileOptions,
} from "@/src/components/HeaderOptions";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { MenuProvider } from "react-native-popup-menu";

export default function SettingsLayout() {
  const { colorScheme } = useColorScheme();

  return (
    // need another menu provider since this is a modal
    // https://github.com/instea/react-native-popup-menu/blob/master/doc/api.md#menuprovider
    <MenuProvider skipInstanceCheck>
      <Stack
        screenOptions={{
          animation: "ios",
        }}
      >
        <Stack.Screen
          name="viewprofile"
          options={viewProfileOptions(colorScheme)}
        />
        <Stack.Screen
          name="viewhabit"
          options={viewHabitOptions(colorScheme)}
        />
        <Stack.Screen
          name="invitefriends"
          options={inviteFriendsOptions(colorScheme)}
        />
        <Stack.Screen
          name="addfriends"
          options={addFriendsOptions(colorScheme)}
        />
        <Stack.Screen
          name="editprofile"
          options={editProfileOptions(colorScheme)}
        />
      </Stack>
    </MenuProvider>
  );
}
