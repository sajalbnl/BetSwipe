import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePrivy } from '@privy-io/expo';
import { LinearGradient } from 'expo-linear-gradient';
import SwipeStack from '../../src/components/SwipeStack';
import { SwipeStackRef } from '../../src/components/SwipeStack';
import AddFundsBottomSheet, { AddFundsBottomSheetRef } from '../../src/components/AddFundsBottomSheet';
import { COLORS } from '../../src/constants/colors';
import { Market } from '../../src/types/market';
import { useMarketFeed } from '../../src/hooks/useMarketFeed';
import { styles } from '../../src/styles/screens/MarketsScreen.styles';

export default function MarketsScreen() {
  const { user } = usePrivy();
  const userId = user?.id;
  const swipeStackRef = useRef<SwipeStackRef>(null);
  const addFundsSheetRef = useRef<AddFundsBottomSheetRef>(null);

  // Mock balance state - replace with actual wallet balance from Privy
  const [balance, setBalance] = useState(0);

  // Get smart wallet address from Privy user
  const smartWalletAccount = user?.linked_accounts?.find(
    (account) => account.type === 'smart_wallet'
  ) as { type: string; address?: string } | undefined;
  const depositAddress = smartWalletAccount?.address || '0x1a2B3c...cDeF12';

  const {
    markets,
    isLoading,
    error,
    onMarketSwiped,
    checkAndFetchMore,
    refreshMarkets,
    totalSwiped,
  } = useMarketFeed({ userId });


  // Log markets changes for debugging
  useEffect(() => {
    checkAndFetchMore();
    console.log(`MarketsScreen: ${markets.length} markets available`);
  }, [markets.length]);

  const handleSwipeRight = (market: Market) => {
    console.log('Bet YES on:', market.question);
     onMarketSwiped(market.id);
    // TODO: Implement actual bet placement
  };

  const handleSwipeLeft = (market: Market) => {
    console.log('Bet NO on:', market.question);
    onMarketSwiped(market.id);
    // TODO: Implement actual bet placement
  };

  const handleSwipeUp = (market: Market) => {
    console.log('Skipped:', market.question);
    onMarketSwiped(market.id);
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

  // Add Funds handlers
  const handleAddFundsPress = () => {
    addFundsSheetRef.current?.open();
  };

  const handleRefreshBalance = async () => {
    // TODO: Implement actual balance refresh from Privy wallet
    // For now, simulate a refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock balance update - replace with actual wallet balance fetch
    setBalance(prev => prev + Math.random() * 10);
  };

  const handleWithdraw = () => {
    // TODO: Implement withdraw functionality
    addFundsSheetRef.current?.close();
    console.log('Withdraw button pressed');
  };

  // Loading state
  if (isLoading && markets.length === 0) {
    return (
      <LinearGradient
          colors={['#0A0E1A', '#0F1A2E', '#0F1A2E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading markets...</Text>
        </View>
      </SafeAreaView>
      </LinearGradient>
    );
  }
  

  // Error state
  if (error && markets.length === 0) {
    return (
      <LinearGradient
          colors={['#0A0E1A', '#0F1A2E', '#0F1A2E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refreshMarkets}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
          colors={['#0A0E1A', '#0F1A2E', '#0F1A2E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>BetSwipe</Text>
          {totalSwiped > 0 && (
            <Text style={styles.swipedCount}>{totalSwiped} swiped</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.addFundsButton}
          onPress={handleAddFundsPress}
          accessibilityLabel="Add funds to wallet"
          accessibilityRole="button"
        >
          <Text style={styles.addFundsText}>💰 Add Funds</Text>
        </TouchableOpacity>
      </View>

      {/* Swipe Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          ← NO   ↑ SKIP   YES →
        </Text>
      </View>

      {/* Swipe Stack or Empty State */}
      <View style={styles.swipeContainer}>
        {markets.length > 0 ? (
          <SwipeStack
            ref={swipeStackRef}
            markets={markets}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}
            onSwipeUp={handleSwipeUp}
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.emptyContainer}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={refreshMarkets}
                tintColor={COLORS.primary}
              />
            }
          >
            <Text style={styles.emptyText}>No more markets!</Text>
            <Text style={styles.emptySubtext}>Pull down to refresh</Text>
          </ScrollView>
        )}
      </View>

      {/* Loading indicator for fetching more */}
      {isLoading && markets.length > 0 && (
        <View style={styles.fetchingMore}>
          <ActivityIndicator size="small" color={COLORS.primary} />
          <Text style={styles.fetchingText}>Loading more...</Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.noButton]}
          onPress={handleNoPress}
          activeOpacity={0.8}
          disabled={markets.length === 0}
        >
          <Text style={styles.buttonIcon}>✕</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.skipButton]}
          onPress={handleSkipPress}
          activeOpacity={0.8}
          disabled={markets.length === 0}
        >
          <Text style={styles.buttonIcon}>↻</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.yesButton]}
          onPress={handleYesPress}
          activeOpacity={0.8}
          disabled={markets.length === 0}
        >
          <Text style={styles.buttonIcon}>✓</Text>
        </TouchableOpacity>
      </View>

      {/* Add Funds Bottom Sheet */}
      <AddFundsBottomSheet
        ref={addFundsSheetRef}
        depositAddress={depositAddress}
        currentBalance={balance}
        network="Polygon"
        tokenType="USDC"
        estimatedConfirmation="~2 minutes"
        onRefreshBalance={handleRefreshBalance}
        onWithdraw={handleWithdraw}
      />
    </SafeAreaView>
    </LinearGradient>
  );
}