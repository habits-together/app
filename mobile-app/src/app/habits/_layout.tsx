import { Stack } from "expo-router";

export default function HabitsLayout() {
  return (
    <Stack>
      <Stack.Screen name="createhabit" options={{ headerShown: false }} />
      <Stack.Screen name="edithabit" options={{ headerShown: false }} />
      <Stack.Screen name="habiticons" options={{ headerShown: false }} />
    </Stack>
  );
}
