import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  PanResponder,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { BlurView } from "expo-blur";
import QRCodeStyled from "react-native-qrcode-styled";
import * as Clipboard from "expo-clipboard";
import { COLORS } from "../constants/colors";
import { styles } from "../styles/components/AddFundsBottomSheet.styles";
import Toast from "./Toast";
import { Image } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.85;
const SWIPE_THRESHOLD = 150;

export interface AddFundsBottomSheetProps {
  depositAddress: string;
  currentBalance: number;
  network?: "Polygon" | "Ethereum" | "Base";
  tokenType?: string;
  estimatedConfirmation?: string;
  onRefreshBalance?: () => Promise<void>;
  onWithdraw?: () => void;
}

export interface AddFundsBottomSheetRef {
  open: () => void;
  close: () => void;
}

const AddFundsBottomSheet = forwardRef<
  AddFundsBottomSheetRef,
  AddFundsBottomSheetProps
>(
  (
    {
      depositAddress,
      currentBalance,
      network = "Polygon",
      tokenType = "USDC",
      estimatedConfirmation = "~2 minutes",
      onRefreshBalance,
      onWithdraw,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const translateY = useRef(new Animated.Value(BOTTOM_SHEET_HEIGHT)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    // Expose open/close methods to parent
    useImperativeHandle(ref, () => ({
      open: () => openSheet(),
      close: () => closeSheet(),
    }));

    // Pan responder for swipe-down gesture
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          // Only respond to vertical swipes
          return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
        },
        onPanResponderMove: (_, gestureState) => {
          // Only allow downward swipes
          if (gestureState.dy > 0) {
            translateY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dy > SWIPE_THRESHOLD || gestureState.vy > 0.5) {
            closeSheet();
          } else {
            // Snap back to open position
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              tension: 50,
              friction: 8,
            }).start();
          }
        },
      })
    ).current;

    const openSheet = () => {
      setVisible(true);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
      ]).start();
    };

    const closeSheet = () => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: BOTTOM_SHEET_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
      });
    };

    const handleCopyAddress = async () => {
      try {
        await Clipboard.setStringAsync(depositAddress);
        setToastMessage("Address copied to clipboard!");
        setShowToast(true);
      } catch (error) {
        setToastMessage("Failed to copy address");
        setShowToast(true);
      }
    };

    const handleRefreshBalance = async () => {
      if (!onRefreshBalance) return;

      setRefreshing(true);
      try {
        await onRefreshBalance();
        setToastMessage("Balance refreshed!");
        setShowToast(true);
      } catch (error) {
        setToastMessage("Failed to refresh balance");
        setShowToast(true);
      } finally {
        setRefreshing(false);
      }
    };

    const formatAddress = (address: string) => {
      if (!address) return "";
      return `${address.slice(0, 6)}...${address.slice(-6)}`;
    };

    const formatBalance = (balance: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(balance);
    };

    if (!visible) return null;

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={closeSheet}
        statusBarTranslucent
      >
        <View style={styles.modalContainer}>
          {/* Backdrop */}
          <Animated.View style={[styles.backdrop, { opacity }]}>
            <TouchableOpacity
              style={styles.backdropTouchable}
              activeOpacity={1}
              onPress={closeSheet}
            >
              <BlurView intensity={20} style={styles.blurView} />
            </TouchableOpacity>
          </Animated.View>

          {/* Bottom Sheet */}
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            {/* Drag Handle */}
            <View style={styles.handleContainer} {...panResponder.panHandlers}>
              <View style={styles.handle} />
            </View>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Add Funds</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeSheet}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityLabel="Close bottom sheet"
                accessibilityRole="button"
              >
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
              {/* Current Balance */}
              <View style={styles.balanceSection}>
                <Text style={styles.balanceLabel}>Current Balance</Text>
                <View style={styles.balanceRow}>
                  <Text style={styles.balanceAmount}>
                    {formatBalance(currentBalance)}
                  </Text>
                  <TouchableOpacity
                    onPress={handleRefreshBalance}
                    disabled={refreshing}
                    accessibilityLabel="Refresh balance"
                    accessibilityRole="button"
                  >
                    {refreshing ? (
                      <ActivityIndicator
                        size="small"
                        color={COLORS.textSecondary}
                      />
                    ) : (
                      <Image
                      source={require("../../assets/refresh.png")}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.textSecondary,
                      }}
                    />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* QR Code */}
              <View style={styles.qrSection}>
                <View style={styles.qrContainer}>
                  <QRCodeStyled
                    data={depositAddress}
                    size={150}
                    pieceBorderRadius={4}
                    isPiecesGlued={false}
                    color={COLORS.textPrimary}
                    gradient={{
                      type: "radial",
                      options: {
                        center: [0.5, 0.5],
                        radius: [1, 1],
                        colors: [COLORS.primary, COLORS.primaryDark],
                        locations: [0, 1],
                      },
                    }}
                  />
                </View>
              </View>

              {/* Network Pill */}
              <View style={styles.networkPillContainer}>
                <NetworkPill network={network} />
              </View>

              {/* Deposit Address */}
              <View style={styles.addressSection}>
                <Text style={styles.addressLabel}>DEPOSIT ADDRESS</Text>
                <View style={styles.addressRow}>
                  <Text style={styles.addressText} numberOfLines={1}>
                    {formatAddress(depositAddress)}
                  </Text>
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={handleCopyAddress}
                    accessibilityLabel="Copy deposit address"
                    accessibilityRole="button"
                  >
                    <Image
                      source={require("../../assets/copy.png")}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.textSecondary,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Warning */}
              <View style={styles.warningContainer}>
                <Text style={styles.warningIcon}>⚠️</Text>
                <View style={styles.warningTextContainer}>
                  <Text style={styles.warningTitle}>Only send {tokenType}</Text>
                  <Text style={styles.warningSubtitle}>
                    Sending any other token may result in permanent loss
                  </Text>
                </View>
              </View>

              {/* Estimated Confirmation */}
              <View style={styles.confirmationRow}>
                <Text style={styles.clockIcon}>⏱️</Text>
                <Text style={styles.confirmationText}>
                  Estimated confirmation: {estimatedConfirmation}
                </Text>
              </View>
            </View>

            {/* Footer Actions */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={closeSheet}
                accessibilityLabel="Done"
                accessibilityRole="button"
              >
                <Text style={styles.primaryButtonText}>Done</Text>
              </TouchableOpacity>

              {/* {onWithdraw && (
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={onWithdraw}
                  accessibilityLabel="Withdraw funds"
                  accessibilityRole="button"
                >
                  <Text style={styles.secondaryButtonText}>Withdraw</Text>
                </TouchableOpacity>
              )} */}
            </View>
          </Animated.View>

          {/* Toast Notification */}
          <Toast
            visible={showToast}
            message={toastMessage}
            onHide={() => setShowToast(false)}
          />
        </View>
      </Modal>
    );
  }
);

// NetworkPill Sub-component
interface NetworkPillProps {
  network: "Polygon" | "Ethereum" | "Base";
}

const NetworkPill: React.FC<NetworkPillProps> = ({ network }) => {
  const getNetworkColor = () => {
    switch (network) {
      case "Polygon":
        return "#8247E5";
      case "Ethereum":
        return "#627EEA";
      case "Base":
        return "#0052FF";
      default:
        return COLORS.primary;
    }
  };

  return (
    <View
      style={[
        styles.networkPill,
        { backgroundColor: `${getNetworkColor()}20` },
      ]}
    >
      <View
        style={[styles.networkDot, { backgroundColor: getNetworkColor() }]}
      />
      <Text style={[styles.networkText, { color: getNetworkColor() }]}>
        {network}
      </Text>
    </View>
  );
};

AddFundsBottomSheet.displayName = "AddFundsBottomSheet";

export default AddFundsBottomSheet;
