import { Text, View, TouchableOpacity, useColorScheme } from "react-native";
import {
  IconAward,
  IconCategory2,
  IconChevronRight,
  IconFileText,
  IconLock,
  IconPremiumRights,
  IconSend,
  IconSparkles,
  IconSun,
} from "@tabler/icons-react-native";
import colors from "@/constants/colors";

export default function SettingsTab() {
  let colorScheme = useColorScheme();

  const iconProps = {
    size: 24,
    color: colorScheme === "dark" ? colors.white : colors.black,
    strokeWidth: 2,
  };

  function Chevron() {
    return (
      <IconChevronRight size={24} color={colors.grey["400"]} strokeWidth={2} />
    );
  }

  return (
    <View className="flex-1 p-4 bg-white dark:bg-stone-base">
      <View className="border border-grey-200 rounded-xl">
        <TouchableOpacity className="flex-row items-center p-4 bg-white dark:bg-grey-800 dark:border-stone-light rounded-t-xl">
          <IconSun {...iconProps} />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            className="flex-1 pl-2 text-base font-medium dark:text-white"
          >
            Theme
          </Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 bg-white dark:bg-grey-800 dark:border-stone-light border-y border-grey-200">
          <IconCategory2 {...iconProps} />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            className="flex-1 pl-2 text-base font-medium dark:text-white"
          >
            Widget settings
          </Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 bg-white dark:bg-grey-800 dark:border-stone-light rounded-b-xl">
          <IconPremiumRights {...iconProps} />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            className="flex-1 pl-2 text-base font-medium dark:text-white"
          >
            Purchase unlimited access
          </Text>
          <Chevron />
        </TouchableOpacity>
      </View>

      <View className="mt-6 border border-grey-200 rounded-xl">
        <TouchableOpacity className="flex-row items-center p-4 bg-white dark:bg-grey-800 dark:border-stone-light rounded-t-xl">
          <IconSend {...iconProps} />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            className="flex-1 pl-2 text-base font-medium dark:text-white"
          >
            Send feedback or report a bug
          </Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 bg-white border-t dark:bg-grey-800 dark:border-stone-light border-grey-200 rounded-b-xl">
          <IconSparkles {...iconProps} />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            className="flex-1 pl-2 text-base font-medium dark:text-white"
          >
            Rate the app
          </Text>
          <Chevron />
        </TouchableOpacity>
      </View>

      <View className="mt-6 border border-grey-200 rounded-xl">
        <TouchableOpacity className="flex-row items-center p-4 bg-white dark:bg-grey-800 dark:border-stone-light rounded-t-xl">
          <IconAward {...iconProps} />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            className="flex-1 pl-2 text-base font-medium dark:text-white"
          >
            Credits
          </Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 bg-white dark:bg-grey-800 dark:border-stone-light border-y border-grey-200">
          <IconLock {...iconProps} />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            className="flex-1 pl-2 text-base font-medium dark:text-white"
          >
            Privacy policy
          </Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 bg-white dark:bg-grey-800 dark:border-stone-light rounded-b-xl">
          <IconFileText {...iconProps} />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            className="flex-1 pl-2 text-base font-medium dark:text-white"
          >
            Terms of use
          </Text>
          <Chevron />
        </TouchableOpacity>
      </View>
    </View>
  );
}
