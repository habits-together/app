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
import Divider from "@/components/Divider";

export default function SettingsTab() {
  let colorScheme = useColorScheme();

  const iconProps = {
    size: 24,
    color: colorScheme === "dark" ? colors.white : colors.black,
    strokeWidth: 2,
  };

  return (
    <View className="flex-1 p-4 bg-grey-50 dark:bg-black">
      <Section
        settings={[
          <Setting
            icon={<IconSun {...iconProps} />}
            title="Theme"
            onPress={() => {}}
          />,
          <Setting
            icon={<IconCategory2 {...iconProps} />}
            title="Widget settings"
            onPress={() => {}}
          />,
          <Setting
            icon={<IconPremiumRights {...iconProps} />}
            title="Purchase unlimited access"
            onPress={() => {}}
          />,
        ]}
      />
      <Section
        addMargin={true}
        settings={[
          <Setting
            icon={<IconSend {...iconProps} />}
            title="Send feedback or report a bug"
            onPress={() => {}}
          />,
          <Setting
            icon={<IconSparkles {...iconProps} />}
            title="Rate the app"
            onPress={() => {}}
          />,
        ]}
      />
      <Section
        addMargin={true}
        settings={[
          <Setting
            icon={<IconAward {...iconProps} />}
            title="Credits"
            onPress={() => {}}
          />,
          <Setting
            icon={<IconLock {...iconProps} />}
            title="Privacy policy"
            onPress={() => {}}
          />,
          <Setting
            icon={<IconFileText {...iconProps} />}
            title="Terms of use"
            onPress={() => {}}
          />,
        ]}
      />
    </View>
  );
}

function Section({
  settings,
  addMargin = false,
}: {
  settings: React.ReactNode[];
  addMargin?: boolean;
}) {
  return (
    <View
      className={`border border-grey-200 rounded-xl overflow-hidden ${
        addMargin && "mt-6"
      }`}
    >
      {/* settings with Divider in between each one */}
      {settings.map((setting, index) => (
        <View key={index}>
          {setting}
          {index < settings.length - 1 && <Divider />}
        </View>
      ))}
    </View>
  );
}

function Setting({
  icon,
  title,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center p-4 bg-white dark:bg-grey-800"
    >
      {icon}
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        className="flex-1 pl-2 text-base font-medium dark:text-white"
      >
        {title}
      </Text>
      <Chevron />
    </TouchableOpacity>
  );
}

function Chevron() {
  return (
    <IconChevronRight size={24} color={colors.grey["400"]} strokeWidth={2} />
  );
}
