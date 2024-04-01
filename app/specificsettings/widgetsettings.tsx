import { View } from "@/components/Themed";
import Icon from "@/components/Icon";
import {
  IconMoon,
  IconSun,
  IconTool,
} from "@tabler/icons-react-native";
import { SettingsChoice, SettingsContainer } from "@/components/SettingsComponents";

export default function Widgetsettings() {
  return (
    <SettingsContainer>
      <SettingsChoice
        groupTitle="Small Widget Theme"
        settingKey="smallWidgetTheme"
        settings={[
          {
            icon: <Icon icon={IconTool} />,
            title: "System",
            onPress: () => {},
          },
          {
            icon: <Icon icon={IconSun} />,
            title: "Light",
            onPress: () => {},
          },
          {
            icon: <Icon icon={IconMoon} />,
            title: "Dark",
            onPress: () => {},
          },
        ]}
        defaultSetting={0}
      />
      <SettingsChoice
        groupTitle="Medium Widget Theme"
        settingKey="mediumWidgetTheme"
        settings={[
          {
            icon: <Icon icon={IconTool} />,
            title: "System",
            onPress: () => {},
          },
          {
            icon: <Icon icon={IconSun} />,
            title: "Light",
            onPress: () => {},
          },
          {
            icon: <Icon icon={IconMoon} />,
            title: "Dark",
            onPress: () => {},
          },
        ]}
        defaultSetting={0}
      />
    </SettingsContainer>
  );
}
