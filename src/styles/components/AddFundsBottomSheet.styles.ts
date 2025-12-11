import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../constants/typography';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.85;

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },

  // Backdrop styles
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  backdropTouchable: {
    flex: 1,
  },
  blurView: {
    flex: 1,
  },

  // Bottom sheet container
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BOTTOM_SHEET_HEIGHT,
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },

  // Drag handle
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT_SIZES['xl'],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  closeButton: {
    width: 25,
    height: 25,
    borderRadius: 16,
    backgroundColor: COLORS.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  // Balance section
  balanceSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textSecondary,
    marginBottom: 2,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  balanceAmount: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  refreshIcon: {
    fontSize: FONT_SIZES.xl,
  },

  // QR Code section
  qrSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  qrCode: {
    width: 240,
    height: 240,
  },

  // Network Pill
  networkPillContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  networkPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  networkDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  networkText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
  },

  // Address section
  addressSection: {
    marginBottom: 20,
  },
  addressLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textSecondary,
    marginBottom: 8,
    letterSpacing: 1.2,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addressText: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },

  // Warning section
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: `${COLORS.warning}20`,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: `${COLORS.warning}40`,
  },
  warningIcon: {
    fontSize: FONT_SIZES.lg,
  },
  warningTextContainer: {
    flex: 1,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  warningTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.warning,
    marginBottom: 2,
  },
  warningSubtitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZES.sm * 1.4,
  },

  // Confirmation row
  confirmationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  clockIcon: {
    fontSize: FONT_SIZES.base,
  },
  confirmationText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textSecondary,
  },

  // Footer actions
  footer: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
  },
  secondaryButton: {
    backgroundColor: COLORS.transparent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secondaryButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
  },
});
