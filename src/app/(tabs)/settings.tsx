/* eslint-disable react/react-in-jsx-scope */
import { Env } from '@env';
import { useState } from 'react';
import { Linking } from 'react-native';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { ThemeItem } from '@/components/settings/theme-item';
import { useAuth } from '@/core';
import { Button, Header, ScreenContainer, ScrollView, View } from '@/ui';

export default function Settings() {
  const signOut = useAuth.use.signOut();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <ScreenContainer>
      <Header title="Settings" />

      <ScrollView>
        <View className="flex-1">
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
              onPress={() => {
                alert('todo');
              }}
            />
            <Item
              text="Rate"
              // icon={<Rate color={iconColor} />}
              onPress={() => {
                alert('todo');
              }}
            />
            <Item
              text="Support"
              // icon={<Support color={iconColor} />}
              onPress={() => {
                alert('todo');
              }}
            />
          </ItemsContainer>

          <ItemsContainer title="Links">
            <Item
              text="Privacy Policy"
              onPress={() => {
                alert('todo');
              }}
            />
            <Item
              text="Terms of Service"
              onPress={() => {
                alert('todo');
              }}
            />
            <Item
              text="GitHub"
              // icon={<Github color={iconColor} />}
              onPress={() => {
                Linking.openURL(
                  'https://github.com/owengretzinger/habits-together',
                );
              }}
            />
            <Item
              text="Website"
              // icon={<Website color={iconColor} />}
              onPress={() => {
                Linking.openURL('https://habitstogether.app');
              }}
            />
          </ItemsContainer>

          <View className="my-8">
            <Button
              label="Logout"
              onPress={handleLogout}
              loading={isLoggingOut}
              variant="item"
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
