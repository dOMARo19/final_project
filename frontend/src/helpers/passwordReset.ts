// API функції для відновлення пароля

import apiClient from '../config/api';

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Функція для відправки запиту на відновлення пароля
export const sendForgotPasswordRequest = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error: any) {
    console.error('Помилка при відправці запиту:', error);
    throw new Error(
      error?.response?.data?.message ||
      'Не вдалося відправити запит на відновлення пароля'
    );
  }
};

// Функція для валідації токена відновлення пароля
export const validateResetToken = async (token: string): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get(`/auth/validate-reset-token?token=${token}`);
    return response.data;
  } catch (error: any) {
    console.error('Помилка валідації токена:', error);
    throw new Error(
      error?.response?.data?.message ||
      'Недійсний токен відновлення пароля'
    );
  }
};

// Функція для встановлення нового пароля
export const resetPassword = async (token: string, password: string): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post('/auth/reset-password', { token, password });
    return response.data;
  } catch (error: any) {
    console.error('Помилка при встановленні пароля:', error);
    throw new Error(
      error?.response?.data?.message ||
      'Не вдалося встановити новий пароль'
    );
  }
};

// Функція для генерації URL для відновлення пароля
export const generateResetPasswordUrl = (token: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`;
};

// Функція для перевірки валідності email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Функція для перевірки надійності пароля
export const isStrongPassword = (password: string): boolean => {
  // Мінімум 8 символів, хоча б одна літера та одна цифра
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}; 