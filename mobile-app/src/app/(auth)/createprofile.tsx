import Icon from "@/src/components/Icon";
import ProfileCreationBoxes from "@/src/components/PfpNameUsernameBoxes";
import { Text, View } from "@/src/components/Themed";
import DefaultColors from "@/src/constants/DefaultColors";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { IconCheck } from "@tabler/icons-react-native";
import { useColorScheme } from "nativewind";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

export default function createprofile() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView
      className={`flex flex-1 flex-col items-center bg-white dark:bg-stone-800`}
      style={{
        paddingTop:
          Platform.OS === "android"
            ? Math.max(StatusBar.currentHeight || 0, 34)
            : 0,
      }}
    >
      {/* Form */}
      <View className="flex w-screen flex-col px-5">
        <Text className="text-3xl font-bold">Create profile</Text>
        <ProfileCreationBoxes editPage={false} />
        {/* Complete profile */}
        <TouchableOpacity
          onPress={() => resetNavigationStack("/habits")}
          className="mt-10 h-16 flex-row items-center justify-center rounded-lg border-2"
          style={{
            borderColor: DefaultColors[colorScheme].tint,
          }}
        >
          <Icon icon={IconCheck} />
          <Text className="ml-2 text-lg font-bold">Complete profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
