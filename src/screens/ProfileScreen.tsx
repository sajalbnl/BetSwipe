import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { usePrivy } from '@privy-io/expo';
import { useRouter } from 'expo-router';
import { COLORS } from '../../src/constants/colors';
import { styles } from '../../src/styles/screens/ProfileScreen.styles';

// Static dummy data structure - easily replaceable with real data later
interface ProfileData {
  username: string;
  memberSince: string;
  avatar: string;
  stats: {
    totalTrades: number;
    winRate: number;
    dayStreak: number;
  };
  balance: {
    total: number;
    available: number;
    invested: number;
  };
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  initials: string;
  winRate: number;
  pnl: number;
}

const DUMMY_PROFILE_DATA: ProfileData = {
  username: 'Trader_2024',
  memberSince: 'Jan 2024',
  avatar: '', // Empty for now, will use initials
  stats: {
    totalTrades: 127,
    winRate: 75,
    dayStreak: 12,
  },
  balance: {
    total: 2450.0,
    available: 1200.0,
    invested: 1250.0,
  },
};

const DUMMY_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: 'CryptoBull', initials: 'CR', winRate: 92, pnl: 125840.5 },
  { rank: 2, username: 'AlphaTrader', initials: 'AL', winRate: 89, pnl: 98320.75 },
  { rank: 3, username: 'WhaleMarket', initials: 'WH', winRate: 87, pnl: 76540.2 },
  { rank: 4, username: 'BullRunner', initials: 'BU', winRate: 85, pnl: 54210.0 },
  { rank: 5, username: 'DiamondHands', initials: 'DI', winRate: 83, pnl: 48900.3 },
  { rank: 42, username: 'Trader_2024', initials: 'TR', winRate: 75, pnl: 2450.0 },
];

