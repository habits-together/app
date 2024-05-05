import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import DefaultColors from "@/src/constants/DefaultColors";
import { IconArrowForwardUp, IconX } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";

export default function Createhabit({ habitid }: { habitid: String }) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex-1 flex flex-col pt-12 px-5 gap-y-5">
      {/* Header */}
      <View className="flex flex-row justify-between items-center">
        <TouchableOpacity className="w-28 border rounded-2xl px-2 py-1 flex flex-row items-center justify-center"
          style={{
            borderColor: DefaultColors[colorScheme].tint
          }}
          onPress={() => {
            router.back();
          }}>
          <Icon icon={IconX} />
          <Text className="font-semibold text-base ml-1">Cancel</Text>
        </TouchableOpacity>
        <Text className="text-base font-semibold">
          {habitid ? 'Edit' : 'New'} habit
        </Text>
        <TouchableOpacity className="w-28 border rounded-2xl px-2 py-1 flex flex-row items-center justify-center"
          style={{
            borderColor: DefaultColors[colorScheme].tint
          }}
          onPress={() => {
            alert('create/edit habit');
          }}>
          <Icon icon={IconArrowForwardUp} />
          <Text className="font-semibold text-base ml-1">Next</Text>
        </TouchableOpacity>
      </View>

      {/* Icon & Name */}
      <View className="">
        <Text className="text-base font-semibold">Icon & Name</Text>
      </View>
      {/* Description */}
      <View className="">
        <Text className="text-base font-semibold">Description (optional)</Text>
      </View>
      {/* Colour */}
      <View className="">
        <Text className="text-base font-semibold">Color</Text>
      </View>
      {/* Goal */}
      <View className="">
        <Text className="text-base font-semibold">Goal</Text>
      </View>
    </View>
  );
}
