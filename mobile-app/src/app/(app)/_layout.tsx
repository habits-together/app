import { settingAtom } from "@/src/atoms/atoms";
import {
  currentUserAtom,
  currentUserProfilePicAtom,
} from "@/src/atoms/currentUserAtom";
import {
  checkifUserExistsInDb,
  fetchUserInfo,
  getUserProfilePicUrl,
} from "@/src/firebase/api";
import { UserIdT } from "@/src/lib/db_types";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { Stack } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAtom, useAtomValue } from "jotai";
import { NativeWindStyleSheet, useColorScheme } from "nativewind";
import { useEffect } from "react";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tab)",
};

export default function AppLayout() {
  // must be loggged in
  const { colorScheme } = useColorScheme();
  const themeSetting = useAtomValue(settingAtom("theme"));
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [currentUserProfilePic, setCurrentUserProfilePic] = useAtom(
    currentUserProfilePicAtom,
  );
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
        } else {
          // if current user atom does not have current users data, fetch data
          if (currentUser.id !== user.uid) {
            const userInfo = await fetchUserInfo({
              userId: user.uid as UserIdT,
            });
            setCurrentUser(userInfo);
          }
          // fetch profile pic
          const pic = await getUserProfilePicUrl(currentUser.id, colorScheme);
          setCurrentUserProfilePic(pic);
          console.log(currentUserProfilePic);
          console.log(currentUser);
        }
      } else {
        // only authenticated users allowed here
        resetNavigationStack("/");
      }
    });

    return () => unsubscribe();
  }, [auth]);

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
    </Stack>
  );
}
