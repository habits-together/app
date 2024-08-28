import { refreshCurrentUserAtom } from "@/src/atoms/currentUserAtom";
import {
  emailLoginOptions,
  emailSignUpOptions,
  forgotPasswordOptions,
} from "@/src/components/HeaderOptions";
import { checkifUserExistsInDb } from "@/src/firebase/api";
import { UserIdT } from "@/src/lib/db_types";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { Stack } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSetAtom } from "jotai";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";

export default function AuthLayout() {
  // if the user is logged in, redirect them
  const auth = getAuth();
  const refreshCurrentUser = useSetAtom(refreshCurrentUserAtom);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        refreshCurrentUser();
        const userHasProfile = await checkifUserExistsInDb({
          userId: user.uid as UserIdT,
        });
        if (userHasProfile) {
          resetNavigationStack("/habits");
        } else {
          resetNavigationStack("/createprofile");
        }
      }
    });
    return () => unsubscribe();
  }, [auth]);

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
