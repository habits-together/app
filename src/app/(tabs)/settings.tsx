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
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { router } from "expo-router";
import {
  SettingsContainer,
  SettingsList,
} from "@/src/components/SettingsComponents";
import Icon from "@/src/components/Icon";

export default function Settings() {
  return (
    <SettingsContainer>
      <SettingsList
        settings={[
          {
            icon: <Icon icon={IconSun} />,
            title: "Theme",
            onPress: () => {
              router.push("/specificsettings/theme");
            },
          },
          {
            icon: <Icon icon={IconCategory2} />,
            title: "Widget settings",
            onPress: () => {
              router.push("/specificsettings/widgetsettings");
            },
          },
          {
            icon: <Icon icon={IconPremiumRights} />,
            title: "Purchase unlimited access",
            onPress: () => {},
          },
        ]}
      />
      <SettingsList
        settings={[
          {
            icon: <Icon icon={IconSend} />,
            title: "Send feedback or report a bug",
            onPress: () => {},
          },

          {
            icon: <Icon icon={IconSparkles} />,
            title: "Rate the app",
            onPress: () => {},
          },
        ]}
      />
      <SettingsList
        settings={[
          {
            icon: <Icon icon={IconAward} />,
            title: "Credits",
            onPress: () => {},
          },

          {
            icon: <Icon icon={IconLock} />,
            title: "Privacy policy",
            onPress: () => {},
          },

          {
            icon: <Icon icon={IconFileText} />,
            title: "Terms of use",
            onPress: () => {},
          },
        ]}
      />
      <SettingsList
        settings={[
          {
            icon: <Icon icon={IconKey} />,
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
