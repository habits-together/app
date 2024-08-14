import Logo from "@/assets/images/Logo.svg";
import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { IconMail, IconPhotoScan } from "@tabler/icons-react-native";
import { Link, router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
} from "react-native";
import { SlidingDot } from "react-native-animated-pagination-dots";
import { colors } from "react-native-elements";

export default function Signin() {
  const { colorScheme } = useColorScheme();
  const { width } = Dimensions.get("window");
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    resetNavigationStack("/");
  }
  async function signInWithApple() {
    resetNavigationStack("/");
  }
  async function signInWithEmail() {
    router.push("/(auth)/emailsignup");
  }
  async function continueAsGuest() {
    resetNavigationStack("/");
  }

  function TutorialItem({ item }: { item: { pageNum: string; text: string } }) {
    return (
      <View
        className="m-0 items-center justify-center p-0"
        style={{
          width: width,
        }}
      >
        <Icon icon={IconPhotoScan} size={270} strokeWidth={0.8} />
        <Text className="px-2 text-center text-3xl font-bold">{item.text}</Text>
      </View>
    );
  }

  const tutorialData = [
    { pageNum: "1", text: "Create habits and keep track of completions" },
    { pageNum: "2", text: "Add friends and do habits together" },
    { pageNum: "3", text: "Put interactive widgets on your home screen" },
  ];
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;

  return (
    <View className="flex-1 items-center pt-14">
      <View className="w-full flex-row items-center justify-between px-4 pb-5">
        <View className="flex-row items-center">
          {/* <Image
            className="h-6 w-6 rounded-[20px]"
            source={require("@/assets/images/Logo.svg")}
          /> */}
          <Logo height={24} width={24} />
          <Text className="ml-2 text-2xl font-bold">Habits Together</Text>
        </View>
        <Pressable
          className="rounded-2xl bg-stone-200 px-4 py-1 dark:bg-stone-700"
          onPress={continueAsGuest}
        >
          <Text className="text-base font-semibold">Skip</Text>
        </Pressable>
      </View>

      <View className="flex w-full flex-1 items-center justify-center pb-3">
        <FlatList
          data={tutorialData}
          renderItem={({ item }) => TutorialItem({ item })}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.pageNum}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            },
          )}
          className="mb-14 grow-0"
        />

        <SlidingDot
          data={tutorialData}
          scrollX={scrollX}
          dotSize={10}
          containerStyle={{ position: "relative" }}
          dotStyle={{
            backgroundColor:
              colorScheme === "dark" ? colors.white : colors.black,
          }}
          marginHorizontal={10}
          slidingIndicatorStyle={{
            backgroundColor:
              colorScheme === "dark" ? colors.white : colors.black,
          }}
        />

        <Text className="mb-3 w-2/3 text-center text-xs text-stone-400">
          By continuing, I agree to the {"\n"}
          <Link href="/">
            <Text className="text-xs text-stone-400 underline">
              Terms & Conditions
            </Text>
          </Link>{" "}
          and{" "}
          <Link href="/">
            <Text className="text-xs text-stone-400 underline">
              Privacy Policy
            </Text>
          </Link>
        </Text>

        <View className="flex w-full items-center justify-center px-4">
          {Platform.OS === "ios" && (
            <>
              <AppleButton />
              <GoogleButton />
              <Pressable className="mt-2" onPress={signInWithEmail}>
                <Text className="text-base font-semibold">
                  Continue with Email
                </Text>
              </Pressable>
            </>
          )}
          {Platform.OS === "android" && (
            <>
              <GoogleButton />
              <EmailButton />
            </>
          )}
        </View>
      </View>
    </View>
  );

  function GoogleButton() {
    return (
      <Pressable
        className="mt-2 flex h-14 w-full flex-row items-center justify-center rounded-xl border-2 p-2 dark:border-0 dark:bg-white"
        onPress={signInWithGoogle}
      >
        <Image
          className="h-5 w-5 rounded-[20px]"
          source={require("@/assets/images/google.png")}
        />
        <Text className="ml-2 text-xl font-semibold text-black">
          Continue with Google
        </Text>
      </Pressable>
    );
  }

  function AppleButton() {
    return (
      <Pressable
        className="mt-2 flex h-14 w-full flex-row items-center justify-center rounded-xl border-2 p-2 dark:border-0 dark:bg-white"
        onPress={signInWithApple}
      >
        <Image
          className="h-5 w-5 rounded-[20px]"
          source={require("@/assets/images/apple.png")}
        />
        <Text className="ml-2 text-xl font-semibold text-black">
          Continue with Apple
        </Text>
      </Pressable>
    );
  }

  function EmailButton() {
    return (
      <Pressable
        className="mt-2 flex h-14 w-full  flex-row items-center justify-center rounded-xl border-2 p-2 dark:border-0 dark:bg-white"
        onPress={signInWithEmail}
      >
        <Icon
          icon={IconMail}
          lightColor={colors.black}
          darkColor={colors.black}
          strokeWidth={2.2}
        />
        <Text className="ml-2 text-xl font-semibold text-black">
          Continue with Email
        </Text>
      </Pressable>
    );
  }
}
