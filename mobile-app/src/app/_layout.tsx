import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Provider, useAtomValue } from "jotai";
import { NativeWindStyleSheet, useColorScheme } from "nativewind";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";
import "react-native-reanimated";
import { settingAtom } from "../atoms/atoms";
import { atomStore } from "../atoms/store";
import {
  emailLoginOptions,
  emailSignUpOptions,
  forgotPasswordOptions,
  viewHabitOptions,
} from "../components/HeaderOptions";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();
  const themeSetting = useAtomValue(settingAtom("theme"));
  useEffect(() => {
    if (themeSetting === 1) {
      NativeWindStyleSheet.setColorScheme("light");
    } else if (themeSetting === 2) {
      NativeWindStyleSheet.setColorScheme("dark");
    } else {
      NativeWindStyleSheet.setColorScheme(colorScheme || "light");
    }
  }, [themeSetting]);

  return (
    <Provider store={atomStore}>
      <MenuProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "ios",
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)/signin" />
            <Stack.Screen
              name="(auth)/emailsignup"
              options={emailSignUpOptions(colorScheme)}
            />
            <Stack.Screen
              name="(auth)/emaillogin"
              options={emailLoginOptions(colorScheme)}
            />
            <Stack.Screen
              name="(auth)/forgotpassword"
              options={forgotPasswordOptions(colorScheme)}
            />
            <Stack.Screen
              name="(auth)/createprofile"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="viewhabit"
              options={viewHabitOptions(colorScheme)}
            />
            <Stack.Screen
              name="modals"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
              }}
            />
          </Stack>
        </ThemeProvider>
      </MenuProvider>
    </Provider>
  );
}
