import {
  Pressable,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { Text, View } from "@/src/components/Themed";
import {
  IconPhotoScan,
  IconBrandAppleFilled,
  IconMail,
} from "@tabler/icons-react-native";
import { colors } from "react-native-elements";
import { useColorScheme } from "nativewind";
import { Link, router } from "expo-router";
import Icon from "@/src/components/Icon";
import { SlidingDot } from "react-native-animated-pagination-dots";
import { useRef, useState } from "react";
import Logo from "@/assets/images/Logo.svg";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDtBfjTfxG6KvP96yHH6qiJexeS-2-3rJA",
//   authDomain: "habits-together.firebaseapp.com",
//   projectId: "habits-together",
//   storageBucket: "habits-together.appspot.com",
//   messagingSenderId: "731859375504",
//   appId: "1:731859375504:web:80b078f13a31b5d897cf15",
//   measurementId: "G-46NX1BKJK8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


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
    resetNavigationStack("/");
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
      <View className="w-full px-4 flex-row items-center justify-between pb-5">
        <View className="flex-row items-center">
          {/* <Image
            className="h-6 w-6 rounded-[20px]"
            source={require("../../../assets/images/Logo.svg")}
          /> */}
          <Logo height={24} width={24} />
          <Text className="ml-2 text-2xl font-bold">Habits Together</Text>
        </View>
        <Pressable className="rounded-2xl bg-stone-200 dark:bg-stone-700 px-4 py-1"
          onPress={continueAsGuest}>
          <Text className="text-base font-semibold">Skip</Text>
        </Pressable>
      </View>

      <View className="flex-1 w-full flex justify-center items-center pb-3">
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
            backgroundColor: colorScheme === "dark" ? colors.white : colors.black,
          }}
          marginHorizontal={10}
          slidingIndicatorStyle={{
            backgroundColor: colorScheme === "dark" ? colors.white : colors.black,
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

        <View className="w-full flex justify-center items-center px-4">
          {Platform.OS === "android" && (
            <>
              <AppleButton />
              <GoogleButton />
              <Pressable className="mt-2">
                <Text className="text-base font-semibold">
                  Sign up or log in with Email
                </Text>
              </Pressable>
            </>
          )}
          {Platform.OS === "ios" && (
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
        className="h-14 mt-2 flex w-full flex-row items-center justify-center rounded-xl border-2 p-2 dark:bg-white"
        onPress={signInWithGoogle}
      >
        <Image className="h-5 w-5 rounded-[20px]" source={require("../../../assets/images/google.png")} />
        <Text className="ml-2 text-lg font-semibold text-black">Continue with Google</Text>
      </Pressable>
    )
  }

  function AppleButton() {
    return (
      <Pressable
        className="h-14 mt-2 flex w-full flex-row items-center justify-center rounded-xl border-2 p-2 dark:bg-white"
        onPress={signInWithApple}
      >
        <Image className="h-5 w-5 rounded-[20px]" source={require("../../../assets/images/apple.png")} />
        <Text className="ml-2 text-lg font-semibold text-black">Continue with Apple</Text>
      </Pressable>
    )
  }

  function EmailButton() {
    return (
      <Pressable
        className="h-14 mt-2 flex w-full  flex-row items-center justify-center rounded-xl border-2 p-2 dark:bg-white"
        onPress={signInWithEmail}
      >
        <Icon icon={IconMail} lightColor={colors.black} darkColor={colors.black} strokeWidth={2.2} />
        <Text className="ml-2 text-lg font-semibold text-black">Continue with Email</Text>
      </Pressable>
    )
  }
}
