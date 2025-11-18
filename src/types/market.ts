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
  marketId?: string; // For Polymarket integration
  slug?: string; // For Polymarket URL
}

export interface BetState {
  amount: number;
  choice: 'YES' | 'NO' | null;
  potentialReturn: number;
}