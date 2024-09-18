/* eslint-disable react/react-in-jsx-scope */
import { Env } from '@env';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { ThemeItem } from '@/components/settings/theme-item';
import { useAuth } from '@/core';
import { FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';

export default function Settings() {
  const signOut = useAuth.use.signOut();
  // const { colorScheme } = useColorScheme();
  // const iconColor = colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];
  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 px-4 pt-16">
          <Text className="text-xl font-bold">Settings</Text>
          <ItemsContainer title="General">
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="About">
            <Item text="App Name" value={Env.NAME} />
            <Item text="Version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer title="Support Us">
            <Item
              text="Share"
              // icon={<Share color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="Rate"
              // icon={<Rate color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="Support"
              // icon={<Support color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <ItemsContainer title="Links">
            <Item text="Privacy Policy" onPress={() => {}} />
            <Item text="Terms of Service" onPress={() => {}} />
            <Item
              text="GitHub"
              // icon={<Github color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="Website"
              // icon={<Website color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <View className="my-8">
            <ItemsContainer>
              <Item text="Logout" onPress={signOut} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
