import { PolymarketResponse, Market } from '../types/market';
import { CATEGORIES } from '../constants/categories';

const POLYMARKET_API_BASE = 'https://gamma-api.polymarket.com';
const MARKETS_PER_FETCH = 25;
const MIN_LIQUIDITY = 1000; // Filter out low liquidity markets
const MIN_VOLUME = 5000;

class PolymarketService {
  private cache = new Map<string, PolymarketResponse[]>();
  private cacheTimestamps = new Map<string, number>();
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Convert Polymarket response to our Market format
   */
  private transformMarket(
    polymarket: PolymarketResponse, 
    category: string
  ): Market {
    // Parse outcome prices
    const prices = JSON.parse(polymarket.outcomePrices || '["0.5", "0.5"]');
    const yesPrice = parseFloat(prices[0]) * 100;
    const noPrice = parseFloat(prices[1]) * 100;

    return {
      id: polymarket.id,
      marketId: polymarket.id,
      question: polymarket.question,
      description: polymarket.description || '',
      category,
      yesPercentage: Math.round(yesPrice),
      noPercentage: Math.round(noPrice),
      yesPrice,
      noPrice,
      volume: this.formatCurrency(polymarket.volumeNum),
      liquidity: this.formatCurrency(polymarket.liquidityNum),
      volumeNum: polymarket.volumeNum,
      liquidityNum: polymarket.liquidityNum,
      imageUrl: polymarket.image || 'https://via.placeholder.com/400x200',
      slug: polymarket.slug,
      conditionId: polymarket.conditionId,
      endDate: polymarket.endDate,
      spread: polymarket.spread,
      lastTradePrice: polymarket.lastTradePrice,
    };
  }

  /**
   * Format currency for display
   */
  private formatCurrency(num: number): string {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}K`;
    }
    return `$${num.toFixed(0)}`;
  }

  /**
   * Fetch markets for a specific tag
   */
  async fetchMarketsByTag(
    tagId: number, 
    limit: number = 50
  ): Promise<PolymarketResponse[]> {
    const cacheKey = `tag_${tagId}_${limit}`;
    const cached = this.cache.get(cacheKey);
    const cacheTime = this.cacheTimestamps.get(cacheKey);

    // Return cached data if valid
    if (cached && cacheTime && Date.now() - cacheTime < this.CACHE_DURATION) {
      console.log(`Using cached data for tag ${tagId}`);
      return cached;
    }

    try {
      const url = `${POLYMARKET_API_BASE}/markets?closed=false&active=true&tag_id=${tagId}&limit=${limit}`;
      console.log('Fetching from:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache the results
      this.cache.set(cacheKey, data);
      this.cacheTimestamps.set(cacheKey, Date.now());
      
      return data;
    } catch (error) {
      console.error(`Error fetching markets for tag ${tagId}:`, error);
      return [];
    }
  }

  /**
   * Fetch markets from multiple categories with deduplication
   */
  async fetchMarketsFromCategories(
    categoryIds: string[],
    existingMarketIds: Set<string>,
    targetCount: number = MARKETS_PER_FETCH
  ): Promise<Market[]> {
    const allMarkets: Market[] = [];
    const seenIds = new Set<string>(existingMarketIds);

    // Get tag IDs for selected categories
    const tagGroups = categoryIds
      .map(catId => {
        const category = CATEGORIES.find(c => c.id === catId);
        if (!category) return null;
        return {
          category: category.label,
          tagIds: category.tag_ids,
        };
      })
      .filter(Boolean) as Array<{ category: string; tagIds: number[] }>;

    if (tagGroups.length === 0) {
      console.warn('No valid categories found');
      return [];
    }

    // Randomize tag selection for variety
    const shuffledTags: Array<{ category: string; tagId: number }> = [];
    tagGroups.forEach(group => {
      group.tagIds.forEach(tagId => {
        shuffledTags.push({ category: group.category, tagId });
      });
    });
    
    // Shuffle array
    for (let i = shuffledTags.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTags[i], shuffledTags[j]] = [shuffledTags[j], shuffledTags[i]];
    }

    // Fetch from each tag until we have enough markets
    for (const { category, tagId } of shuffledTags) {
      if (allMarkets.length >= targetCount) break;

      try {
        const polymarkets = await this.fetchMarketsByTag(tagId, 20);
        
        // Filter and transform markets
        const validMarkets = polymarkets
          .filter(pm => {
            // Filter criteria
            if (seenIds.has(pm.id)) return false;
            if (pm.liquidityNum < MIN_LIQUIDITY) return false;
            if (pm.volumeNum < MIN_VOLUME) return false;
            if (!pm.active || pm.closed) return false;
            return true;
          })
          .sort((a, b) => {
            // Sort by liquidity * volume for quality
            const scoreA = a.liquidityNum * Math.log10(a.volumeNum + 1);
            const scoreB = b.liquidityNum * Math.log10(b.volumeNum + 1);
            return scoreB - scoreA;
          })
          .slice(0, Math.max(3, Math.ceil(targetCount / tagGroups.length))) // Take top markets
          .map(pm => {
            seenIds.add(pm.id);
            return this.transformMarket(pm, category);
          });

        allMarkets.push(...validMarkets);
      } catch (error) {
        console.error(`Failed to fetch markets for tag ${tagId}:`, error);
      }
    }

    // Final sort by engagement (liquidity * volume)
    return allMarkets
      .sort((a, b) => {
        const scoreA = (a.liquidityNum || 0) * Math.log10((a.volumeNum || 0) + 1);
        const scoreB = (b.liquidityNum || 0) * Math.log10((b.volumeNum || 0) + 1);
        return scoreB - scoreA;
      })
      .slice(0, targetCount);
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    this.cacheTimestamps.clear();
  }
}

export default new PolymarketService();