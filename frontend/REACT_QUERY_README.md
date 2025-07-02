# React Query Integration Guide

Цей документ описує як використовувати React Query для поєднання фронтенду з бекендом.

## Налаштування

### 1. Встановлені пакети

- `@tanstack/react-query` - основна бібліотека
- `@tanstack/react-query-devtools` - інструменти розробника
- `axios` - HTTP клієнт

### 2. Налаштування QueryClient

У файлі `src/main.jsx` налаштовано QueryClient з оптимальними параметрами:

- `staleTime: 5 * 60 * 1000` - дані вважаються свіжими 5 хвилин
- `cacheTime: 10 * 60 * 1000` - кеш зберігається 10 хвилин
- `retry: 1` - одна спроба повтору при помилці
- `refetchOnWindowFocus: false` - не оновлювати при фокусі вікна

## Структура API

### API клієнт (`src/config/api.js`)

- Базовий URL: `http://localhost:3000/api`
- Автоматичне додавання токена до заголовків
- Обробка 401 помилок (автоматичний логаут)

### Хуки для роботи з API

#### Аутентифікація (`src/hooks/useAuth.ts`)

```typescript
// Логін
const loginMutation = useLogin();
loginMutation.mutate({ email, password });

// Реєстрація
const registerMutation = useRegister();
registerMutation.mutate({ name, email, password });

// Отримання інформації про користувача
const { data: user, isLoading, error } = useUser();

// Вихід
const logoutMutation = useLogout();
logoutMutation.mutate();
```

#### Продукти (`src/hooks/useProducts.ts`)

```typescript
// Отримання всіх продуктів
const { data: products, isLoading, error } = useProducts(filters);

// Отримання одного продукту
const { data: product } = useProduct(productId);

// Створення продукту
const createMutation = useCreateProduct();
createMutation.mutate(productData);

// Оновлення продукту
const updateMutation = useUpdateProduct();
updateMutation.mutate({ id, productData });

// Видалення продукту
const deleteMutation = useDeleteProduct();
deleteMutation.mutate(productId);
```

#### Замовлення (`src/hooks/useOrders.ts`)

```typescript
// Отримання замовлень
const { data: orders } = useOrders();

// Отримання одного замовлення
const { data: order } = useOrder(orderId);

// Створення замовлення
const createOrderMutation = useCreateOrder();
createOrderMutation.mutate(orderData);

// Оновлення статусу
const updateStatusMutation = useUpdateOrderStatus();
updateStatusMutation.mutate({ orderId, status });
```

## Використання в компонентах

### Приклад з продуктами

```typescript
import { useProducts, useDeleteProduct } from "../hooks/useProducts.ts";

const ProductsPage = () => {
  const { data: products = [], isLoading, error } = useProducts();
  const deleteMutation = useDeleteProduct();

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error.message}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <button
            onClick={() => handleDelete(product.id)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Видалення..." : "Видалити"}
          </button>
        </div>
      ))}
    </div>
  );
};
```

### Приклад з логіном

```typescript
import { useLogin } from "../hooks/useAuth.ts";

const LoginForm = () => {
  const loginMutation = useLogin();

  const handleSubmit = async (values) => {
    try {
      await loginMutation.mutateAsync(values);
      // Перенаправлення після успішного логіну
    } catch (error) {
      // Обробка помилки
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Вхід..." : "Вхід"}
      </button>
      {loginMutation.isError && <div>Помилка входу</div>}
    </form>
  );
};
```

## Переваги React Query

1. **Автоматичне кешування** - дані зберігаються в кеші та не завантажуються повторно
2. **Фонове оновлення** - дані оновлюються в фоновому режимі
3. **Оптимістичні оновлення** - UI оновлюється миттєво
4. **Обробка помилок** - вбудована обробка помилок та повторних спроб
5. **Стан завантаження** - автоматичне відстеження стану завантаження
6. **Інвалідація кешу** - автоматичне оновлення пов'язаних даних

## DevTools

React Query DevTools доступні в режимі розробки. Вони показують:

- Всі активні запити
- Кешовані дані
- Стан завантаження
- Помилки

## Найкращі практики

1. **Використовуйте унікальні query keys** для різних запитів
2. **Інвалідуйте кеш** після мутацій для оновлення пов'язаних даних
3. **Обробляйте помилки** в компонентах
4. **Використовуйте enabled** для умовних запитів
5. **Налаштуйте staleTime** відповідно до частоти зміни даних
