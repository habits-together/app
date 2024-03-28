import { Text, View, TouchableOpacity, useColorScheme } from "react-native";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";

export default function SettingsTab() {
  let colorScheme = useColorScheme();

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const themeIcon = <Ionicons name="contrast" size={22} color={iconColor} />;
  const widgetIcon = (
    <MaterialCommunityIcons name="widgets" size={22} color={iconColor} />
  );
  const purchaseIcon = (
    <Feather name="shopping-cart" size={22} color={iconColor} />
  );
  const feedbackIcon = <Feather name="send" size={22} color={iconColor} />;
  const rateIcon = (
    <Ionicons name="sparkles-outline" size={22} color={iconColor} />
  );
  const creditsIcon = <Feather name="award" size={22} color={iconColor} />;
  const privacyIcon = (
    <MaterialIcons name="lock-outline" size={22} color={iconColor} />
  );
  const termsIcon = (
    <MaterialCommunityIcons
      name="file-document-outline"
      size={22}
      color={iconColor}
    />
  );

  return (
    <View className="flex-1 p-4 bg-stone-50 dark:bg-stone-800">
      <View className="border border-gray-200 dark:border-stone-500 rounded-xl">
        <TouchableOpacity className="flex-row items-center p-4 bg-white dark:bg-stone-700 rounded-t-xl">
          {themeIcon}
          <Text className="flex-1 pl-3 dark:text-white">Theme</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 bg-white border-gray-200 dark:border-stone-500 dark:bg-stone-700 border-y">
          {widgetIcon}
          <Text className="flex-1 pl-3 dark:text-white">Widget settings</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 bg-white dark:bg-stone-700 rounded-b-xl">
          {purchaseIcon}
          <Text className="flex-1 pl-3 dark:text-white">
            Purchase unlimited access
          </Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
      </View>

      <View className="mt-6 border border-gray-200 dark:border-stone-500 rounded-xl">
        <TouchableOpacity className="flex-row items-center p-4 bg-white dark:bg-stone-700 rounded-t-xl">
          {feedbackIcon}
          <Text className="flex-1 pl-3 dark:text-white">
            Send feedback or report a bug
          </Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 bg-white border-t border-gray-200 dark:border-stone-500 dark:bg-stone-700 rounded-b-xl">
          {rateIcon}
          <Text className="flex-1 pl-3 dark:text-white">Rate the app</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
      </View>

      <View className="mt-6 border border-gray-200 dark:border-stone-500 rounded-xl">
        <TouchableOpacity className="flex-row items-center p-4 bg-white dark:bg-stone-700 rounded-t-xl">
          {creditsIcon}
          <Text className="flex-1 pl-3 dark:text-white">Credits</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 bg-white border-gray-200 dark:border-stone-500 dark:bg-stone-700 border-y">
          {privacyIcon}
          <Text className="flex-1 pl-3 dark:text-white">Privacy policy</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 bg-white dark:bg-stone-700 rounded-b-xl">
          {termsIcon}
          <Text className="flex-1 pl-3 dark:text-white">Terms of use</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
