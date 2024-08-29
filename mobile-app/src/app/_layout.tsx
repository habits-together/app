import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "jotai";
import { useEffect } from "react";
import { useMMKVString } from "react-native-mmkv";
import { MenuProvider } from "react-native-popup-menu";
import "react-native-reanimated";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <LoadingHandler>
      <ProvidersHandler>
        <RemountOnAuthChange>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "ios",
            }}
          >
            <Stack.Screen name="(app)" />
            <Stack.Screen name="(auth)" />
          </Stack>
        </RemountOnAuthChange>
      </ProvidersHandler>
    </LoadingHandler>
  );
}

function LoadingHandler({ children }: { children: React.ReactNode }) {
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

  if (!loaded) {
    return null;
  }

  return children;
}

function ProvidersHandler({ children }: { children: React.ReactNode }) {
  return (
    <MenuProvider>
      <ThemeProvider value={DefaultTheme}>{children}</ThemeProvider>
    </MenuProvider>
  );
}

function RemountOnAuthChange({ children }: { children: React.ReactNode }) {
  const [currentUserJSONstring] = useMMKVString("current-user-data");

  return (
    <Provider key={currentUserJSONstring}>
      <>{children}</>
    </Provider>
  );
}
