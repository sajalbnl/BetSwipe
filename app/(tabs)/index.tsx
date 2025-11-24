import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePrivy } from '@privy-io/expo';
import SwipeStack from '../../src/components/SwipeStack';
import { SwipeStackRef } from '../../src/components/SwipeStack';
import { COLORS } from '../../src/constants/colors';
import { TEXT_STYLES, FONT_SIZES } from '../../src/constants/typography';
import { Market } from '../../src/types/market';
import { useMarketFeed } from '../../src/hooks/useMarketFeed';

export default function MarketsScreen() {
  const { user } = usePrivy();
  const userId = user?.id;
  const swipeStackRef = useRef<SwipeStackRef>(null);
  
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

  // Loading state
  if (isLoading && markets.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading markets...</Text>
        </View>
      </SafeAreaView>
    );
  }
  

  // Error state
  if (error && markets.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refreshMarkets}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>BetSwipe</Text>
          {totalSwiped > 0 && (
            <Text style={styles.swipedCount}>{totalSwiped} swiped</Text>
          )}
        </View>
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
  swipedCount: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    marginTop: 2,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.base,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.base,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...TEXT_STYLES.h3,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  emptySubtext: {
    ...TEXT_STYLES.body,
    color: COLORS.textSecondary,
  },
  fetchingMore: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  fetchingText: {
    marginLeft: 8,
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
  },
});