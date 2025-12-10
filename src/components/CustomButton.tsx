import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {styles} from '../styles/components/CustomButton.styles';

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



export default CustomButton;