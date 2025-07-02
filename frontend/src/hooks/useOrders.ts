import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../config/api.js';

interface Order {
  _id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface CreateOrderData {
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}

// Хук для отримання всіх замовлень користувача
export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: (): Promise<Order[]> => apiClient.get('/orders').then(res => res.data),
  });
};

// Хук для отримання одного замовлення
export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: (): Promise<Order> => apiClient.get(`/orders/${orderId}`).then(res => res.data),
    enabled: !!orderId,
  });
};

// Хук для створення замовлення
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderData: CreateOrderData) => 
      apiClient.post('/orders', orderData).then(res => res.data),
    onSuccess: () => {
      // Інвалідуємо кеш замовлень
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

// Хук для оновлення статусу замовлення
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) => 
      apiClient.patch(`/orders/${orderId}/status`, { status }).then(res => res.data),
    onSuccess: (data) => {
      // Інвалідуємо кеш замовлень та конкретного замовлення
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', data._id] });
    },
  });
};

// Хук для отримання історії замовлень поточного користувача
export const useUserOrders = () => {
  return useQuery({
    queryKey: ['myOrders'],
    queryFn: (): Promise<Order[]> => apiClient.get('/orders/my').then(res => res.data),
  });
}; 