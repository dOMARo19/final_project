# Backend для Electronic Store

## Опис

Це серверна частина інтернет-магазину електроніки на Node.js + Express + MongoDB. Підтримує аутентифікацію, управління користувачами, товарами, замовленнями, двофакторну автентифікацію, email-підтвердження та інше.

---

## Структура папок

```
backend/
  app.js                # Головний файл додатку
  config/
    db.js               # Підключення до MongoDB
  controllers/          # Логіка для auth, users, products, orders
  middlewares/          # Мідлвари (авторизація тощо)
  models/               # Mongoose-схеми: User, Product, Order
  routes/               # Опис REST API маршрутів
  uploads/              # Завантажені зображення
  package.json          # Залежності та скрипти
```

---

## Основні залежності

- **express** — сервер
- **mongoose** — робота з MongoDB
- **bcryptjs** — хешування паролів
- **jsonwebtoken** — JWT токени
- **dotenv** — змінні оточення
- **cors** — CORS
- **multer** — завантаження файлів
- **nodemailer** — email-розсилки
- **express-validator** — валідація
- **crypto** — генерація токенів
- **qr-image, speakeasy** — 2FA
- **nodemon** — dev-режим

---

## Моделі

### User

- name, lastName, email, password, role (user/admin)
- address, phone, createdAt
- isEmailVerified, emailVerificationCode, resetPasswordToken
- is2FAEnabled, twoFASecret, activeSessions

### Product

- name, description, price, category, stock, image, createdAt

### Order

- user (ref User), items (name, phone, address, delivery, payment)
- total, status, shippingAddress, paymentMethod, createdAt

---

## Основні маршрути

### /api/auth

- **POST /register** — реєстрація
- **POST /login** — логін
- **GET /profile** — профіль
- **PUT /profile** — оновлення профілю
- **PUT /password** — зміна пароля
- **POST /forgot-password** — запит на скидання пароля
- **POST /reset-password/:token** — скидання пароля
- **POST /send-verification** — email-код
- **POST /verify-email** — підтвердження email
- **POST /enable-2fa** — увімкнути 2FA
- **POST /disable-2fa** — вимкнути 2FA
- **POST /verify-2fa** — перевірка 2FA
- **GET /sessions** — всі сесії
- **DELETE /sessions/:sessionId** — видалити сесію
- **POST /logout** — вихід

### /api/users

- **GET /** — всі користувачі (admin)
- **GET /:id** — користувач за id
- **PUT /:id** — оновити користувача
- **DELETE /:id** — видалити користувача (admin)
- **GET /:id/sessions** — сесії користувача
- **DELETE /:userId/sessions/:sessionId** — видалити сесію

### /api/products

- **GET /** — всі товари
- **GET /:id** — товар за id
- **POST /** — створити товар (авторизація, upload)
- **PUT /:id** — оновити товар (авторизація, upload)
- **DELETE /:id** — видалити товар

### /api/orders

- **GET /my** — замовлення поточного користувача
- **GET /** — всі замовлення
- **GET /:id** — замовлення за id
- **POST /** — створити замовлення
- **PUT /:id** — оновити замовлення
- **DELETE /:id** — видалити замовлення

---

## Запуск

1. Встановіть залежності:
   ```bash
   npm install
   ```
2. Створіть файл `.env` з:
   ```env
   MONGO_URI=ваш_рядок_підключення_до_MongoDB
   JWT_SECRET=ваш_jwt_секрет
   EMAIL_USER=ваш_email
   EMAIL_PASS=пароль_від_email
   CLIENT_URL=http://localhost:5173
   APP_NAME=Electronic Store
   ```
3. Запустіть сервер:
   ```bash
   npm run dev
   # або
   npm start
   ```

---

## Автор

- Розроблено для навчального проекту Electronic Store
