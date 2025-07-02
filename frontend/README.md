# Frontend для Electronic Store

## Опис

Це клієнтська частина інтернет-магазину електроніки на React + Vite + TypeScript. Підтримує реєстрацію, логін, управління товарами, кошиком, замовленнями, профілем, адміністрування, відновлення пароля, фільтрацію, пошук, адаптивний дизайн.

---

## Структура папок

```
frontend/
  src/
    assets/           # Зображення, іконки
    components/       # UI-компоненти (кнопки, меню, картки, фільтри, іконки)
    context/          # Глобальний стан (Auth, Cart)
    config/           # Конфігурації (API, категорії, валідація)
    helpers/          # Хелпери (запити, фільтри, reset password)
    hooks/            # Кастомні хуки (useAuth, useProducts, useOrders, useUsers)
    modals/           # Модальні вікна (додавання, редагування, оформлення)
    pages/            # Сторінки (Products, ProductPage, CartPage, UserPage, AdminPage, Login, Registration, Forgot/Reset Password, Contacts, ErrorPage)
    routes/           # Конфігурація маршрутів
    types/            # TypeScript типи
    App.tsx           # Головний компонент
    main.jsx          # Точка входу
  public/             # Публічні файли (зображення)
  index.html          # HTML-шаблон
  vite.config.js      # Конфігурація Vite
  package.json        # Залежності та скрипти
```

---

## Основні залежності

- **react, react-dom** — основа UI
- **react-router-dom** — маршрутизація
- **@tanstack/react-query** — робота з API, кешування
- **axios** — HTTP-запити
- **formik, yup** — форми та валідація
- **react-icons** — іконки
- **react-modal** — модальні вікна
- **eslint** — лінтинг
- **typescript** — типізація (через .ts/.tsx)

---

## Основні сторінки

- **/ (Products)** — список товарів, фільтри, пошук
- **/product/:id** — детальна сторінка товару
- **/cart** — кошик
- **/user/:id** — профіль користувача
- **/admin** — панель адміністратора (керування користувачами, замовленнями)
- **/login** — вхід
- **/register** — реєстрація
- **/forgot-password** — запит на відновлення пароля
- **/reset-password** — скидання пароля
- **/contacts** — контакти
- **/404** — сторінка не знайдена

---

## Основні компоненти

- **Menu, Layout** — навігація, структура сторінки
- **ProductFilters** — фільтрація товарів
- **Cart, CartIcon** — кошик
- **AddProductButton, AddProductModal, EditProductModal, CheckoutModal** — робота з товарами та замовленнями
- **UserModal** — перегляд/редагування користувача
- **Button, InputField, SuccessMessage, ErrorBoundary** — UI-елементи

---

## Кастомні хуки

- **useAuth** — аутентифікація, логін/реєстрація, вихід
- **useProducts** — отримання, створення, редагування, видалення товарів
- **useOrders** — робота з замовленнями
- **useUsers** — робота з користувачами (адмін)

---

## Контексти

- **AuthContext** — глобальний стан користувача, токен, логін/лог-аут
- **CartContext** — глобальний стан кошика, додавання/видалення товарів

---

## Хелпери

- **passwordReset.ts** — логіка відновлення пароля
- **productFilters.ts** — фільтрація товарів
- **handleSubmit.ts** — допоміжна логіка для форм

---

## Запуск

1. Встановіть залежності:
   ```bash
   npm install
   ```
2. Запустіть фронтенд:
   ```bash
   npm run dev
   ```
3. Відкрийте [http://localhost:5173](http://localhost:5173)

---

## Автор

- Розроблено для навчального проекту Electronic Store
