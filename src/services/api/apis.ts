// All API endpoint functions

import { apiCall } from './client';
import {
  ApiResponse,
  UserData,
  RegisterUserResponse,
  CategorySaveResponse,
} from './types';

// ===================
// User APIs
// ===================

export const registerUser = async (
  privyUserId: string,
  polygonWalletAddress?: string,
  smartWalletAddress?: string
): Promise<RegisterUserResponse> => {
  return apiCall<UserData>('/user/register', {
    method: 'POST',
    body: JSON.stringify({
      privyUserId,
      polygonWalletAddress,
      smartWalletAddress
    }),
  }) as Promise<RegisterUserResponse>;
};

export const getUser = async (
  privyUserId: string
): Promise<ApiResponse<UserData>> => {
  return apiCall<UserData>(`/user/${privyUserId}`, {
    method: 'GET',
  });
};

export const updateUser = async (
  privyUserId: string,
  updateData: Partial<Pick<UserData, 'eoaAddress' | 'smartWalletAddress' | 'selectedCategories' | 'isOnboarded'>>
): Promise<ApiResponse<UserData>> => {
  return apiCall<UserData>(`/user/${privyUserId}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  });
};

// ===================
// Category APIs
// ===================

export const saveCategories = async (
  privyUserId: string,
  selectedCategories: string[]
): Promise<CategorySaveResponse> => {
  return apiCall<UserData>('/categories/save', {
    method: 'POST',
    body: JSON.stringify({
      privyUserId,
      selectedCategories,
    }),
  });
};

export const getCategories = async (
  privyUserId: string
): Promise<ApiResponse<UserData>> => {
  return apiCall<UserData>(`/categories/${privyUserId}`, {
    method: 'GET',
  });
};
