import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TEXT_STYLES, FONT_SIZES } from '../../constants/typography';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 18;
const CARD_HEIGHT = screenHeight * 0.675;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
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
