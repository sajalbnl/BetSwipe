import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { styles } from '../styles/components/Toast.styles';

export interface ToastProps {
  visible: boolean;
  message: string;
  duration?: number;
  type?: 'success' | 'error' | 'info';
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  duration = 2500,
  type = 'success',
  onHide,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Animate in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-hide after duration
      timeoutRef.current = setTimeout(() => {
        hideToast();
      }, duration);
    } else {
      hideToast();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible, message]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  const getTypeStyle = () => {
    switch (type) {
      case 'error':
        return styles.toastError;
      case 'info':
        return styles.toastInfo;
      case 'success':
      default:
        return styles.toastSuccess;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      case 'success':
      default:
        return '✓';
    }
  };

  if (!visible && opacity._value === 0) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        getTypeStyle(),
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
    >
      <Text style={styles.toastIcon}>{getIcon()}</Text>
      <Text style={styles.toastMessage}>{message}</Text>
    </Animated.View>
  );
};

export default Toast;
