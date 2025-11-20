import React, { useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Text,
} from 'react-native';
import MarketCard from './MarketCard';
import { Market } from '../types/market';
import { COLORS } from '../constants/colors';
import { TEXT_STYLES } from '../constants/typography';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const SWIPE_THRESHOLD = 180;
const SWIPE_OUT_DURATION = 350;

interface SwipeStackProps {
  markets: Market[];
  onSwipeRight: (market: Market) => void;
  onSwipeLeft: (market: Market) => void;
  onSwipeUp: (market: Market) => void;
}
export interface SwipeStackRef {
  swipeLeft: () => void;
  swipeRight: () => void;
  swipeUp: () => void;
}

const SwipeStack =  forwardRef<SwipeStackRef, SwipeStackProps> ( ({
  markets,
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp,
},ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const rotateCard = position.x.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const nextCard = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex < markets.length - 1 ? prevIndex + 1 : 0
    );
    position.setValue({ x: 0, y: 0 });
  };

  const forceSwipe = (direction: 'right' | 'left' | 'up') => {
    // If there's already an animation in progress, ignore
    if (currentIndex >= markets.length) return;

    const x = direction === 'right' ? screenWidth : direction === 'left' ? -screenWidth : 0;
    const y = direction === 'up' ? -screenHeight : 0;
    

    Animated.timing(position, {
      toValue: { x, y },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => {
      const currentMarket = markets[currentIndex];
      
      if (direction === 'right') {
        onSwipeRight(currentMarket);
      } else if (direction === 'left') {
        onSwipeLeft(currentMarket);
      } else {
        onSwipeUp(currentMarket);
      }
      
      nextCard();
    });
  };
  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    swipeLeft: () => forceSwipe('left'),
    swipeRight: () => forceSwipe('right'),
    swipeUp: () => forceSwipe('up'),
  }));

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else if (gesture.dy < -SWIPE_THRESHOLD) {
          forceSwipe('up');
        } else {
          // Spring back to center
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const renderCards = () => {
    if (currentIndex >= markets.length) {
      return (
        <View style={styles.noMoreCards}>
          <Text style={styles.noMoreText}>No more markets!</Text>
          <Text style={styles.refreshText}>Pull to refresh</Text>
        </View>
      );
    }

    return markets
      .map((market, index) => {
        if (index < currentIndex) {
          return null;
        }
        
        if (index === currentIndex) {
          return (
            <Animated.View
              key={market.id}
              style={[
                styles.cardContainer,
                {
                  transform: [
                    { translateX: position.x },
                    { translateY: position.y },
                    { rotate: rotateCard },
                  ],
                },
              ]}
              {...panResponder.panHandlers}
            >
              {/* Overlay Labels */}
              <Animated.View
                style={[
                  styles.yesLabel,
                  {
                    opacity: position.x.interpolate({
                      inputRange: [-50, 0, 50],
                      outputRange: [0, 0, 1],
                      extrapolate: 'clamp',
                    }),
                  },
                ]}
              >
                <Text style={styles.labelText}>YES</Text>
              </Animated.View>
              
              <Animated.View
                style={[
                  styles.noLabel,
                  {
                    opacity: position.x.interpolate({
                      inputRange: [-50, 0, 50],
                      outputRange: [1, 0, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ]}
              >
                <Text style={styles.labelText}>NO</Text>
              </Animated.View>

              <Animated.View
                style={[
                  styles.skipLabel,
                  {
                    opacity: position.y.interpolate({
                      inputRange: [-50, 0, 50],
                      outputRange: [1, 0, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ]}
              >
                <Text style={styles.skipText}>SKIP</Text>
              </Animated.View>

              <MarketCard market={market} isActive={true} />
            </Animated.View>
          );
        }
        // Second card in the stack
         if (index === currentIndex + 1) {
          return (
            <Animated.View
              key={market.id}
              style={[
                styles.cardContainer,
                { 
                  top: 10,
                  zIndex: -1,
                  transform: [
                    { 
                      scale: position.x.interpolate({
                        inputRange: [-screenWidth, 0, screenWidth],
                        outputRange: [1, 0.95, 1],
                        extrapolate: 'clamp',
                      })
                    }
                  ]
                },
              ]}
            >
              <MarketCard market={market} isActive={false} />
            </Animated.View>
          );
        }
        // Third card in the stack
        if (index === currentIndex + 2) {
          return (
            <View
              key={market.id}
              style={[
                styles.cardContainer,
                { 
                  top: 40,
                  zIndex: -2,
                  opacity: 0.6,
                  transform: [{ scale: 0.9 }]
                },
              ]}
            >
              <MarketCard market={market} isActive={false} />
            </View>
          );
        }
      })
      .reverse();
  };

  return <View style={styles.container}>{renderCards()}</View>;
});

const styles = StyleSheet.create({
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

export default SwipeStack;