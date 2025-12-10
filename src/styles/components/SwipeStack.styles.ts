import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TEXT_STYLES } from '../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    position: 'absolute',
  },
  noMoreCards: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noMoreText: {
    ...TEXT_STYLES.h3,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  refreshText: {
    ...TEXT_STYLES.body,
    color: COLORS.textSecondary,
  },
  yesLabel: {
    position: 'absolute',
    top: 50,
    left: 40,
    zIndex: 1000,
    backgroundColor: COLORS.success,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    transform: [{ rotate: '-30deg' }],
  },
  noLabel: {
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1000,
    backgroundColor: COLORS.error,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    transform: [{ rotate: '30deg' }],
  },
  skipLabel: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    zIndex: 1000,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  labelText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  skipText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
