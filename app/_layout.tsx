import React from "react";
import { Stack } from "expo-router";
import Providers from "../src/utils/privyProvider";

export default function Layout() {
  const appId = process.env.EXPO_PUBLIC_PRIVY_APP_ID;
  const clientId = process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID;

  return (
    
    <>
      <Providers>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </Providers>
    </>
  );
}