// app/(auth)/login.tsx
import React from 'react';
import AuthScreen from '../../src/screens/AuthScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LoginRoute() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <AuthScreen />
    </KeyboardAwareScrollView>
  );
}
