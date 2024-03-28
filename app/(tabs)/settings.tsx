import { Text, View, TouchableOpacity } from "react-native";
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
} from "tabler-react-native/icons";
import colors from "@/constants/colors";

export default function SettingsTab() {
  const iconProps = {
    size: 24,
    color: colors.black,
    stroke: 2,
  };

  function Chevron() {
    return <IconChevronRight size={24} color={colors.grey["400"]} stroke={2} />;
  }

  return (
    <View className="flex-1 bg-stone-50 p-4 stroke-blue-500">
      <View className="border border-gray-200 rounded-xl">
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-t-xl">
          <IconSun {...iconProps} />
          <Text className="flex-1 pl-2 text-base font-medium">Theme</Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 border-y border-gray-200">
          <IconCategory2 {...iconProps} />
          <Text className="flex-1 pl-2 text-base font-medium">
            Widget settings
          </Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-b-xl">
          <IconPremiumRights {...iconProps} />
          <Text className="flex-1 pl-2 text-base font-medium">
            Purchase unlimited access
          </Text>
          <Chevron />
        </TouchableOpacity>
      </View>

      <View className="mt-6 border border-gray-200 rounded-xl">
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-t-xl">
          <IconSend {...iconProps} />
          <Text className="flex-1 pl-2 text-base font-medium">
            Send feedback or report a bug
          </Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 border-t border-gray-200 rounded-b-xl">
          <IconSparkles {...iconProps} />
          <Text className="flex-1 pl-2 text-base font-medium">
            Rate the app
          </Text>
          <Chevron />
        </TouchableOpacity>
      </View>

      <View className="mt-6 border border-gray-200 rounded-xl">
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-t-xl">
          <IconAward {...iconProps} />
          <Text className="flex-1 pl-2 text-base font-medium">Credits</Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 border-y border-gray-200">
          <IconLock {...iconProps} />
          <Text className="flex-1 pl-2 text-base font-medium">
            Privacy policy
          </Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-b-xl">
          <IconFileText {...iconProps} />
          <Text className="flex-1 pl-2 text-base font-medium">
            Terms of use
          </Text>
          <Chevron />
        </TouchableOpacity>
      </View>
    </View>
  );
}
