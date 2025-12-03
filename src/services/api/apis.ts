// All API endpoint functions

import { apiCall } from './client';
import { ApiResponse, UserCategoryData } from './types';

// ===================
// Category APIs
// ===================

export const saveCategories = async (
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
};

export const getCategories = async (
  userId: string
): Promise<ApiResponse<UserCategoryData>> => {
  return apiCall<UserCategoryData>(`/categories/${userId}`, {
    method: 'GET',
  });
};

// ===================
// Add more APIs below
// ===================

// Example:
// export const getUser = async (userId: string): Promise<ApiResponse<UserData>> => {
//   return apiCall<UserData>(`/users/${userId}`, { method: 'GET' });
// };
