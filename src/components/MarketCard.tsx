import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
} from "react-native";
import { BlurView } from "expo-blur";
import { COLORS } from "../constants/colors";
import { Market } from "../types/market";
import { styles } from "../styles/components/MarketCard.styles";

interface MarketCardProps {
  market: Market;
  isActive: boolean;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, isActive }) => {
  const [betAmount, setBetAmount] = useState<string>("100");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showingReturn, setShowingReturn] = useState<"YES" | "NO">("YES");

  const PRESET_AMOUNTS = ["1", "10", "50", "100"];

  // Calculate potential return based on percentage
  const calculateReturn = (amount: string, choice: "YES" | "NO") => {
    const numAmount = parseFloat(amount) || 0;
    const percentage =
      choice === "YES" ? market.yesPercentage : market.noPercentage;
    // Simple calculation: lower percentage = higher return
    const multiplier = 100 / percentage;
    return (numAmount * multiplier).toFixed(2);
  };

  const handleAmountSelect = (amount: string) => {
    setBetAmount(amount);
    setCustomAmount("");
  };

  const MAX_DIGITS = 7; // user can type max 7 digits → up to 9,999,999

  const handleCustomAmountChange = (text: string) => {
    // Allow only numbers
    const numericText = text.replace(/[^0-9]/g, "");

    //BLOCK input if user tries to type more than 7 digits
    if (numericText.length > MAX_DIGITS) {
      return; // simply ignore extra typing
    }

    setCustomAmount(numericText);

    if (numericText) {
      setBetAmount(numericText);
    }
  };

  const currentAmount = customAmount || betAmount;
  const potentialReturn = calculateReturn(currentAmount, showingReturn);

  return (
    <View style={[styles.card, !isActive && styles.inactiveCard]}>
      {/* Market Image */}
      <Image source={{ uri: market.imageUrl }} style={styles.img} />
      {/* Category Badge */}
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{market.category}</Text>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{market.question}</Text>
      </View>

      {/* Description */}
      {/* <View style={styles.descriptionContainer}>
    <Text style={styles.description} numberOfLines={isExpanded ? undefined : 2}>
      {market.description}
    </Text>
    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
      <Text style={styles.readMore}>
        {isExpanded ? 'Read less' : 'Read more'}
      </Text>
    </TouchableOpacity>
  </View> */}
      {/* Percentages */}
      <View style={styles.percentagesContainer}>
        {/* YES */}
        <View style={styles.percentageRow}>
          <Text style={styles.choiceLabel}>YES</Text>
          <Text style={styles.percentageText}>{market.yesPercentage}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              styles.yesBar,
              { width: `${market.yesPercentage}%` },
            ]}
          />
        </View>

        {/* NO */}
        <View style={styles.percentageRow}>
          <Text style={styles.choiceLabel}>NO</Text>
          <Text style={[styles.percentageText, styles.noPercent]}>
            {market.noPercentage}%
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              styles.noBar,
              { width: `${market.noPercentage}%` },
            ]}
          />
        </View>
      </View>

      {/* Bet Amount Section - NEW */}
      <View style={styles.betSection}>
        <View style={styles.betHeader}>
          <Text style={styles.betLabel}>Bet Amount</Text>
          <View style={styles.betInputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.betInput}
              value={customAmount || betAmount}
              onChangeText={handleCustomAmountChange}
              keyboardType="numeric"
              placeholder={betAmount}
              placeholderTextColor={COLORS.textTertiary}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
        </View>

        <View style={styles.presetAmounts}>
          {PRESET_AMOUNTS.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[
                styles.presetButton,
                betAmount === amount &&
                  !customAmount &&
                  styles.presetButtonActive,
              ]}
              onPress={() => handleAmountSelect(amount)}
            >
              <Text
                style={[
                  styles.presetButtonText,
                  betAmount === amount &&
                    !customAmount &&
                    styles.presetButtonTextActive,
                ]}
              >
                ${amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Potential Return */}
        <TouchableOpacity
          style={styles.returnContainer}
          onPress={() =>
            setShowingReturn(showingReturn === "YES" ? "NO" : "YES")
          }
        >
          <Text style={styles.returnLabel}>
            Potential Return ({showingReturn})
          </Text>
          <Text
            style={[
              styles.returnValue,
              showingReturn === "YES" ? styles.returnYes : styles.returnNo,
            ]}
          >
            ${potentialReturn}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>💵 Volume</Text>
          <Text style={styles.statValue}>{market.volume}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>💧 Liquidity</Text>
          <Text style={styles.statValue}>{market.liquidity}</Text>
        </View>
      </View>
      {!isActive && (
        <BlurView intensity={20} style={styles.blurOverlay} tint="dark" />
      )}
    </View>
  );
};

export default MarketCard;
