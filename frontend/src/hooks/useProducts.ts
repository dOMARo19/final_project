import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../config/api.js';
import { ProductInterface } from '../types/product.interface';
import { FilterInterface } from '../types/filter.interface';

// Хук для отримання всіх продуктів
export const useProducts = (filters: FilterInterface = {} as FilterInterface) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => apiClient.get('/products', { params: filters }).then(res => res.data),
  });
};

// Хук для отримання одного продукту
export const useProduct = (productId: number) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => apiClient.get(`/products/${productId}`).then(res => res.data),
    enabled: !!productId,
  });
};

// Хук для створення продукту
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productData: Omit<ProductInterface, 'id'>) => 
      apiClient.post('/products', productData).then(res => res.data),
    onSuccess: () => {
      // Інвалідуємо кеш продуктів
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// Хук для оновлення продукту
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, productData }: { id: number; productData: ProductInterface }) => 
      apiClient.put(`/products/${id}`, productData).then(res => res.data),
    onSuccess: (data) => {
      // Інвалідуємо кеш продуктів та конкретного продукту
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', data._id] });
    },
  });
};

// Хук для видалення продукту
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId: number) => 
      apiClient.delete(`/products/${productId}`).then(res => res.data),
    onSuccess: () => {
      // Інвалідуємо кеш продуктів
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}; 