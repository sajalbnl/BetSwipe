// index.ts
import 'expo-crypto';
import 'react-native-get-random-values';
import 'fast-text-encoding';
import '@ethersproject/shims';

// Buffer polyfill for React Native
import { Buffer } from 'buffer';
global.Buffer = Buffer;

import 'expo-router/entry';