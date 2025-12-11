import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../constants/typography';

export const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 9999,
  },

  // Toast type variants
  toastSuccess: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  toastError: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  toastInfo: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  toastIcon: {
    fontSize: FONT_SIZES.lg,
  },
  toastMessage: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
    lineHeight: FONT_SIZES.sm * 1.4,
  },
});