export default function ProfileScreen() {
  const { logout, user } = usePrivy();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [profileData] = useState<ProfileData>(DUMMY_PROFILE_DATA);
  const [leaderboard] = useState<LeaderboardEntry[]>(DUMMY_LEADERBOARD);

  // Get Twitter account data from Privy
  const twitter = user?.linked_accounts?.find(
    (acc) => acc.type === 'twitter_oauth'
  ) as { type: string; username?: string; name?: string; profile_picture_url?: string } | undefined;

  const twitterUsername = twitter?.username || profileData.username;
  const twitterName = twitter?.name || profileData.username;
  const twitterAvatar = twitter?.profile_picture_url;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh - replace with real API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/');
            } catch (error) {
              console.error('Sign out error:', error);
            }
          },
        },
      ]
    );
  };

  const handleAddFunds = () => {
    Alert.alert('Add Funds', 'Coming soon: Add funds to your wallet');
  };

  const handleExploreMarkets = () => {
    // Navigate to markets tab
    router.push('/(tabs)');
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return '#FFD700'; // Gold
    if (rank === 2) return '#C0C0C0'; // Silver
    if (rank === 3) return '#CD7F32'; // Bronze
    return COLORS.cardBackground;
  };

  const currentUserRank = leaderboard.find(
    (entry) => entry.username === profileData.username
  );

  return (
    <LinearGradient
      colors={['#0A0E1A', '#0F1A2E', '#0F1A2E']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          {/* <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>☀️</Text>
          </TouchableOpacity> */}
        </View>

        {/* User Info Section */}
        <View style={styles.userSection}>
          {twitterAvatar ? (
            <Image
              source={{ uri: twitterAvatar }}
              style={styles.avatarImage}
            />
          ) : (
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
          )}
          <View style={styles.userInfo}>
            <Text style={styles.username}>
              {twitterName || twitterUsername}
            </Text>
            {twitterUsername && (
              <Text style={styles.twitterHandle}>@{twitterUsername}</Text>
            )}
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📈</Text>
            <Text style={styles.statValue}>{profileData.stats.totalTrades}</Text>
            <Text style={styles.statLabel}>Total Trades</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🎯</Text>
            <Text style={[styles.statValue, styles.winRateValue]}>
              {profileData.stats.winRate}%
            </Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{profileData.stats.dayStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Total Value Section */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>TOTAL VALUE</Text>
          <Text style={styles.balanceTotal}>
            ${profileData.balance.total.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <View style={styles.balanceBreakdown}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceItemLabel}>Available</Text>
              <Text style={styles.balanceItemValue}>
                ${profileData.balance.available.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceItemLabel}>Invested</Text>
              <Text style={styles.balanceItemValue}>
                ${profileData.balance.invested.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleAddFunds}
          >
            <Text style={styles.actionButtonText}>Add Funds</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleExploreMarkets}
          >
            <Text style={styles.actionButtonText}>Explore Markets</Text>
          </TouchableOpacity>
        </View>

        {/* Leaderboard Section */}
        <View style={styles.leaderboardSection}>
          <View style={styles.leaderboardHeader}>
            <Text style={styles.leaderboardIcon}>🏆</Text>
            <Text style={styles.leaderboardTitle}>Leaderboard</Text>
          </View>

          {leaderboard.slice(0, 5).map((entry) => (
            <View key={entry.rank} style={styles.leaderboardEntry}>
              <View
                style={[
                  styles.rankBadge,
                  { backgroundColor: getRankBadgeColor(entry.rank) },
                ]}
              >
                <Text
                  style={[
                    styles.rankText,
                    entry.rank <= 3 && styles.rankTextDark,
                  ]}
                >
                  {entry.rank <= 3 ? '👑' : entry.rank}
                </Text>
              </View>
              <View style={styles.initialsCircle}>
                <Text style={styles.initialsText}>{entry.initials}</Text>
              </View>
              <Text style={styles.leaderboardUsername}>
                {entry.username.length > 8
                  ? entry.username.slice(0, 5) + '..'
                  : entry.username}
              </Text>
              <View style={styles.leaderboardStats}>
                <View style={styles.leaderboardStat}>
                  <Text style={styles.leaderboardStatLabel}>Win</Text>
                  <Text style={styles.leaderboardStatValue}>
                    {entry.winRate}%
                  </Text>
                </View>
                <View style={styles.leaderboardStat}>
                  <Text style={styles.leaderboardStatLabel}>PnL</Text>
                  <Text
                    style={[
                      styles.leaderboardStatValue,
                      styles.leaderboardPnl,
                    ]}
                  >
                    +${entry.pnl.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* Ellipsis */}
          <View style={styles.ellipsis}>
            <Text style={styles.ellipsisText}>• • •</Text>
          </View>

          {/* Current User Rank */}
          {currentUserRank && (
            <View
              style={[
                styles.leaderboardEntry,
                styles.currentUserEntry,
              ]}
            >
              <View style={[styles.rankBadge, styles.currentUserRankBadge]}>
                <Text style={styles.rankText}>{currentUserRank.rank}</Text>
              </View>
              <View style={styles.initialsCircle}>
                <Text style={styles.initialsText}>
                  {currentUserRank.initials}
                </Text>
              </View>
              <Text style={styles.leaderboardUsername}>
                {currentUserRank.username}
              </Text>
              <View style={styles.leaderboardStats}>
                <View style={styles.leaderboardStat}>
                  <Text style={styles.leaderboardStatLabel}>Win</Text>
                  <Text style={styles.leaderboardStatValue}>
                    {currentUserRank.winRate}%
                  </Text>
                </View>
                <View style={styles.leaderboardStat}>
                  <Text style={styles.leaderboardStatLabel}>PnL</Text>
                  <Text
                    style={[
                      styles.leaderboardStatValue,
                      styles.leaderboardPnl,
                    ]}
                  >
                    +${currentUserRank.pnl.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Text style={styles.signOutIcon}>↪</Text>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );
}
