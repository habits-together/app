import { Text, View } from "@/src/components/Themed";
import { IconContext } from "./_layout";
import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import DefaultColors from "@/src/constants/DefaultColors";
import { router } from "expo-router";
import Icon from "@/src/components/Icon";
import { IconChevronLeft } from "@tabler/icons-react-native";

export default function HabitIcons() {
  const { colorScheme } = useColorScheme();
  const borderColor = DefaultColors[colorScheme].tint;
  const { icon, setIcon } = useContext(IconContext);

  return (
    <View className="flex-1 flex flex-col pt-12 px-5 gap-y-5">
      {/* Header */}
      <View className="relative flex flex-row justify-center items-center">
        <TouchableOpacity className="absolute -left-1 px-2 py-1 flex flex-row items-center justify-center"
          onPress={() => {
            router.back();
          }}>
          <Icon icon={IconChevronLeft} size={20} />
          <Text className="font-semibold text-base ml-1">Back</Text>
        </TouchableOpacity>
        <Text className="text-base font-semibold">Select Icon</Text>
      </View>
      <View>
        <Text className="text-base font-semibold">Health & Fitness</Text>
      </View>
      <View>
        <Text className="text-base font-semibold">Productivity & Work</Text>
      </View>
      <View>
        <Text className="text-base font-semibold">Personal Development</Text>
      </View>
      <View>
        <Text className="text-base font-semibold">Leisure & Recreation</Text>
      </View>
      <View>
        <Text className="text-base font-semibold">Social & Family</Text>
      </View>
      <View>
        <Text className="text-base font-semibold">Mindfullness & Spirituality</Text>
      </View>
      <View>
        <Text className="text-base font-semibold">Financial</Text>
      </View>
    </View>
  );
}
