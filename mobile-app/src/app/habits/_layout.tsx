import { Stack } from "expo-router";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export const IconContext = createContext<{
  icon: string;
  setIcon: Dispatch<SetStateAction<string>>;
}>({ icon: "", setIcon: () => null });

export default function HabitsLayout() {
  const [icon, setIcon] = useState("default");

  return (
    <IconContext.Provider value={{ icon, setIcon }}>
      <Stack>
        <Stack.Screen name="createhabit" options={{ headerShown: false }} />
        <Stack.Screen name="habiticons" options={{ headerShown: false }} />
      </Stack>
    </IconContext.Provider>
  );
}
