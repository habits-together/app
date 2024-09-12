import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Provider } from "jotai";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";
import "react-native-reanimated";
import { atomStore } from "../atoms/store";
import { checkifUserExistsInDb } from "../firebase/api";
import { UserIdT } from "../lib/db_types";
import { resetNavigationStack } from "../lib/resetNavigationStack";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const auth = getAuth();
  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

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
          /** user is logged in and exists
           * so the auth pages are only usable
           * when a user is logged out. (idk if we want this???)
           */
          resetNavigationStack("/habits");
        }
      }
    });
    return () => unsubscribe();
  }, [auth]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Provider store={atomStore}>
      <MenuProvider>
        <ThemeProvider value={DefaultTheme}>
          <QueryClientProvider client={queryClient}>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "ios",
              }}
            >
              <Stack.Screen name="(app)" />
              <Stack.Screen name="(auth)" />
            </Stack>
          </QueryClientProvider>
        </ThemeProvider>
      </MenuProvider>
    </Provider>
  );
}
