import { Tabs } from 'expo-router';
import React from 'react';

export default function Layout() {
    return(
        <Tabs>
            <Tabs.Screen name="index" options={{headerShown:false, tabBarLabel:'Market'}} />
            <Tabs.Screen name="search" options={{headerShown:false, tabBarLabel:'Search'}} />
            <Tabs.Screen name="portfolio" options={{headerShown:false, tabBarLabel:'Portfolio'}} />
            <Tabs.Screen name="profile" options={{headerShown:false, tabBarLabel:'Profile'}} />
        </Tabs>
    )

}