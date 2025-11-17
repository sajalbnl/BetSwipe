import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { usePrivy } from '@privy-io/expo';
import {styles} from './CategorySelectionScreen.styles';
import { CATEGORIES } from '../constants/categories';
import { categoryAPI } from '../services/api';

const CategorySelectionScreen = ({navigation}: any) => {
  const router = useRouter();
  const { user, isReady } = usePrivy();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingExisting, setIsFetchingExisting] = useState(true);


  // Get Privy user ID
  const userId = user?.id;

  // Fetch existing categories on mount
  useEffect(() => {
    if (userId) {
      fetchExistingCategories();
    }
  }, [userId]);
  const fetchExistingCategories = async () => {
    if (!userId) return;

    try {
      setIsFetchingExisting(true);
      const response = await categoryAPI.getCategories(userId);
      
      if (response.success && response.data?.selectedCategories) {
        setSelectedCategories(response.data.selectedCategories);
        console.log('Loaded existing categories:', response.data.selectedCategories);
      }
    } catch (error) {
      console.log('No existing categories or error fetching:', error);
      // It's okay if no categories exist yet
    } finally {
      setIsFetchingExisting(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };


  const handleContinue = async () => {
    if (selectedCategories.length === 0) {
      Alert.alert('Select Categories', 'Please select at least one category');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'User not authenticated. Please login again.');
      router.replace('/');
      return;
    }

    try {
      setIsLoading(true);
      
      // Save categories to backend
      const response = await categoryAPI.saveCategories(userId, selectedCategories);
      
      if (response.success) {
        console.log('Categories saved successfully:', selectedCategories);
        
        // Navigate to main app (you'll create this screen next)
        router.navigate('/(tabs)');
      } else {
        throw new Error(response.message || 'Failed to save categories');
      }
    } catch (error: any) {
      console.error('Error saving categories:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to save your preferences. Please try again.',
        [
          { text: 'Try Again', onPress: () => {} },
          { text: 'Continue Anyway', onPress: () => router.replace('/(tabs)') }
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderCategory = ({item}: any) => {
    const isSelected = selectedCategories.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
        onPress={() => toggleCategory(item.id)}
        disabled={isLoading}>
        <Text style={styles.categoryEmoji}>{item.emoji}</Text>
        <Text style={[styles.categoryName]}>
          {item.label}
        </Text>
        
        
      </TouchableOpacity>
    );
  };


  // Show loading while fetching existing preferences
  if (isFetchingExisting || !isReady) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.subtitle}>Loading your preferences...</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Pick Your Interests</Text>
          <Text style={styles.subtitle}>
            Select categories to customize your feed
          </Text>
          {/* {userId && (
            <Text style={styles.userInfo}>
              User: {user?.email || 'Connected'}
            </Text>
          )} */}
          
        </View>

        {/* Categories Grid */}
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />

        {/* Selected Count */}
        <View style={styles.footer}>
          <Text style={styles.selectedCount}>
            {selectedCategories.length} selected
          </Text>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              (selectedCategories.length === 0 ||  isLoading )&& styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={selectedCategories.length === 0 || isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.continueButtonText}>
                Continue to Swipe →
              </Text>
            )}
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default CategorySelectionScreen;