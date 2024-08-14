import { settingAtom } from "@/src/atoms/atoms";
import { viewHabitOptions } from "@/src/components/HeaderOptions";
import { Stack } from "expo-router";
import { useAtomValue } from "jotai";
import { NativeWindStyleSheet, useColorScheme } from "nativewind";
import { useEffect } from "react";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tab)",
};

export default function AppLayout() {
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
