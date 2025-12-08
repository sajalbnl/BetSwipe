import React from "react";
import { Stack } from "expo-router";
import Providers from "../src/utils/polymarketProvider";

export default function Layout() {
  const appId = process.env.EXPO_PUBLIC_PRIVY_APP_ID;
  const clientId = process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID;

  return (
    // customize screenOptions like headerShown false, animation, etc.
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