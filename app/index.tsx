// app/index.tsx
import React from 'react';
import AuthScreen from '../src/screens/AuthScreen'; // path relative to app/
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Route() {
  return (
    <KeyboardAwareScrollView
  contentContainerStyle={{ flexGrow: 1 }}
  keyboardShouldPersistTaps="handled"
>
  <AuthScreen />
</KeyboardAwareScrollView>
  );
}
