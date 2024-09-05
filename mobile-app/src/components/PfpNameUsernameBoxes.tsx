import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import DefaultColors from "@/src/constants/DefaultColors";
import { IconCirclePlus } from "@tabler/icons-react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useColorScheme } from "nativewind";
import { useRef } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { uploadProfilePic } from "../firebase/api";

export default function ProfileCreationBoxes({
  editPage,
  formData,
  setFormData,
}: {
  editPage: boolean;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}) {
  const { colorScheme } = useColorScheme();
  const refUsernameInput = useRef<TextInput>(null);
  const refEmailInput = useRef<TextInput>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // for file types
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    handleImagePicked(result);
  };

  const handleImagePicked = async (result: ImagePicker.ImagePickerResult) => {
    try {
      if (!result.canceled) {
        // console.log(result.assets[0].uri);
        // const uploadUrl = await uploadProfilePic(result.assets[0].uri);
        setFormData({ ...formData, picture: result.assets[0].uri });
      }
    } catch (e) {
      console.error(e);
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
