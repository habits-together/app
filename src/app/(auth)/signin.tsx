import { Pressable, Image, FlatList, Dimensions, Animated, Platform } from "react-native";
import { Text, View } from "@/src/components/Themed";
import {
  IconPhotoScan,
  IconBrandAppleFilled,
  IconMail
} from "@tabler/icons-react-native";
import { colors } from "react-native-elements";
import { useColorScheme } from "nativewind";
import { Link } from "expo-router";
import Icon from "@/src/components/Icon";
import { SlidingDot } from "react-native-animated-pagination-dots";
import { useRef } from "react";


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

  const tutorialData = [
    { pageNum: '1', text: 'Create habits and keep track of completions' },
    { pageNum: '2', text: 'Add friends and do habits together' },
    { pageNum: '3', text: 'Help each other reach your goals' },
  ];
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;

  return (
    <View className="flex-1 pt-14 items-center">
      <View className="flex-row items-center justify-between w-11/12 pb-5">
        <View className="flex-row items-center">
          <Image
            className="h-6 w-6 rounded-[20px]"
            source={require("../../../assets/images/Logo.png")} />
          <Text className="text-2xl font-bold ml-2">Habit Together</Text>
        </View>
        <Pressable className="bg-stone-200 dark:bg-stone-800 dark:border-2 dark:border-stone-300 rounded-2xl py-1 px-4">
          <Text className="font-semibold text-base">Skip</Text>
        </Pressable>
      </View>

      <FlatList
        data={tutorialData}
        renderItem={({ item }) => TutorialItem({ item })}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.pageNum}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        className="grow-0 mb-14"
      />

      <SlidingDot
        data={tutorialData}
        scrollX={scrollX}
        dotSize={10}
        containerStyle={{ position: 'relative' }}
        dotStyle={{ backgroundColor: colorScheme === "dark" ? colors.white : colors.black }}
        marginHorizontal={10}
        slidingIndicatorStyle={{ backgroundColor: colorScheme === "dark" ? colors.white : colors.black }}
      />

      <Text className="text-center w-2/3 text-xs mb-3 text-stone-400">By continuing, I agree to the {"\n"}
        <Link href="/"><Text className="underline text-xs text-stone-400">Terms & Conditions</Text></Link> and <Link href="/"><Text className="underline text-xs text-stone-400">Privacy Policy</Text></Link></Text>

      {Platform.OS === "ios" && (
        <>
          <Pressable className="flex flex-row w-11/12 justify-center items-center border-2 dark:border-stone-300 p-2 mt-2 rounded-xl">
            <IconBrandAppleFilled fill={colorScheme === "dark" ? colors.white : colors.black} />
            <Text className="font-semibold text-lg ml-2">Continue with Apple</Text>
          </Pressable>
          <Pressable className="flex flex-row w-11/12 justify-center items-center border-2 dark:border-stone-300 p-2 mt-2 rounded-xl">
            <Image
              className="h-5 w-5 rounded-[20px]"
              source={require("../../../assets/images/google.png")} />
            <Text className="font-semibold text-lg ml-2">Continue with Google</Text>
          </Pressable>
          <Pressable className="mt-2">
            <Text className="font-semibold text-base">Sign up or log in with Email</Text>
          </Pressable>
        </>
      )}
      {Platform.OS === "android" && (
        <>
          <Pressable className="flex flex-row w-11/12 justify-center items-center border-2 dark:border-stone-300 p-2 mt-2 rounded-xl">
            <Image
              className="h-5 w-5 rounded-[20px]"
              source={require("../../../assets/images/google.png")} />
            <Text className="font-semibold text-lg ml-2">Continue with Google</Text>
          </Pressable>
          <Pressable className="flex flex-row w-11/12 justify-center items-center border-2 dark:border-stone-300 p-2 mt-2 rounded-xl">
            <Icon
              icon={IconMail}
              lightColor={colors.black}
              darkColor={colors.white}
              strokeWidth={2.2}
            />
            <Text className="font-semibold text-lg ml-2">Continue with Email</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

function TutorialItem({ item }: { item: { pageNum: string, text: string } }) {
  const { width } = Dimensions.get('window');
  return (
    <View className="items-center justify-center p-0 m-0"
      style={
        {
          width: width,
        }
      }>
      <Icon
        icon={IconPhotoScan}
        size={270}
        strokeWidth={0.8}
      />
      <Text className="text-center font-bold text-3xl px-2">{item.text}</Text>
    </View>
  );
}
