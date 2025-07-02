import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../config/api.js';

interface User {
  _id: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
  address?: string;
}

interface CreateUserData {
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
  address?: string;
}

interface UpdateUserData {
  name?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  role?: string;
  address?: string;
}

// Хук для отримання всіх користувачів (тільки для адміністратора)
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: (): Promise<User[]> => apiClient.get('/users').then(res => res.data),
  });
};

// Хук для отримання одного користувача
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: (): Promise<User> => apiClient.get(`/users/${userId}`).then(res => res.data),
    enabled: !!userId,
  });
};

// Хук для створення користувача
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: CreateUserData) => 
      apiClient.post('/users', userData).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Хук для оновлення користувача
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, userData }: { userId: string; userData: UpdateUserData }) => 
      apiClient.put(`/users/${userId}`, userData).then(res => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', data._id] });
    },
  });
};

// Хук для видалення користувача
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => 
      apiClient.delete(`/users/${userId}`).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}; 