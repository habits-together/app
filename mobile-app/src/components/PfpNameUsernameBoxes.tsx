import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import DefaultColors from "@/src/constants/DefaultColors";
import { IconCirclePlus } from "@tabler/icons-react-native";
import { Image } from "expo-image";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useColorScheme } from "nativewind";
import { useRef } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { ProfileFormData } from "../lib/db_types";

export default function ProfileCreationBoxes({
  editPage,
  formData,
  setFormData,
}: {
  editPage: boolean;
  formData: ProfileFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
}) {
  const { colorScheme } = useColorScheme();
  const refUsernameInput = useRef<TextInput>(null);
  const refEmailInput = useRef<TextInput>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // for file types
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const picUrl = result.assets[0].uri;
      // resize the image
      const resizedPic = await manipulateAsync(
        picUrl,
        [{ resize: { height: 72, width: 72 } }],
        { format: SaveFormat.JPEG },
      );
      setFormData({ ...formData, picture: resizedPic.uri });
    }
  };

  return (
    <View className="mt-10 flex flex-col">
      {/* Profile Picture */}
      <TouchableOpacity
        className="h-24 w-24 self-center rounded-3xl bg-stone-400"
        onPress={pickImage}
      >
        {formData.picture && (
          <Image
            className="h-24 w-24 rounded-3xl"
            source={{ uri: formData.picture }}
          />
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
          value={formData.displayName}
          onChangeText={(text) =>
            setFormData({ ...formData, displayName: text })
          }
          onSubmitEditing={() => {
            refUsernameInput.current?.focus();
          }}
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
          ref={refUsernameInput}
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          onSubmitEditing={() => {
            refEmailInput.current?.focus();
          }}
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
            ref={refEmailInput}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          ></TextInput>
        </View>
      )}
    </View>
  );
}
