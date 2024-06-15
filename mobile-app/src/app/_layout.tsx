import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSetAtom } from "jotai";
import { useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";
import "react-native-reanimated";
import { fetchHabitsAtom } from "../atoms/atoms";
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

  const fetchHabits = useSetAtom(fetchHabitsAtom);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in", user.uid);
      // fetchHabits();
    } else {
      console.log("No user is signed in");
    }
    fetchHabits();
  });
  // useEffect(() => {
  // },[])

  if (!loaded) {
    return null;
  }



  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();

  return (
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
  );
}
