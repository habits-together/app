import { viewHabitOptions } from "@/src/components/HeaderOptions";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function HabitsLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="createhabit" options={{ headerShown: false }} />
      <Stack.Screen name="edithabit" options={{ headerShown: false }} />
      <Stack.Screen name="habiticons" options={{ headerShown: false }} />
      <Stack.Screen name="viewhabit" options={viewHabitOptions(colorScheme)} />
    </Stack>
  );
}
