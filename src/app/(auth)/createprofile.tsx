import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import DefaultColors from "@/src/constants/DefaultColors";
import { fetchSingleUserThumbnail } from "@/src/lib/getRandomProfilePics";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { IconCheck, IconCirclePlus } from "@tabler/icons-react-native";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, TextInput, TouchableOpacity } from "react-native";

export default function Createprofile() {
  const { colorScheme } = useColorScheme();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState();

  useEffect(() => {
    fetchSingleUserThumbnail().then((user) => {
      setPfp(user.imgurl);
    });
  }, []);

  return (
    <SafeAreaView className="flex flex-1 flex-col items-center bg-white dark:bg-stone-800">
      {/* Form */}
      <View className="flex w-screen flex-col px-5">
        <Text className="text-4xl font-bold">Create profile</Text>
        <View className="mt-10 flex flex-col">
          {/* Profile Picture */}
          <TouchableOpacity
            className="h-24 w-24 self-center rounded-3xl bg-stone-400"
            onPress={() => {
              // Logic for picking picture
            }}
          >
            {pfp && (
              <Image className="h-24 w-24 rounded-3xl" source={{ uri: pfp }} />
            )}
            <View className="absolute -bottom-2 -right-2 rounded-full">
              <Icon icon={IconCirclePlus} size={36} />
            </View>
          </TouchableOpacity>
          {/* Display Name */}
          <View className="mt-5 flex flex-col">
            <Text className="text-base font-semibold">Display name</Text>
            <TextInput
              className="h-10 rounded-lg border border-stone-300 px-3 mt-1"
              style={{
                borderColor: DefaultColors[colorScheme].tint,
                color: DefaultColors[colorScheme].text,
              }}
              placeholder="John Doe"
              placeholderTextColor={DefaultColors[colorScheme].placeholder}
              value={displayName}
              onChangeText={(text) => setDisplayName(text)}
            ></TextInput>
          </View>
          {/* Username */}
          <View className="mt-5 flex flex-col">
            <Text className="text-base font-semibold">Unique username</Text>
            <TextInput
              className="h-10 rounded-lg border border-stone-300 px-3 mt-1"
              style={{
                borderColor: DefaultColors[colorScheme].tint,
                color: DefaultColors[colorScheme].text,
              }}
              value={username}
              onChangeText={(text) => setUsername(text)}
            ></TextInput>
          </View>
        </View>
        {/* Complete profile */}
        <TouchableOpacity
          onPress={() => resetNavigationStack("/")}
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
