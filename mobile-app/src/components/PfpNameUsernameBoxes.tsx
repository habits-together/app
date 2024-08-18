import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import DefaultColors from "@/src/constants/DefaultColors";
import { IconCirclePlus } from "@tabler/icons-react-native";
import { useColorScheme } from "nativewind";
import { useRef } from "react";
import { Image, TextInput, TouchableOpacity } from "react-native";
import { userWithIdEmailT } from "../lib/db_types";

export default function ProfileCreationBoxes({
  editPage,
  formData,
  setFormData,
}: {
  editPage: boolean;
  formData: userWithIdEmailT;
  setFormData: React.Dispatch<React.SetStateAction<userWithIdEmailT>>;
}) {
  const { colorScheme } = useColorScheme();
  const refUsernameInput = useRef<TextInput>(null);
  const refEmailInput = useRef<TextInput>(null);

  return (
    <View className="mt-10 flex flex-col">
      {/* Profile Picture */}
      <TouchableOpacity
        className="h-24 w-24 self-center rounded-3xl bg-stone-400"
        onPress={() => {
          // Logic for picking picture
        }}
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
