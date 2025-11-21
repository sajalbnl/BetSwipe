// Polymarket API response structure
export interface PolymarketResponse {
  id: string;
  question: string;
  conditionId: string;
  slug: string;
  description: string;
  outcomes: string;
  outcomePrices: string;
  volume: string;
  liquidity: string;
  endDate: string;
  image?: string;
  active: boolean;
  closed: boolean;
  liquidityNum: number;
  volumeNum: number;
  volume24hr: number;
  bestBid: number;
  bestAsk: number;
  spread: number;
  lastTradePrice: number;
  oneDayPriceChange: number;
  events?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

// Our internal Market structure
export interface Market {
  id: string;
  question: string;
  description: string;
  category: string;
  yesPercentage: number;
  noPercentage: number;
  volume: string;
  liquidity: string;
  endDate?: string;
  imageUrl?: string;
  marketId?: string; // Polymarket ID
  slug?: string;
  conditionId?: string; // For placing bets
  volumeNum?: number;
  liquidityNum?: number;
  spread?: number;
  lastTradePrice?: number;
}

export interface BetState {
  amount: number;
  choice: 'YES' | 'NO' | null;
  potentialReturn: number;
}

export interface MarketFetchState {
  markets: Market[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  swipedMarketIds: Set<string>;
}