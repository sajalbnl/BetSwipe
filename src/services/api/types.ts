// API Types & Interfaces

// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// User data matching backend User schema
export interface UserData {
  privyUserId: string;
  eoaAddress?: string;
  smartWalletAddress?: string;
  totalTrades: number;
  totalVolume: number;
  selectedCategories: string[];
  isOnboarded: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// User registration response
export interface RegisterUserResponse extends ApiResponse<UserData> {
  isNew?: boolean;
}

// Category save response (returns full user data)
export interface CategorySaveResponse extends ApiResponse<UserData> {}
