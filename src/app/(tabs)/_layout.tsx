/* eslint-disable react/no-unstable-nested-components */
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import { Bell, Layers, Settings, Users } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';

import {
  checkIfUserExistsInFirestore,
  useAuth,
  useIsFirstTime,
  useThemeConfig,
} from '@/core';
import { LucideIcon } from '@/ui/lucide-icon';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const [userExists, setUserExists] = useState<boolean | null>(null);
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

  useEffect(() => {
    if (status === 'signIn') {
      checkIfUserExistsInFirestore().then(setUserExists);
    }
  }, [status]);

  const theme = useThemeConfig();

  if (isFirstTime) {
    return <Redirect href="/auth/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/auth" />;
  }

  // we only redirect when userExists is not null (we have acc checked and set the value)
  if (status === 'signIn' && userExists === false) {
    return <Redirect href="/auth/create-profile" />;
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
