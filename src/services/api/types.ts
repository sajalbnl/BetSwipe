// API Types & Interfaces

// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Category API types
export interface UserCategoryData {
  userId: string;
  selectedCategories: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Add more API interfaces below as needed
// Example:
// export interface UserData {
//   id: string;
//   email: string;
//   name: string;
// }
