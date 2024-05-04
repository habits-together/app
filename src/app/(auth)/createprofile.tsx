import { Text, View } from "@/src/components/Themed";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { Image, TextInput, TouchableOpacity } from "react-native";
import DefaultColors from "@/src/constants/DefaultColors";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { IconCheck, IconCirclePlus } from "@tabler/icons-react-native";
import Icon from "@/src/components/Icon";
import { fetchSingleUserThumbnail } from "@/src/lib/getRandomProfilePics";

export default function Createprofile() {
  const { colorScheme } = useColorScheme();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState();

  useEffect(() => {
    fetchSingleUserThumbnail().then(user => {
      setPfp(user.imgurl);
    });
  }, []);

  return (
    <View className="flex-1 flex flex-col items-center pt-20">
      {/* Form */}
      <View className="flex flex-col gap-y-6 w-screen pl-5 pr-5">
        <Text className="text-4xl font-bold">Create account</Text>
        {/* Profile Picture */}
        <TouchableOpacity className="relative self-center"
          onPress={() => {
            // Logic for picking picture
          }}>
          {pfp ?
            <Image className="h-24 w-24 rounded-3xl" source={{ uri: pfp }} /> :
            <View className="h-24 w-24 rounded-3xl" />
          }
          <View className="absolute -bottom-2 -right-2 rounded-full">
            <Icon icon={IconCirclePlus} size={36} />
          </View>
        </TouchableOpacity>
        {/* Display Name */}
        <View className="flex flex-col gap-y-1">
          <Text className="text-base font-semibold">Display name</Text>
          <TextInput className="border rounded-lg px-3 h-10"
            style={{
              borderColor: DefaultColors[colorScheme].tint,
              color: DefaultColors[colorScheme].text,
            }}
            placeholder="John Doe"
            placeholderTextColor={DefaultColors[colorScheme].placeholder}
            value={displayName}
            onChangeText={text => setDisplayName(text)}
          >
          </TextInput>
        </View>
        {/* Username */}
        <View className="flex flex-col gap-y-1">
          <Text className="text-base font-semibold">Unique username</Text>
          <TextInput className="border rounded-lg px-3 h-10"
            style={{
              borderColor: DefaultColors[colorScheme].tint,
              color: DefaultColors[colorScheme].text,
            }}
            value={username}
            onChangeText={text => setUsername(text)}
          >
          </TextInput>
        </View>
        {/* Complete profile */}
        <TouchableOpacity
          onPress={() => resetNavigationStack("/")}
          className="flex-row gap-x-2 justify-center items-center border-2 rounded-lg h-16 ml-0"
          style={{
            borderColor: DefaultColors[colorScheme].tint,
          }}
        >
          <Icon icon={IconCheck} />
          <Text className="text-lg font-bold">Complete profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
