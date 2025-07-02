import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../config/api.js';
import { useAuth } from '../context/AuthContext';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

interface User {
  _id: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
}

// Хук для логіну
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const res = await apiClient.post('/auth/login', credentials);
      return res.data;
    },
    onSuccess: async (data: { token: string }) => {
      localStorage.setItem('token', data.token);
      // Отримуємо профіль користувача після логіну
      const res = await apiClient.get('/users/profile');
      login(res.data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

// Хук для реєстрації
export const useRegister = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  
  return useMutation({
    mutationFn: async (userData: RegisterData) => {
      const res = await apiClient.post('/auth/register', userData);
      return res.data;
    },
    onSuccess: async (data: { token: string }) => {
      localStorage.setItem('token', data.token);
      // Отримуємо профіль користувача після реєстрації
      const res = await apiClient.get('/users/profile');
      login(res.data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

// Хук для отримання інформації про користувача
export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: (): Promise<User> => apiClient.get('/users/profile').then(res => res.data),
    enabled: !!localStorage.getItem('token'), // Запит виконується тільки якщо є токен
    retry: false,
  });
};

// Хук для виходу
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  
  return useMutation({
    mutationFn: () => apiClient.post('/auth/logout'),
    onSuccess: () => {
      localStorage.removeItem('token');
      logout();
      queryClient.clear();
      // Перенаправлення на головну сторінку після виходу
      window.location.href = '/';
    },
    onError: (error) => {
      console.error('Помилка при виході:', error);
      // Навіть якщо запит не вдався, очищаємо локальні дані
      localStorage.removeItem('token');
      logout();
      queryClient.clear();
      window.location.href = '/';
    },
  });
}; 