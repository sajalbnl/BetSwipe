// Generic API client

import { ApiResponse } from './types';

const API_BASE_URL = __DEV__
  ? process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5500/api'
  : 'https://your-production-api.com/api';

export async function apiCall<T>(
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
