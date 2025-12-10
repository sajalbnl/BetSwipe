import {PrivyProvider} from '@privy-io/expo';
import {SmartWalletsProvider} from '@privy-io/expo/smart-wallets';
import { PrivyElements } from "@privy-io/expo/ui";

export default function Providers({children}: {children: React.ReactNode}) {
  const appId = process.env.EXPO_PUBLIC_PRIVY_APP_ID;
  const clientId = process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID;
  return (
    <PrivyProvider
      appId={appId}
      clientId={clientId}
      config={{
          embedded: {
            ethereum: {
              createOnLogin: "users-without-wallets",
            },
          },
        }}
    >
      <SmartWalletsProvider>{children}</SmartWalletsProvider>
      <PrivyElements config={{ appearance: { accentColor: "#4562e7ff" } }} />
    </PrivyProvider>
  );
}