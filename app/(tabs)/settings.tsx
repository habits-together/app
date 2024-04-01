import { useColorScheme, ScrollView } from "react-native";
import {
  IconAward,
  IconCategory2,
  IconFileText,
  IconKey,
  IconLock,
  IconPremiumRights,
  IconSend,
  IconSparkles,
  IconSun,
} from "@tabler/icons-react-native";
import colors from "@/constants/colors";
import { resetNavigationStack } from "@/lib/resetNavigationStack";
import { router } from "expo-router";
import {
  SettingsContainer,
  SettingsList,
} from "@/components/SettingsComponents";

export default function Settings() {
  let colorScheme = useColorScheme();
  const iconProps = {
    size: 24,
    color: colorScheme === "dark" ? colors.white : colors.black,
    strokeWidth: 2,
  };

  return (
    <SettingsContainer>
      <SettingsList
        settings={[
          {
            icon: <IconSun {...iconProps} />,
            title: "Theme",
            onPress: () => {
              router.push("/specificsettings/theme");
            },
          },
          {
            icon: <IconCategory2 {...iconProps} />,
            title: "Widget settings",
            onPress: () => {
              router.push("/specificsettings/widgetsettings");
            },
          },
          {
            icon: <IconPremiumRights {...iconProps} />,
            title: "Purchase unlimited access",
            onPress: () => {},
          },
        ]}
      />
      <SettingsList
        settings={[
          {
            icon: <IconSend {...iconProps} />,
            title: "Send feedback or report a bug",
            onPress: () => {},
          },

          {
            icon: <IconSparkles {...iconProps} />,
            title: "Rate the app",
            onPress: () => {},
          },
        ]}
      />
      <SettingsList
        settings={[
          {
            icon: <IconAward {...iconProps} />,
            title: "Credits",
            onPress: () => {},
          },

          {
            icon: <IconLock {...iconProps} />,
            title: "Privacy policy",
            onPress: () => {},
          },

          {
            icon: <IconFileText {...iconProps} />,
            title: "Terms of use",
            onPress: () => {},
          },
        ]}
      />
      <SettingsList
        settings={[
          {
            icon: <IconKey {...iconProps} />,
            title: "Go to sign in",
            onPress: () => {
              resetNavigationStack("/(auth)/signin");
            },
          },
        ]}
      />
    </SettingsContainer>
  );
}
