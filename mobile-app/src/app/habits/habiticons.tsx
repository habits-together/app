import { tempIconAtom } from "@/src/components/CreateOrEditHabit";
import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import { IconChevronLeft } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { FlatList, TouchableOpacity } from "react-native";
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
  const [icon, setIcon] = useAtom(tempIconAtom);

  const renderItem = ({ item }: { item: HabitIconsTuple }) => {
    const [section, keys] = item;
    return (
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{section}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {keys.map((key) => (
            <View style={{ marginRight: 10, marginTop: 10 }} key={key}>
              <IconButton
                icon={iconStrNameToTablerIcon(key)}
                onPress={() => {
                  setIcon(key);
                  router.back();
                }}
                selected={icon === key}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 55 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          style={{
            position: "absolute",
            left: -1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
          }}
        >
          <Icon icon={IconChevronLeft} size={20} />
          <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: "bold" }}>
            Back
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select Icon</Text>
      </View>

      {/* Content */}
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item[0]} // Assuming the first element in the tuple is unique
      />
    </View>
  );
}
