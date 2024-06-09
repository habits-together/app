import Icon from "@/src/components/Icon";
import {
  SettingsChoice,
  SettingsContainer,
} from "@/src/components/SettingsComponents";
import { IconBrightness, IconMoon, IconSun } from "@tabler/icons-react-native";
import { useColorScheme } from "nativewind";
import { Appearance } from "react-native";

export default function Theme() {
  const { setColorScheme } = useColorScheme();

  return (
    <SettingsContainer>
      <SettingsChoice
        settingKey="theme"
        // groupTitle={colorScheme + " // " + Appearance.getColorScheme()}
        settings={[
          {
            icon: <Icon icon={IconBrightness} />,
            title: "Match device",
            onPress: () => {
              // gets the device's color scheme
              setColorScheme(Appearance.getColorScheme() || "light");
            },
          },
          {
            icon: <Icon icon={IconSun} />,
            title: "Light",
            onPress: () => {
              setColorScheme("light");
            },
          },
          {
            icon: <Icon icon={IconMoon} />,
            title: "Dark",
            onPress: () => {
              setColorScheme("dark");
            },
          },
        ]}
        defaultSetting={0}
      />
    </SettingsContainer>
  );
}
