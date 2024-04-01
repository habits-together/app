import { View } from "@/components/Themed";
import { Appearance } from "react-native";
import {
  IconMoon,
  IconSun,
  IconTool,
} from "@tabler/icons-react-native";
import Icon from "@/components/Icon";
import { SettingsChoice, SettingsContainer } from "@/components/SettingsComponents";

export default function Theme() {
  return (
    <SettingsContainer>
      <SettingsChoice
        settingKey="theme"
        settings={[
          {
            icon: <Icon icon={IconTool} />,
            title: "System",
            onPress: () => {
              Appearance.setColorScheme(null);
            },
          },
          {
            icon: <Icon icon={IconSun} />,
            title: "Light",
            onPress: () => {
              Appearance.setColorScheme("light");
            },
          },
          {
            icon: <Icon icon={IconMoon} />,
            title: "Dark",
            onPress: () => {
              Appearance.setColorScheme("dark");
            },
          },
        ]}
        defaultSetting={0}
      />
    </SettingsContainer>
  );
}

