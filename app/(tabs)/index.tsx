import React, { useState,useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwipeStack from '../../src/components/SwipeStack';
import { COLORS } from '../../src/constants/colors';
import { SwipeStackRef } from '../../src/components/SwipeStack';
import { TEXT_STYLES } from '../../src/constants/typography';
import { Market } from '../../src/types/market';
import { MOCK_MARKETS } from '../../src/data/mockMarkets';

export default function MarketsScreen() {
  const [markets] = useState<Market[]>(MOCK_MARKETS);
  const [betHistory, setBetHistory] = useState<any[]>([]);
  const swipeStackRef = useRef<SwipeStackRef>(null);

  const handleSwipeRight = (market: Market) => {
    console.log('Bet YES on:', market.question);
    setBetHistory(prev => [...prev, { market: market.id, bet: 'YES' }]);
    // TODO: Integrate with Polymarket API
  };

  const handleSwipeLeft = (market: Market) => {
    console.log('Bet NO on:', market.question);
    setBetHistory(prev => [...prev, { market: market.id, bet: 'NO' }]);
    // TODO: Integrate with Polymarket API
  };

  const handleSwipeUp = (market: Market) => {
    console.log('Skipped:', market.question);
    // TODO: Track skipped markets
  };

  // Button handlers
  const handleNoPress = () => {
    swipeStackRef.current?.swipeLeft();
  };

  const handleSkipPress = () => {
    swipeStackRef.current?.swipeUp();
  };

  const handleYesPress = () => {
    swipeStackRef.current?.swipeRight();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>BetSwipe</Text>
        <TouchableOpacity style={styles.walletButton}>
          <Text style={styles.walletText}>💰 Connect Wallet</Text>
        </TouchableOpacity>
      </View>

      {/* Swipe Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          ← NO   ↑ SKIP   YES →
        </Text>
      </View>

      {/* Swipe Stack */}
      <View style={styles.swipeContainer}>
        <SwipeStack
        ref={swipeStackRef}
          markets={markets}
          onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
          onSwipeUp={handleSwipeUp}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.noButton]}
          onPress={handleNoPress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonIcon}>✕</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.skipButton]}
          onPress={handleSkipPress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonIcon}>↻</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.yesButton]}
          onPress={handleYesPress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonIcon}>✓</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  logo: {
    ...TEXT_STYLES.h3,
    color: COLORS.primary,
  },
  walletButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  walletText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  instructions: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  instructionText: {
    color: COLORS.textTertiary,
    fontSize: 12,
    letterSpacing: 2,
  },
  swipeContainer: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 45,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noButton: {
    backgroundColor: COLORS.error,
  },
  skipButton: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
  },
  yesButton: {
    backgroundColor: COLORS.success,
  },
  buttonIcon: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
  },
});