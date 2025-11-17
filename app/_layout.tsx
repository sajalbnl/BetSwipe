// app/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';
import {PrivyProvider} from '@privy-io/expo';
import {PrivyElements} from '@privy-io/expo/ui';
import * as Linking from 'expo-linking';


export default function Layout() {
  const appId = process.env.EXPO_PUBLIC_PRIVY_APP_ID;
  const clientId = process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID;

  return (
    // customize screenOptions like headerShown false, animation, etc.
    <>
    <PrivyProvider
      appId={appId}
      clientId={clientId}
      > 
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
    <PrivyElements config={{appearance: {accentColor: '#4562e7ff'}}} />
    </PrivyProvider>
    </>
  );
}
