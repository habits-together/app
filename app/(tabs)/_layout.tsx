import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Feather, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          height: 110,
          backgroundColor: "#FAFAF9",
          borderBottomWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontSize: 32,
          fontWeight: '700'
        },
        tabBarStyle: {
          backgroundColor: "#F5F5F4",
          height: Platform.select({ ios: 90, android: 75 }),
          paddingTop: Platform.select({ ios: 12, android: 10 }),
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          textAlign: 'center',
          paddingBottom: Platform.select({ ios: 0, android: 17 }),
          fontWeight: '600'
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Habits',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="layers-outline" color={color} size={24} />
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => <Octicons name="people" color={color} size={24} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Feather name="settings" color={color} size={24} />
        }}

      />
    </Tabs>
  );
}
