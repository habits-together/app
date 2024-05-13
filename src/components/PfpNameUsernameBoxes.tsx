import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import DefaultColors from "@/src/constants/DefaultColors";
import { fetchSingleUserThumbnail } from "@/src/lib/getRandomProfilePics";
import {
  IconCirclePlus,
} from "@tabler/icons-react-native";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import {
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function ProfileCreationBoxes({ editPage }: { editPage: boolean }) {
  const { colorScheme } = useColorScheme();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState();
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchSingleUserThumbnail().then((user) => {
      setPfp(user.imgurl);
    });
  }, []);

  return (
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
          className="mt-1 h-10 rounded-lg border border-stone-300 px-3"
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
          className="mt-1 h-10 rounded-lg border border-stone-300 px-3"
          style={{
            borderColor: DefaultColors[colorScheme].tint,
            color: DefaultColors[colorScheme].text,
          }}
          value={username}
          onChangeText={(text) => setUsername(text)}
        ></TextInput>
      </View>
      {/* Email */}
      {editPage == true && (
        <View className="mt-5 flex flex-col">
          <Text className="text-base font-semibold">Email</Text>
          <TextInput
            className="mt-1 h-10 rounded-lg border border-stone-300 px-3"
            style={{
              borderColor: DefaultColors[colorScheme].tint,
              color: DefaultColors[colorScheme].text,
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
        </View>
      )}
    </View>
  );
}
