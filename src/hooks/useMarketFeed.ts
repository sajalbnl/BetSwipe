import { useState, useEffect, useCallback, useRef } from 'react';
import { Market } from '../types/market';
import polymarketAPI from '../services/polymarketAPI';
import { categoryAPI } from '../services/api';

const REFETCH_THRESHOLD = 6; // Fetch more when 6 markets remain
const MAX_SWIPED_IDS = 2000; // Reset after 2000 to prevent memory issues
const INITIAL_FETCH_COUNT = 25;
const REFETCH_COUNT = 15;

interface UseMarketFeedProps {
  userId: string | undefined;
}

export const useMarketFeed = ({ userId }: UseMarketFeedProps) => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Track swiped markets
  const swipedMarketIds = useRef(new Set<string>());
  const isFetching = useRef(false);

  // Fetch user's selected categories
  const fetchUserCategories = useCallback(async () => {
    if (!userId) {
      setError('User not authenticated');
      setIsLoading(false);
      return [];
    }

    try {
      const response = await categoryAPI.getCategories(userId);
      if (response.success && response.data?.selectedCategories) {
        setSelectedCategories(response.data.selectedCategories);
        return response.data.selectedCategories;
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Use default categories if fetch fails
      return ['crypto', 'politics', 'sports'];
    }
    return [];
  }, [userId]);

  // Fetch markets from Polymarket
  const fetchMarkets = useCallback(async (
    categories: string[], 
    count: number = INITIAL_FETCH_COUNT,
    append: boolean = false
  ) => {
    if (isFetching.current || categories.length === 0) return;
    
    isFetching.current = true;
    setIsLoading(!append);

    try {
      const newMarkets = await polymarketAPI.fetchMarketsFromCategories(
        categories,
        swipedMarketIds.current,
        count
      );

      if (newMarkets.length === 0) {
        setError('No markets available. Try different categories.');
        return;
      }

      setMarkets(prev => {
        const combined = append ? [...prev, ...newMarkets] : newMarkets;
        // Remove any duplicates
        const uniqueMarkets = Array.from(
          new Map(combined.map(m => [m.id, m])).values()
        );
        return uniqueMarkets;
      });

      setError(null);
    } catch (err) {
      console.error('Error fetching markets:', err);
      setError('Failed to load markets. Please try again.');
    } finally {
      setIsLoading(false);
      isFetching.current = false;
    }
  }, []);

  // Initial load
  useEffect(() => {
    const initialize = async () => {
      const categories = await fetchUserCategories();
      if (categories.length > 0) {
        await fetchMarkets(categories);
      }
    };
    initialize();
  }, [userId]);

  // Track market swipes
  const onMarketSwiped = useCallback((marketId: string) => {
    swipedMarketIds.current.add(marketId);
    
    // Reset if too many IDs stored
    if (swipedMarketIds.current.size > MAX_SWIPED_IDS) {
      console.log('Resetting swiped market IDs');
      swipedMarketIds.current.clear();
    }

    // Remove swiped market from current list
    setMarkets(prev => prev.filter(m => m.id !== marketId));
  }, []);

  // Check if more markets needed
  const checkAndFetchMore = useCallback(() => {
    if (markets.length <= REFETCH_THRESHOLD && !isFetching.current) {
      console.log('Fetching more markets...');
      fetchMarkets(selectedCategories, REFETCH_COUNT, true);
    }
  }, [markets.length, selectedCategories, fetchMarkets]);

  // Refresh markets
  const refreshMarkets = useCallback(async () => {
    polymarketAPI.clearCache();
    swipedMarketIds.current.clear();
    await fetchMarkets(selectedCategories, INITIAL_FETCH_COUNT, false);
  }, [selectedCategories, fetchMarkets]);

  return {
    markets,
    isLoading,
    error,
    onMarketSwiped,
    checkAndFetchMore,
    refreshMarkets,
    totalSwiped: swipedMarketIds.current.size,
  };
};