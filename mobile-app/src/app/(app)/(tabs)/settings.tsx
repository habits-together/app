import Icon from "@/src/components/Icon";
import {
  SettingsContainer,
  SettingsList,
} from "@/src/components/SettingsComponents";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
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
  IconUserPlus,
} from "@tabler/icons-react-native";
import { router } from "expo-router";

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
              router.push("/(auth)");
            },
          },
          {
            icon: <Icon icon={IconUserPlus} />,
            title: "Create account",
            onPress: () => {
              resetNavigationStack("/(auth)/createprofile");
            },
          },
          {
            icon: <Icon icon={IconUserPlus} />,
            title: "Edit profile",
            onPress: () => {
              router.push("/modals/editprofile");
            },
          },
        ]}
      />
    </SettingsContainer>
  );
}
