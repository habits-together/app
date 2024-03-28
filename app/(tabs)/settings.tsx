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
} from '@tabler/icons-react-native';
import colors from "@/constants/colors";

export default function SettingsTab() {
  const iconProps = {
    size: 24,
    color: colors.black,
    strokeWidth: 2,
  };

  function Chevron() {
    return <IconChevronRight size={24} color={colors.grey["400"]} strokeWidth={2} />;
  }

  return (
    <View className="flex-1 bg-grey-50 p-4">
      <View className="border border-grey-200 rounded-xl">
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-t-xl">
          <IconSun {...iconProps} />
          <Text numberOfLines={1} adjustsFontSizeToFit={true} className="flex-1 pl-2 text-base font-medium">Theme</Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 border-y border-grey-200">
          <IconCategory2 {...iconProps} />
          <Text numberOfLines={1} adjustsFontSizeToFit={true} className="flex-1 pl-2 text-base font-medium">
            Widget settings
          </Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-b-xl">
          <IconPremiumRights {...iconProps} />
          <Text numberOfLines={1} adjustsFontSizeToFit={true} className="flex-1 pl-2 text-base font-medium">
            Purchase unlimited access
          </Text>
          <Chevron />
        </TouchableOpacity>
      </View>

      <View className="mt-6 border border-grey-200 rounded-xl">
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-t-xl">
          <IconSend {...iconProps} />
          <Text numberOfLines={1} adjustsFontSizeToFit={true} className="flex-1 pl-2 text-base font-medium">
            Send feedback or report a bug
          </Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 border-t border-grey-200 rounded-b-xl">
          <IconSparkles {...iconProps} />
          <Text numberOfLines={1} adjustsFontSizeToFit={true} className="flex-1 pl-2 text-base font-medium">
            Rate the app
          </Text>
          <Chevron />
        </TouchableOpacity>
      </View>

      <View className="mt-6 border border-grey-200 rounded-xl">
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-t-xl">
          <IconAward {...iconProps} />
          <Text numberOfLines={1} adjustsFontSizeToFit={true} className="flex-1 pl-2 text-base font-medium">Credits</Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 border-y border-grey-200">
          <IconLock {...iconProps} />
          <Text numberOfLines={1} adjustsFontSizeToFit={true} className="flex-1 pl-2 text-base font-medium">
            Privacy policy
          </Text>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-b-xl">
          <IconFileText {...iconProps} />
          <Text numberOfLines={1} adjustsFontSizeToFit={true} className="flex-1 pl-2 text-base font-medium">
            Terms of use
          </Text>
          <Chevron />
        </TouchableOpacity>
      </View>
    </View>
  );
}
