import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

import { useRouter } from 'expo-router';
import { COLORS } from '../constants/colors';
import CustomButton from '../components/CustomButton';
import styles from './AuthScreen.styles';
import {
  usePrivy,
  useLoginWithEmail,
  useLoginWithOAuth,
} from '@privy-io/expo';

if (Platform.OS === 'android') {
  WebBrowser.warmUpAsync();
}

const AuthScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isReady, user } = usePrivy();
  const { sendCode, loginWithCode, state: emailState } = useLoginWithEmail();
  const { login: loginWithOAuth, state: oauthState } = useLoginWithOAuth();

  useEffect(() => {
    return () => {
      if (Platform.OS === 'android') {
        WebBrowser.coolDownAsync();
      }
    };
  }, []);

    // Monitor OAuth state
  useEffect(() => {
    if (oauthState.status === 'error') {
      setIsLoading(false);
      const errorMessage = oauthState.error?.message || 'OAuth login failed';
      console.error('OAuth error:', oauthState.error);
      
      if (errorMessage.includes('Redirect URL')) {
        Alert.alert(
          'Configuration Error',
          'OAuth redirect is not properly configured. Please contact support.',
          [{ text: 'OK' }]
        );
      }
    } else if (oauthState.status === 'done') {
      setIsLoading(false);
      console.log('OAuth login successful');
    }
  }, [oauthState]);

  // Monitor email login state
  useEffect(() => {
    if (emailState.status === 'error') {
      setIsLoading(false);
      Alert.alert('Error', 'Email login failed. Please try again.');
    } else if (emailState.status === 'done') {
      setIsLoading(false);
    }
  }, [emailState]);

  // Check authentication status
  useEffect(() => {
    if (isReady && user) {
      router.push('/category-selection');
    }
  }, [isReady, user]);

  // Twitter OAuth login via Privy
  const handleTwitterLogin = async () => {
    try {
      setIsLoading(true);
      // Set up OAuth configuration
      await loginWithOAuth({
        provider: 'twitter',
      });
    } catch (error: any) {
      console.error('Twitter login error:', error);
      setIsLoading(false);
      
      // Handle specific error cases
      if (error?.message?.includes('User cancelled')) {
        console.log('User cancelled Twitter login');
      } else {
        Alert.alert(
          'Login Failed',
          'Unable to connect with Twitter. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Send OTP to email
  const handleSendCode = async () => {
    if (!email) return Alert.alert('Error', 'Please enter your email');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return Alert.alert('Error', 'Enter a valid email');

    try {
      setIsLoading(true);
      await sendCode({ email });
      setCodeSent(true);
    } catch (err) {
      Alert.alert('Error', 'Failed to send verification code');
      console.error('Send code error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email OTP
  const handleVerifyCode = async () => {
    if (!code) return Alert.alert('Error', 'Enter verification code');

    try {
      setIsLoading(true);
      await loginWithCode({ email, code });
    } catch (err) {
      Alert.alert('Error', 'Verification failed');
      console.error('Email verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Links
  const openTerms = () => Linking.openURL('https://yourwebsite.com/terms');
  const openTwitter = () => Linking.openURL('https://twitter.com/ChadLifts07');
  const openEmail = () => Linking.openURL('mailto:sajalbnl123@gmail.com');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoSection}>
          <Text style={styles.logoText}>BetSwipe</Text>
          <Text style={styles.tagline}>One Swipe. One Shot.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Get Started</Text>
          <Text style={styles.cardSubtitle}>
            Connect your account to start swiping:
          </Text>

          {/* Twitter Login */}
          <CustomButton
            title="Continue with Twitter"
            onPress={handleTwitterLogin}
            variant="primary"
            size="large"
            loading={isLoading}
            style={styles.connectButton}
            disabled={!isReady || oauthState.status === 'loading'}
          />

          <Text style={styles.helperText}>
            Sign in with your X (Twitter) account to get started.
          </Text>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Email Login */}
          <View style={styles.emailSection}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.textTertiary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />

            {codeSent ? (
              <>
                <Text style={styles.inputLabel}>Enter Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter verification code"
                  placeholderTextColor={COLORS.textTertiary}
                  value={code}
                  onChangeText={setCode}
                  keyboardType="numeric"
                />
                <CustomButton
                  title="Verify & Continue"
                  onPress={handleVerifyCode}
                  variant="outline"
                  size="large"
                  loading={isLoading}
                  style={styles.emailButton}
                />
              </>
            ) : (
              <CustomButton
                title="Continue with Email"
                onPress={handleSendCode}
                variant="outline"
                size="large"
                loading={isLoading}
                style={styles.emailButton}
              />
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our{' '}
            <Text style={styles.link} onPress={openTerms}>
              Terms of Service
            </Text>
          </Text>

          <View style={styles.socialIcons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={openTwitter}
            >
              <Text style={styles.socialIcon}>𝕏</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={openEmail}
            >
              <Text style={styles.socialIcon}>✉</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthScreen;
