import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = [
  {id: 'politics', name: 'Politics', emoji: '🏛️'},
  {id: 'crypto', name: 'Crypto', emoji: '₿'},
  {id: 'sports', name: 'Sports', emoji: '⚽'},
  {id: 'business', name: 'Business', emoji: '💼'},
  {id: 'entertainment', name: 'Entertainment', emoji: '🎬'},
  {id: 'science', name: 'Science', emoji: '🔬'},
  {id: 'weather', name: 'Weather', emoji: '🌤️'},
  {id: 'finance', name: 'Finance', emoji: '📈'},
];

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
        <Text style={[styles.categoryName, isSelected && styles.categoryNameSelected]}>
          {item.name}
        </Text>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B8B8B',
  },
  grid: {
    flexGrow: 1,
  },
  categoryCard: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#1A1F3A',
    borderRadius: 16,
    margin: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryCardSelected: {
    backgroundColor: '#2A2F4A',
    borderColor: '#4F46E5',
  },
  categoryEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: '#4F46E5',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 20,
    color: '#4F46E5',
  },
  footer: {
    paddingTop: 16,
  },
  selectedCount: {
    fontSize: 14,
    color: '#8B8B8B',
    textAlign: 'center',
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#2A2F4A',
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CategorySelectionScreen;