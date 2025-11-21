import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
    Image,
    TextInput,
    Keyboard,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS } from '../constants/colors';
import { TEXT_STYLES, FONT_SIZES } from '../constants/typography';
import { Market } from '../types/market';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 18;
const CARD_HEIGHT = screenHeight * 0.675;

interface MarketCardProps {
  market: Market;
  isActive: boolean;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, isActive }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [betAmount, setBetAmount] = useState<string>('100');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showingReturn, setShowingReturn] = useState<'YES' | 'NO'>('YES');

  const PRESET_AMOUNTS = ['1', '10', '50', '100'];

  // Calculate potential return based on percentage
  const calculateReturn = (amount: string, choice: 'YES' | 'NO') => {
    const numAmount = parseFloat(amount) || 0;
    const percentage = choice === 'YES' ? market.yesPercentage : market.noPercentage;
    // Simple calculation: lower percentage = higher return
    const multiplier = (100 / percentage);
    return (numAmount * multiplier).toFixed(2);
  };

  const handleAmountSelect = (amount: string) => {
    setBetAmount(amount);
    setCustomAmount('');
  };

  const MAX_DIGITS = 7; // user can type max 7 digits → up to 9,999,999

const handleCustomAmountChange = (text: string) => {
  // Allow only numbers
  const numericText = text.replace(/[^0-9]/g, '');

  //BLOCK input if user tries to type more than 7 digits
  if (numericText.length > MAX_DIGITS) {
    return; // simply ignore extra typing
  }

  setCustomAmount(numericText);

  if (numericText) {
    setBetAmount(numericText);
  }
};

  const currentAmount = customAmount || betAmount;
  const potentialReturn = calculateReturn(currentAmount, showingReturn);

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
    {/* <View style={styles.descriptionContainer}>
    <Text style={styles.description} numberOfLines={isExpanded ? undefined : 2}>
      {market.description}
    </Text>
    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
      <Text style={styles.readMore}>
        {isExpanded ? 'Read less' : 'Read more'}
      </Text>
    </TouchableOpacity>
  </View> */}
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

      {/* Bet Amount Section - NEW */}
      <View style={styles.betSection}>
        <View style={styles.betHeader}>
          <Text style={styles.betLabel}>Bet Amount</Text>
          <View style={styles.betInputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.betInput}
              value={customAmount || betAmount}
              onChangeText={handleCustomAmountChange}
              keyboardType="numeric"
              placeholder={betAmount}
              placeholderTextColor={COLORS.textTertiary}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
        </View>

        <View style={styles.presetAmounts}>
          {PRESET_AMOUNTS.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[
                styles.presetButton,
                betAmount === amount && !customAmount && styles.presetButtonActive,
              ]}
              onPress={() => handleAmountSelect(amount)}
            >
              <Text
                style={[
                  styles.presetButtonText,
                  betAmount === amount && !customAmount && styles.presetButtonTextActive,
                ]}
              >
                ${amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Potential Return */}
        <TouchableOpacity 
          style={styles.returnContainer}
          onPress={() => setShowingReturn(showingReturn === 'YES' ? 'NO' : 'YES')}
        >
          <Text style={styles.returnLabel}>
            Potential Return ({showingReturn})
          </Text>
          <Text 
            style={[
              styles.returnValue,
              showingReturn === 'YES' ? styles.returnYes : styles.returnNo
            ]}
          >
            ${potentialReturn}
          </Text>
        </TouchableOpacity>
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
      {!isActive && (
        <BlurView 
          intensity={20} 
          style={styles.blurOverlay}
          tint="dark"
        />
      )}
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
    filter: 'blur(200px)',
    
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    overflow: 'hidden',
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
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
  },
  img:{
    width: '100%',
    height: 100,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    opacity: 0.5,
    resizeMode: 'stretch',
    

  },
  questionContainer: {
    marginTop: 0,
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

  // Bet Section Styles
  betSection: {
    paddingHorizontal: 16,
    marginBottom: 3,
  },
  betHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  betLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
  },
  betInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 100,
  },
  currencySymbol: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.base,
    marginRight: 4,
  },
  betInput: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    minWidth: 60,
  },
  presetAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  presetButton: {
    flex: 1,
    backgroundColor: COLORS.inputBackground,
    paddingVertical: 6,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  presetButtonActive: {
    backgroundColor: COLORS.primary,
  },
  presetButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  presetButtonTextActive: {
    color: COLORS.textPrimary,
  },
  returnContainer: {
    backgroundColor: COLORS.inputBackground,
    paddingVertical: 9,
    paddingHorizontal: 11,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  returnLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
  },
  returnValue: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '700',
  },
  returnYes: {
    color: COLORS.success,
  },
  returnNo: {
    color: COLORS.error,
  },
  percentagesContainer: {
    paddingHorizontal: 16,
  },
  percentageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
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