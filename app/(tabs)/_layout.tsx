import React from 'react';
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
          height: 100,
          backgroundColor: "#FAFAF9",
          borderBottomWidth: 0,
          shadowOpacity: 0,
          elevation: 0, 
        },
        headerTitleStyle: {
          paddingTop: 20,
          fontSize: 32,
          textAlign: 'left',
          fontWeight: '700'
        },
        tabBarStyle: {
          backgroundColor: "#F5F5F4",
          height: 73,
          paddingTop: 12
        },
        tabBarLabelStyle: {
          paddingBottom: 14
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
