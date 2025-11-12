import {TextStyle} from 'react-native';

// Font sizes
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

// Font weights
export const FONT_WEIGHTS = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extrabold: '800' as TextStyle['fontWeight'],
};

// Common text styles
export const TEXT_STYLES = {
  h1: {
    fontSize: FONT_SIZES['5xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: FONT_SIZES['5xl'] * 1.2,
  },
  h2: {
    fontSize: FONT_SIZES['4xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: FONT_SIZES['4xl'] * 1.2,
  },
  h3: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: FONT_SIZES['3xl'] * 1.2,
  },
  body: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: FONT_SIZES.base * 1.5,
  },
  bodyLarge: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: FONT_SIZES.lg * 1.5,
  },
  caption: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: FONT_SIZES.sm * 1.4,
  },
  button: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
  },
};