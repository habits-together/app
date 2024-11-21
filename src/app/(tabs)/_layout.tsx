/* eslint-disable react/no-unstable-nested-components */

import { Redirect, SplashScreen, Tabs } from 'expo-router';
import { Bell, Layers, Settings, Users } from 'lucide-react-native';
import React, { useCallback, useEffect } from 'react';

import { useAuth, useIsFirstTime } from '@/core';
import { useThemeConfig } from '@/core/use-theme-config';
import { LucideIcon } from '@/ui/lucide-icon';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  const theme = useThemeConfig();

  if (isFirstTime) {
    return <Redirect href="/auth/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/auth" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.text,
        tabBarStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Habits',
          tabBarIcon: ({ color }) => <LucideIcon Icon={Layers} color={color} />,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => <LucideIcon Icon={Users} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <LucideIcon Icon={Bell} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <LucideIcon Icon={Settings} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
