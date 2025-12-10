import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TEXT_STYLES, FONT_SIZES } from '../../constants/typography';

export const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor:'transparent',
  },
  fixedSection: {
    backgroundColor: 'transparent',
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
    marginBottom: 22,
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
    marginBottom: 4,
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
    paddingBottom: 10,
    backgroundColor: 'transparent',
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
    paddingBottom: 10,
  },
  positionsList: {
    paddingTop: 3,
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
