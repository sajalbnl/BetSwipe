import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../src/constants/colors';
import { TEXT_STYLES, FONT_SIZES } from '../../src/constants/typography';

const { height: screenHeight } = Dimensions.get('window');

// Types for Portfolio
interface Position {
  id: string;
  category: string;
  question: string;
  type: 'YES' | 'NO';
  entryPrice: number;
  currentPrice: number;
  shares: number;
  pnl: number;
  pnlPercentage: number;
}

interface PortfolioStats {
  totalValue: number;
  totalPnL: number;
  winRate: number;
}

// Mock Data
const MOCK_POSITIONS: Position[] = [
  {
    id: '1',
    category: 'Crypto',
    question: 'Will BTC hit $100K by 2025?',
    type: 'YES',
    entryPrice: 52,
    currentPrice: 67,
    shares: 100,
    pnl: 1500.00,
    pnlPercentage: 28.8,
  },
  {
    id: '2',
    category: 'Politics',
    question: 'Will Trump win 2024 election?',
    type: 'NO',
    entryPrice: 58,
    currentPrice: 48,
    shares: 150,
    pnl: -1500.00,
    pnlPercentage: -17.2,
  },
  {
    id: '3',
    category: 'Technology',
    question: 'Will AI pass Turing test in 2024?',
    type: 'YES',
    entryPrice: 65,
    currentPrice: 73,
    shares: 80,
    pnl: 640.00,
    pnlPercentage: 12.3,
  },
  {
    id: '4',
    category: 'Sports',
    question: 'Will Lakers win NBA Championship?',
    type: 'NO',
    entryPrice: 71,
    currentPrice: 69,
    shares: 200,
    pnl: -400.00,
    pnlPercentage: -2.8,
  },
  {
    id: '5',
    category: 'Economy',
    question: 'Will inflation drop below 3%?',
    type: 'YES',
    entryPrice: 45,
    currentPrice: 58,
    shares: 120,
    pnl: 1560.00,
    pnlPercentage: 28.9,
  },
  {
    id: '6',
    category: 'Crypto',
    question: 'Will ETH reach $5000 in 2024?',
    type: 'YES',
    entryPrice: 38,
    currentPrice: 42,
    shares: 250,
    pnl: 1000.00,
    pnlPercentage: 10.5,
  },
  {
    id: '7',
    category: 'Politics',
    question: 'Will Biden run for re-election?',
    type: 'NO',
    entryPrice: 62,
    currentPrice: 55,
    shares: 100,
    pnl: -700.00,
    pnlPercentage: -11.3,
  },
];

const MOCK_STATS: PortfolioStats = {
  totalValue: 1974,
  totalPnL: 640,
  winRate: 75,
};

