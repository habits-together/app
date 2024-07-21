import Divider from "@/src/components/Divider";
import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import colors from "@/src/constants/colors";
import {
  IconChevronRight,
  IconCircle,
  IconCircleCheck,
} from "@tabler/icons-react-native";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { settingAtom } from "../atoms/atoms";
import { useAtom } from "jotai";

export function SettingsContainer({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView
      className="flex-1 bg-stone-50 p-4 dark:bg-stone-base"
      contentContainerStyle={{ paddingBottom: 10 }}
    >
      {children}
    </ScrollView>
  );
}

export type SettingProps = {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
};

export function SettingsList({
  groupTitle,
  settings,
}: {
  groupTitle?: string;
  settings: SettingProps[];
}) {
  return (
    <SettingsSection
      groupTitle={groupTitle}
      settingComponents={settings.map((setting) => (
        <Setting
          {...setting}
          rightSideContent={
            <Icon
              icon={IconChevronRight}
              lightColor={colors.grey["400"]}
              darkColor={colors.grey["400"]}
            />
          }
        />
      ))}
    />
  );
}

export function SettingsChoice({
  groupTitle,
  settingKey,
  settings,
  defaultSetting,
}: {
  groupTitle?: string;
  settingKey: string;
  settings: SettingProps[];
  defaultSetting: number;
}) {
  const [selected, setSelected] = useState(defaultSetting);
  const [setting, setSetting] = useAtom(settingAtom(settingKey));

  useEffect(() => {
    if (setting) {
      setSelected(parseInt(setting));
    }
  });

  function changeSetting(index: number) {
    setSelected(index);
    setSetting(index.toString());
  }

  return (
    <SettingsSection
      groupTitle={groupTitle}
      settingComponents={settings.map((setting, index) => (
        <Setting
          {...setting}
          onPress={() => {
            changeSetting(index);
            setting.onPress();
          }}
          rightSideContent={
            selected === index ? (
              <Icon icon={IconCircleCheck} />
            ) : (
              <Icon icon={IconCircle} />
            )
          }
        />
      ))}
    />
  );
}

function SettingsSection({
  groupTitle,
  settingComponents,
}: {
  groupTitle?: string;
  settingComponents: React.ReactNode[];
}) {
  return (
    <>
      {groupTitle && (
        <Text className="mb-2 ml-3 text-sm font-semibold text-stone-500 dark:text-stone-300">
          {groupTitle}
        </Text>
      )}
      <View
        className={`mb-6 overflow-hidden rounded-xl border border-grey-200`}
      >
        {/* settings with Divider in between each one */}
        {settingComponents.map((setting, index) => (
          <View key={index}>
            {setting}
            {index < settingComponents.length - 1 && <Divider />}
          </View>
        ))}
      </View>
    </>
  );
}

function Setting({
  icon,
  title,
  onPress,
  rightSideContent,
}: SettingProps & { rightSideContent: React.ReactNode }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-white p-4 dark:bg-grey-800"
    >
      {icon}
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        className="flex-1 pl-2 text-base font-medium dark:text-white"
      >
        {title}
      </Text>
      {rightSideContent}
    </TouchableOpacity>
  );
}
