import axios from 'axios';

// Базовий URL для API
const API_BASE_URL = 'http://localhost:3000/api';

// Створюємо axios інстанс з базовими налаштуваннями
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Інтерцептор для додавання токена до запитів
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Інтерцептор для обробки помилок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Якщо токен недійсний, видаляємо його та перенаправляємо на логін
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient; 