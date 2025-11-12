import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_SIZES, FONT_WEIGHTS} from '../constants/typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  
  // Logo Section
  logoSection: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 40,
  },
  logoText: {
    fontSize: FONT_SIZES['6xl'],
    fontWeight: FONT_WEIGHTS.extrabold,
    color: COLORS.primary,
    marginBottom: 8,
    letterSpacing: -2,
  },
  tagline: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.regular,
    color: COLORS.textPrimary,
  },

  // Main Card
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 24,
    padding: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  
  // Connect Button
  connectButton: {
    marginBottom: 16,
  },
  helperText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.textTertiary,
    paddingHorizontal: 16,
    fontSize: FONT_SIZES.sm,
  },

  // Email Section
  emailSection: {
    marginTop: 8,
  },
  inputLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 8,
    fontWeight: FONT_WEIGHTS.medium,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    padding: 16,
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  emailButton: {
    borderColor: COLORS.primary,
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  link: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  
  // Social Icons
  socialIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    fontSize: 20,
    color: COLORS.textPrimary,
  },
});

export default styles;
