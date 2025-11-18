import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
    Image
} from 'react-native';
import { COLORS } from '../constants/colors';
import { TEXT_STYLES, FONT_SIZES } from '../constants/typography';
import { Market } from '../types/market';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 18;
const CARD_HEIGHT = screenHeight * 0.65;

interface MarketCardProps {
  market: Market;
  isActive: boolean;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, isActive }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  return (
    <View style={[styles.card, !isActive && styles.inactiveCard]}>
        
        {/* Market Image */}
      <Image source={{uri: market.imageUrl}}
       style={styles.img} />
      {/* Category Badge */}
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{market.category}</Text>
      </View>
      

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{market.question}</Text>
      </View>

      {/* Description */}
    <View style={styles.descriptionContainer}>
    <Text style={styles.description} numberOfLines={isExpanded ? undefined : 2}>
      {market.description}
    </Text>
    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
      <Text style={styles.readMore}>
        {isExpanded ? 'Read less' : 'Read more'}
      </Text>
    </TouchableOpacity>
  </View>

      {/* Percentages */}
      <View style={styles.percentagesContainer}>
        {/* YES */}
        <View style={styles.percentageRow}>
          <Text style={styles.choiceLabel}>YES</Text>
          <Text style={styles.percentageText}>{market.yesPercentage}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              styles.yesBar,
              { width: `${market.yesPercentage}%` }
            ]} 
          />
        </View>

        {/* NO */}
        <View style={styles.percentageRow}>
          <Text style={styles.choiceLabel}>NO</Text>
          <Text style={[styles.percentageText, styles.noPercent]}>
            {market.noPercentage}%
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              styles.noBar,
              { width: `${market.noPercentage}%` }
            ]} 
          />
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>💵 Volume</Text>
          <Text style={styles.statValue}>{market.volume}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>💧 Liquidity</Text>
          <Text style={styles.statValue}>{market.liquidity}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
   // padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'space-between',

  },
  inactiveCard: {
    opacity: 0.7,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.inputBackground,
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
  },
  img:{
    width: '100%',
    height: 110,
    borderRadius: 20,
    opacity: 0.4,

  },
  questionContainer: {
    marginTop: 5,
    paddingHorizontal: 16,
  },
  question: {
    ...TEXT_STYLES.h3,
    color: COLORS.textPrimary,
    
    lineHeight: 38,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  description: {
    ...TEXT_STYLES.body,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  readMore: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.sm,
    marginTop: 5,
  },
  percentagesContainer: {
    paddingHorizontal: 16,
    marginTop: 5,
  },
  percentageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  choiceLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.base,
    fontWeight: '400',
  },
  percentageText: {
    color: COLORS.success,
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '500',
  },
  noPercent: {
    color: COLORS.error,
  },
  progressBarContainer: {
    height: 5,

    backgroundColor: COLORS.inputBackground,
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  yesBar: {
    backgroundColor: COLORS.success,
  },
  noBar: {
    backgroundColor: COLORS.error,
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  stat: {
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    padding: 10,
    borderRadius: 10,
    width: '40%',
  },
  statLabel: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZES.sm,
    marginBottom: 4,
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
});

export default MarketCard;