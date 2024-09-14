import { createOrEditHabitFormAtom } from "@/src/atoms/atoms";
import { Text, View } from "@/src/components/Themed";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { FlatList } from "react-native";
import { IconButton } from "./icon-button";
import { iconStrNameToTablerIcon } from "./icons";

type HabitIconsTuple = [string, string[]];

const categories: HabitIconsTuple[] = [
  [
    "Health & Fitness",
    [
      "barbell",
      "yoga",
      "walk",
      "run",
      "swimming",
      "bike",
      "bed",
      "leaf",
      "bottle",
      "salad",
      "apple",
      "activity",
      "heartbeat",
      "AdjustmentsHeart",
    ],
  ],
  [
    "Productivity & Work",
    [
      "deviceLaptop",
      "clock",
      "calendar",
      "briefcase",
      "edit",
      "chartDots3",
      "mail",
      "table",
      "deviceDesktop",
      "fileText",
      "boxMultiple",
      "checklist",
      "buildingEstate",
      "moodEdit",
    ],
  ],
  [
    "Personal Development",
    [
      "brain",
      "bulb",
      "ladder",
      "school",
      "deviceMobileOff",
      "code",
      "language",
      "microscope",
      "certificate",
      "books",
      "listSearch",
      "jewishStar",
      "trendingUp",
      "chartArrowsVertical",
    ],
  ],
  [
    "Leisure & Recreation",
    [
      "brush",
      "music",
      "camera",
      "book",
      "chess",
      "headphones",
      "deviceGamepad2",
      "movie",
      "beach",
      "tent",
      "fishHook",
      "chefHat",
      "rollerSkating",
      "video",
      "ballBasketball",
      "ballVolleyball",
      "ballTennis",
      "ballBaseball",
      "ballAmericanFootball",
      "ballFootball",
      "pingPong",
    ],
  ],
  [
    "Social & Family",
    [
      "usersGroup",
      "users",
      "userHeart",
      "moodHeart",
      "moodCrazyHappy",
      "heart",
      "hearts",
      "heartHandshake",
      "home",
      "homeHeart",
      "messageChatbot",
      "messages",
      "worldHeart",
      "confetti",
    ],
  ],
  [
    "Mindfullness & Spirituality",
    [
      "peace",
      "buildingChurch",
      "window",
      "flower",
      "michelinStar",
      "planet",
      "empathize",
      "plant2",
      "plant",
      "trees",
      "hourglass",
      "scale",
      "yinYang",
      "moon2",
    ],
  ],
  [
    "Financial",
    [
      "buildingBank",
      "wallet",
      "chartLine",
      "reportMoney",
      "databaseDollar",
      "coin",
      "coins",
      "pigMoney",
      "homeStats",
      "zoomMoney",
      "devicesDollar",
      "deviceAnalytics",
      "shoppingCartDollar",
      "moodDollar",
    ],
  ],
];

export default function HabitIcons() {
  const [form, setForm] = useAtom(createOrEditHabitFormAtom);
  const habitIcons: HabitIconsTuple[] = useMemo(() => {
    return categories;
  }, []);
  const renderItem = ({ item }: { item: HabitIconsTuple }) => {
    const [section, keys] = item;
    return (
      <View className="mb-5" key={section}>
        <Text className="text-base font-semibold">{section}</Text>
        <View className="flex-row flex-wrap">
          {keys.map((key) => (
            <View className="mr-2 mt-2" key={key}>
              <IconButton
                icon={iconStrNameToTablerIcon(key)}
                onPress={() => {
                  setForm((prev) => ({ ...prev, icon: key }));
                  router.back();
                }}
                selected={form.icon === key}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View className="flex flex-1 flex-col gap-y-5 px-5 pt-1">
      {/* Content */}
      <FlatList
        data={habitIcons}
        renderItem={renderItem}
        keyExtractor={(item) => item[0]}
      />
    </View>
  );
}
