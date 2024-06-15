import { tempIconAtom } from "@/src/components/CreateOrEditHabit";
import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import { IconChevronLeft } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { IconButton } from "./icon-button";
import { iconStrNameToTablerIcon } from "./icons";

type HabitIconsTuple = [string, string[]];

export default function HabitIcons() {
  const [icon, setIcon] = useAtom(tempIconAtom);

  const habitIcons: HabitIconsTuple[] = useMemo(() => {
    return [
      ["Health & Fitness", ["barbell", "yoga", "leaf"]],
      ["Productivity & Work", ["deviceLaptop", "clock", "calendar"]],
      ["Personal Development", ["brain", "bulb", "ladder"]],
      ["Leisure & Recreation", ["brush", "music", "camera"]],
      ["Social & Family", ["usersGroup", "heart", "home"]],
      ["Mindfullness & Spirituality", ["peace", "buildingChurch", "flower"]],
      ["Financial", ["buildingBank", "wallet", "chartLine"]],
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
                      icon={iconStrNameToTablerIcon(key)}
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
