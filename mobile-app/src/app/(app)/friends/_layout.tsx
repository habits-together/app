import {
  addFriendsOptions,
  editProfileOptions,
  inviteFriendsOptions,
  viewProfileOptions,
} from "@/src/components/HeaderOptions";
import colors from "@/src/constants/colors";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { MenuProvider } from "react-native-popup-menu";

export default function ModalLayout() {
  const { colorScheme } = useColorScheme();
  /**
   * For somereson EACH modal options get calculated everytime any
   * model is displayed. what the actual fudge is going on
   */
  return (
    // need another menu provider since this is a modal
    // https://github.com/instea/react-native-popup-menu/blob/master/doc/api.md#menuprovider
    <MenuProvider skipInstanceCheck>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor:
                colorScheme === "dark" ? colors.stone.base : colors.white,
            },
            animation: "ios",
          }}
        >
          <Stack.Screen
            name="viewprofile"
            options={viewProfileOptions(colorScheme)}
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
      </ThemeProvider>
    </MenuProvider>
  );
}
