import { settingAtom } from "@/src/atoms/atoms";
import { viewHabitOptions } from "@/src/components/HeaderOptions";
import { checkifUserExistsInDb } from "@/src/firebase/api";
import { UserIdT } from "@/src/lib/db_types";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { Stack } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAtomValue } from "jotai";
import { NativeWindStyleSheet, useColorScheme } from "nativewind";
import { useEffect } from "react";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tab)",
};

export default function AppLayout() {
  // must be loggged in
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userHasProfile = await checkifUserExistsInDb({
          userId: user.uid as UserIdT,
        });
        if (!userHasProfile) {
          /** If user is logged in and they don't exist in firestore
           * (no profile) rediect them to /createprofile
           */
          resetNavigationStack("/createprofile");
        }
      } else {
        // only authenticated users allowed here
        resetNavigationStack("/");
      }
    });
    return () => unsubscribe();
  }, [auth]);

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
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "ios",
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="viewhabit" options={viewHabitOptions(colorScheme)} />
      <Stack.Screen
        name="modals"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
