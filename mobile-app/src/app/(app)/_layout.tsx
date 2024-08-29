import { settingAtom } from "@/src/atoms/atoms";
import {
  currentUserAtom,
  refreshCurrentUserAtom,
} from "@/src/atoms/currentUserAtom";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { Stack } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Provider, useAtomValue, useSetAtom } from "jotai";
import { NativeWindStyleSheet, useColorScheme } from "nativewind";
import { useEffect } from "react";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tab)",
};

export default function AppLayout() {
  // if the user is not logged in, redirect them to auth
  const auth = getAuth();
  const refreshCurrentUser = useSetAtom(refreshCurrentUserAtom);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        refreshCurrentUser();
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

  // the current user atom can take a moment to update
  const currentUser = useAtomValue(currentUserAtom);
  if (!currentUser.id) {
    return null;
  }

  return (
    <Provider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "ios",
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Provider>
  );
}
