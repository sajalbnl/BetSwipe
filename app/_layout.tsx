// app/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';
import {PrivyProvider} from '@privy-io/expo';
import * as Linking from 'expo-linking';


export default function Layout() {
  return (
    // customize screenOptions like headerShown false, animation, etc.
    <>
    <PrivyProvider 
      appId="cmhsw53s400t2js0ccjoz3h9g" 
      clientId="client-WY6SWUQ4459MGxq8CEbueSi8dgafoevE4hz6UXTZfoMMH"
      > 
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
    </PrivyProvider>
    </>
  );
}