const PortfolioScreen = () => {
  const [positions] = useState<Position[]>(MOCK_POSITIONS);
  const [stats] = useState<PortfolioStats>(MOCK_STATS);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Crypto: '#F7931A',
      Politics: '#7C3AED',
      Technology: '#3B82F6',
      Sports: '#10B981',
      Economy: '#EC4899',
    };
    return colors[category] || COLORS.primary;
  };

  const renderStatCard = (label: string, value: string, prefix?: string, isProfit?: boolean) => {
    return (
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>
          {prefix}
          <Text style={[
            styles.statValue,
            isProfit !== undefined && (isProfit ? styles.profitText : styles.lossText)
          ]}>
            {value}
          </Text>
        </Text>
      </View>
    );
  };

  const renderPosition = (position: Position) => {
    const isProfit = position.pnl >= 0;
    
    return (
      <TouchableOpacity 
        key={position.id} 
        style={styles.positionCard}
        activeOpacity={0.7}
      >
        {/* Header Row */}
        <View style={styles.positionHeader}>
          <View style={styles.categoryBadgeContainer}>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(position.category) + '20' }]}>
              <Text style={[styles.categoryText, { color: getCategoryColor(position.category) }]}>
                {position.category}
              </Text>
            </View>
          </View>
          <View style={[
            styles.typeBadge,
            position.type === 'YES' ? styles.yesBadge : styles.noBadge
          ]}>
            <Text style={styles.typeBadgeText}>{position.type}</Text>
          </View>
        </View>

        {/* Question */}
        <Text style={styles.questionText} numberOfLines={1}>
          {position.question}
        </Text>

        {/* Price Info Row */}
        <View style={styles.priceRow}>
          <View style={styles.priceColumn}>
            <Text style={styles.priceLabel}>Entry</Text>
            <Text style={styles.priceValue}>{position.entryPrice}%</Text>
          </View>
          <View style={styles.priceColumn}>
            <Text style={styles.priceLabel}>Current</Text>
            <Text style={styles.priceValue}>{position.currentPrice}%</Text>
          </View>
          <View style={styles.priceColumn}>
            <Text style={styles.priceLabel}>Shares</Text>
            <Text style={styles.priceValue}>{position.shares}</Text>
          </View>
        </View>

        {/* P&L Row */}
        <View style={styles.pnlRow}>
          <View style={styles.pnlAmount}>
            <Text style={[styles.pnlSymbol, isProfit ? styles.profitText : styles.lossText]}>
              {isProfit ? '↗' : '↘'}
            </Text>
            <Text style={[styles.pnlValue, isProfit ? styles.profitText : styles.lossText]}>
              {isProfit ? '+' : ''}{position.pnl < 0 ? '-' : ''}${Math.abs(position.pnl).toFixed(2)}
            </Text>
          </View>
          <Text style={[styles.pnlPercentage, isProfit ? styles.profitText : styles.lossText]}>
            {isProfit ? '+' : ''}{position.pnlPercentage.toFixed(1)}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header Section */}
      <View style={styles.fixedSection}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Portfolio</Text>
          <Text style={styles.subtitle}>Track your positions and performance</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {renderStatCard(
            '💵 Total   Volume',
            `$${stats.totalValue.toLocaleString()}`,
          )}
          {renderStatCard(
            '📈 P&L',
            `$${Math.abs(stats.totalPnL).toLocaleString()}`,
            stats.totalPnL >= 0 ? '+' : '-',
            stats.totalPnL >= 0
          )}
          {renderStatCard(
            '🎯 Win Rate',
            `${stats.winRate}%`,
          )}
        </View>

        {/* Active Positions Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Positions</Text>
        </View>
      </View>

      {/* Scrollable Positions Section */}
      <ScrollView
        style={styles.scrollableSection}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        <View style={styles.positionsList}>
          {positions.map(renderPosition)}
        </View>

        {/* Closed Positions Button */}
        <TouchableOpacity style={styles.viewClosedButton}>
          <Text style={styles.viewClosedText}>View Closed Positions →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  fixedSection: {
    backgroundColor: COLORS.background,
    paddingBottom: 0,
    // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Add elevation for Android
    elevation: 5,
    zIndex: 10,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    ...TEXT_STYLES.h2,
    color: COLORS.primary,
    marginBottom: 5,
  },
  subtitle: {
    ...TEXT_STYLES.body,
    color: COLORS.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statLabel: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZES.xs,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  profitText: {
    color: COLORS.success,
  },
  lossText: {
    color: COLORS.error,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: COLORS.background,
  },
  sectionTitle: {
    ...TEXT_STYLES.h3,
    color: COLORS.textPrimary,
  },
  scrollableSection: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  positionsList: {
    paddingTop: 5,
  },
  positionCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  positionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadgeContainer: {
    flex: 1,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  yesBadge: {
    backgroundColor: COLORS.success,
  },
  noBadge: {
    backgroundColor: COLORS.error,
  },
  typeBadgeText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
  },
  questionText: {
    ...TEXT_STYLES.body,
    color: COLORS.textPrimary,
    marginBottom: 15,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  priceColumn: {
    flex: 1,
  },
  priceLabel: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZES.xs,
    marginBottom: 4,
  },
  priceValue: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  pnlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pnlAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pnlSymbol: {
    fontSize: FONT_SIZES.lg,
    marginRight: 5,
  },
  pnlValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
  pnlPercentage: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  viewClosedButton: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 10,
  },
  viewClosedText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
});

export default PortfolioScreen;