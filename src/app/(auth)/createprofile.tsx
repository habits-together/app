import { Text, View } from "@/src/components/Themed";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { Image, TextInput, TouchableOpacity } from "react-native";
import DefaultColors from "@/src/constants/DefaultColors";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react-native";
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
    <View className="flex-1 flex flex-col justify-between items-center pt-40 pb-20">
      {/* Form */}
      <View className="flex flex-col self-start gap-y-4 w-screen pl-5 pr-5">
        <Text className="text-4xl font-bold self-center">Create account</Text>
        <View className="flex flex-col gap-y-4">
          {/* Profile Picture */}
          <View className="flex flex-col gap-y-1">
            <Text className="text-xs font-bold">Profile picture</Text>
            <TouchableOpacity className="relative self-center"
              onPress={() => {
                // Logic for picking picture
              }}>
              {pfp && <Image className="h-24 w-24 rounded-3xl overflow-visible" source={{ uri: pfp }} />}
              <View className="absolute -bottom-2 -right-2 rounded-full">
                <Icon icon={IconCirclePlus} size={36}/>
              </View>
            </TouchableOpacity>
          </View>
          {/* Display Name */}
          <View className="flex flex-col gap-y-1">
            <Text className="text-xs font-bold">Display name</Text>
            <TextInput className="border-2 rounded-lg pt-1 pb-1 pl-3 pr-3"
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
            <View className="flex flex-row">
              <Text className="text-xs font-bold">Username&nbsp;</Text>
              <Text className="text-xs opacity-50">(this is how people will add you as a friend)</Text>
            </View>
            <TextInput className="border-2 rounded-lg pt-1 pb-1 pl-3 pr-3"
              style={{
                borderColor: DefaultColors[colorScheme].tint,
                color: DefaultColors[colorScheme].text,
              }}
              value={username}
              onChangeText={text => setUsername(text)}
            >
            </TextInput>
          </View>
        </View>
      </View>
      {/* Complete profile */}
      <TouchableOpacity
        onPress={() => resetNavigationStack("/")}
        className="flex items-center w-5/6 border-2 rounded-lg p-4"
        style={{
          borderColor: DefaultColors[colorScheme].tint,
        }}
      >
        <Text className="text-lg font-bold">Complete profile</Text>
      </TouchableOpacity>
    </View>
  );
}
