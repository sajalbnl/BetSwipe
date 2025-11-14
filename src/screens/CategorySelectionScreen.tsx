import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './CategorySelectionScreen.styles';
import { CATEGORIES } from '../constants/categories';




const CategorySelectionScreen = ({navigation}: any) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleContinue = () => {
    if (selectedCategories.length === 0) {
      Alert.alert('Select Categories', 'Please select at least one category');
      return;
    }

    // Save preferences and navigate to main app
    console.log('Selected categories:', selectedCategories);
    navigation.replace('SwipeScreen');
  };

  const renderCategory = ({item}: any) => {
    const isSelected = selectedCategories.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
        onPress={() => toggleCategory(item.id)}>
        <Text style={styles.categoryEmoji}>{item.emoji}</Text>
        <Text style={[styles.categoryName]}>
          {item.label}
        </Text>
        
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Pick Your Interests</Text>
          <Text style={styles.subtitle}>
            Select categories to customize your feed
          </Text>
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
              selectedCategories.length === 0 && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={selectedCategories.length === 0}>
            <Text style={styles.continueButtonText}>
              Continue to Swipe →
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default CategorySelectionScreen;