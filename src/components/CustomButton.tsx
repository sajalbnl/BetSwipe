import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_SIZES, FONT_WEIGHTS} from '../constants/typography';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  // Determine button style based on variant
  const getButtonStyle = (): StyleProp<ViewStyle> => {
    const sizeStyle = styles[`${size}Button`];

    if (variant === 'primary') {
      return [styles.button, sizeStyle, styles.primaryButton];
    } else if (variant === 'secondary') {
      return [styles.button, sizeStyle, styles.secondaryButton];
    } else {
      return [styles.button, sizeStyle, styles.outlineButton];
    }
  };

  // Determine text style based on variant
  const getTextStyle = (): StyleProp<TextStyle> => {
    if (variant === 'outline') {
      return styles.outlineButtonText;
    }
    return styles.buttonText;
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      
      {loading ? (
        <ActivityIndicator color={COLORS.textPrimary} />
      ) : (
        <>
          {icon && icon}
          <Text style={[getTextStyle(), textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    gap: 8,
  },
  
  // Size variants
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  
  // Color variants
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  outlineButton: {
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  
  disabledButton: {
    opacity: 0.5,
  },
  
  // Text styles
  buttonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.background,
  },
  outlineButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
  },
});

export default CustomButton;