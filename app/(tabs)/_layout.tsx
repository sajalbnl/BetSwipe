import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { COLORS } from '../../src/constants/colors';
import { Image } from 'react-native';

// Tab bar icons
const TabBarIcon = ({ name, color }: { name: string; color: string }) => {
  const icons: Record<string, any> = {
    market: require('../../assets/markets.png'),
    portfolio: require('../../assets/portfolio.png'),
    search: require('../../assets/search.png'),
    profile: require('../../assets/profile.png'),
  };
  
  return (
    <Image source={icons[name]} 
      style={{ 
        width: 24, 
        height: 24,
        tintColor: color  
      }}/>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.navbarActive,
        tabBarInactiveTintColor: COLORS.navbarInactive,
        tabBarStyle: {
          backgroundColor: COLORS.navbarBackground,
          borderTopColor: COLORS.border,
          height: 85,
          paddingBottom: 25,
          paddingTop: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Markets',
          tabBarIcon: ({ color }) => <TabBarIcon name="market" color={color} />,
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color }) => <TabBarIcon name="portfolio" color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="profile" color={color} />,
        }}
      />
    </Tabs>
  );
}