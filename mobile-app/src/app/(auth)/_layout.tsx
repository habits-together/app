import {
  emailLoginOptions,
  emailSignUpOptions,
  forgotPasswordOptions,
} from "@/src/components/HeaderOptions";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function AuthLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="emailsignup"
        options={emailSignUpOptions(colorScheme)}
      />
      <Stack.Screen
        name="emaillogin"
        options={emailLoginOptions(colorScheme)}
      />
      <Stack.Screen
        name="forgotpassword"
        options={forgotPasswordOptions(colorScheme)}
      />
      <Stack.Screen name="createprofile" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
