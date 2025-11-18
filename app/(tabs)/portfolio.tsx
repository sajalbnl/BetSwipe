import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../src/constants/colors';
import { TEXT_STYLES } from '../../src/constants/typography';

export default function PortfolioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...TEXT_STYLES.h2,
    color: COLORS.textPrimary,
  },
  subtitle: {
    ...TEXT_STYLES.body,
    color: COLORS.textSecondary,
    marginTop: 10,
  },
});