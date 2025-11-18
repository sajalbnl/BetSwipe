// src/services/api.ts


const API_BASE_URL = __DEV__
  ? process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5500/api'
  : 'https://your-production-api.com/api';

// API response types
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

interface UserCategoryData {
  userId: string;
  selectedCategories: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Category API functions
export const categoryAPI = {
  // Save user's selected categories
  saveCategories: async (
    userId: string, 
    selectedCategories: string[]
  ): Promise<ApiResponse<UserCategoryData>> => {
    return apiCall<UserCategoryData>('/categories/save', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        selectedCategories,
      }),
    });
  },

  // Get user's saved categories
  getCategories: async (
    userId: string
  ): Promise<ApiResponse<UserCategoryData>> => {
    return apiCall<UserCategoryData>(`/categories/${userId}`, {
      method: 'GET',
    });
  },
};

export default {
  categoryAPI,
};