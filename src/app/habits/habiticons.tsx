import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import DefaultColors from "@/src/constants/DefaultColors";
import { IconChevronLeft } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useContext, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { IconContext } from "./_layout";
import { IconButton } from "./icon-button";
import { icons } from "./icons";

type HabitIconsTuple = [string, string[]];

export default function HabitIcons() {
  const { colorScheme } = useColorScheme();
  const borderColor = DefaultColors[colorScheme].tint;
  const { icon, setIcon } = useContext(IconContext);

  const habitIcons: HabitIconsTuple[] = useMemo(() => {
    return [
      ["Health & Fitness", ["gym", "yoga", "healthyEating"]],
      ["Productivity & Work", ["work", "timeManagement", "scheduling"]],
      ["Personal Development", ["learning", "ideas", "careerAdvancement"]],
      ["Leisure & Recreation", ["painting", "music", "photography"]],
      ["Social & Family", ["socializing", "love", "familyTime"]],
      [
        "Mindfullness & Spirituality",
        ["meditation", "religion", "spirituality"],
      ],
      ["Financial", ["saving", "spending", "investing"]],
    ];
  }, []);

    return (
    <View className="flex flex-1 flex-col gap-y-5 px-5 pt-12">
      {/* Header */}
      <View className="relative flex flex-row items-center justify-center">
        <TouchableOpacity
          className="absolute -left-1 flex flex-row items-center justify-center px-2 py-1"
          onPress={() => {
            router.back();
          }}
        >
          <Icon icon={IconChevronLeft} size={20} />
          <Text className="ml-1 text-base font-semibold">Back</Text>
        </TouchableOpacity>
        <Text className="text-base font-semibold">Select Icon</Text>
      </View>
      {habitIcons.map((item: HabitIconsTuple) => {
        const [section, keys] = item;
        return (
          <View key={section}>
            <Text className="text-base font-semibold">{section}</Text>
            <View className="flex flex-row">
              {keys.map((key) => {
                return (
                  <View className="mr-2 mt-2" key={key}>
                    <IconButton
                      icon={icons[key]}
                      onPress={() => {
                        setIcon(key);
                        router.back();
                      }}
                      selected={icon === key}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}