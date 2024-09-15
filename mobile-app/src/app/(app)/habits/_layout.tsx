import {
  createHabitOptions,
  editHabitOptions,
  habitIconsOptions,
  viewHabitOptions,
} from "@/src/components/HeaderOptions";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function HabitsLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="createhabit"
        options={createHabitOptions(colorScheme)}
      />
      <Stack.Screen name="edithabit" options={editHabitOptions(colorScheme)} />
      <Stack.Screen
        name="habiticons"
        options={habitIconsOptions(colorScheme)}
      />
      <Stack.Screen name="viewhabit" options={viewHabitOptions(colorScheme)} />
    </Stack>
  );
}
