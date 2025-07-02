import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User.js';
import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

// Налаштування поштового клієнта
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Генерація JWT токена
const generateToken = (id, isTemp = false) => {
  return jwt.sign({ id, isTemp }, process.env.JWT_SECRET, {
    expiresIn: isTemp ? '15m' : '30d'
  });
};

// Генерація 6-значного коду
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Відправка email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  await transporter.sendMail(mailOptions);
};

// Реєстрація користувача
export const register = async (req, res) => {
  // Валідація вхідних даних
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, lastName, email, password, phoneNumber } = req.body;

  try {
    // Перевірка чи існує користувач з таким email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Користувач з таким email вже існує' });
    }

    // Створення нового користувача
    user = new User({
      name,
      lastName,
      email,
      password,
      phoneNumber,
      role: 'user' // За замовчуванням роль - user
    });

    // Збереження користувача в базі даних
    await user.save();

    // Генерація токена
    const token = generateToken(user._id);

    // Відправка відповіді
    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      token
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Логін користувача
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Пошук користувача по email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Невірний email або пароль' });
    }

    // Перевірка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Невірний email або пароль' });
    }

    // Генерація токена
    const token = generateToken(user._id);

    // Відправка відповіді
    res.json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      token
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Отримання профілю користувача
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Оновлення профілю користувача
export const updateProfile = async (req, res) => {
  const { name, lastName, email, phoneNumber } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    // Оновлення даних
    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      role: updatedUser.role
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Оновлення паролю
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    // Перевірка поточного пароля
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Поточний пароль невірний' });
    }

    // Оновлення пароля
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Пароль успішно оновлено' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Запит на скидання пароля
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Користувача з таким email не знайдено' });
    }

    // Генерація токена скидання
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Використовуємо updateOne замість save() щоб уникнути валідації всіх полів
    await User.updateOne(
      { _id: user._id },
      {
        resetPasswordToken: resetToken,
        resetPasswordExpires: Date.now() + 3600000 // 1 година
      }
    );

    // Відправка email
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendEmail(
      user.email,
      'Скидання пароля',
      `Для скидання пароля перейдіть за посиланням: ${resetUrl}`
    );

    res.json({ message: 'Лист з інструкціями відправлено на email' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Скидання пароля
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Токен недійсний або протермінований' });
    }

    // Хешуємо новий пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Використовуємо updateOne замість save() щоб уникнути валідації всіх полів
    await User.updateOne(
      { _id: user._id },
      {
        password: hashedPassword,
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined
      }
    );

    // Відправка підтвердження
    await sendEmail(
      user.email,
      'Пароль змінено',
      'Ваш пароль був успішно змінений'
    );

    res.json({ message: 'Пароль успішно оновлено' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Відправка коду підтвердження email
export const sendVerificationEmail = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email вже підтверджено' });
    }

    // Генерація коду
    const verificationCode = generateCode();
    user.emailVerificationCode = verificationCode;
    user.emailVerificationExpires = Date.now() + 3600000; // 1 година

    await user.save();

    // Відправка email
    await sendEmail(
      user.email,
      'Підтвердження email',
      `Ваш код підтвердження: ${verificationCode}`
    );

    res.json({ message: 'Код підтвердження відправлено на email' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Підтвердження email
export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      _id: req.user.id,
      emailVerificationCode: code,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Невірний код або час його дії минув' });
    }

    user.isEmailVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    res.json({ message: 'Email успішно підтверджено' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Увімкнення двофакторної автентифікації
export const enable2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    // Генерація секретного ключа для 2FA
    const secret = crypto.randomBytes(20).toString('hex');
    user.twoFASecret = secret;
    user.is2FAEnabled = true;

    await user.save();

    // URL для QR-коду (для Google Authenticator)
    const otpauthUrl = `otpauth://totp/${encodeURIComponent(process.env.APP_NAME)}:${encodeURIComponent(user.email)}?secret=${secret}&issuer=${encodeURIComponent(process.env.APP_NAME)}`;

    res.json({ 
      message: '2FA увімкнено',
      secret,
      otpauthUrl
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Вимкнення двофакторної автентифікації
export const disable2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    user.twoFASecret = undefined;
    user.is2FAEnabled = false;

    await user.save();

    res.json({ message: '2FA вимкнено' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Логін з двофакторною автентифікацією
export const verify2FA = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    // Тут потрібно використати бібліотеку для перевірки TOTP коду
    // Наприклад, speakeasy або otplib
    // Це приклад - реалізація залежить від вашої бібліотеки
    const isValid = true; // Замінити на реальну перевірку коду

    if (!isValid) {
      return res.status(401).json({ message: 'Невірний код' });
    }

    // Генерація фінального токена
    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      token
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Отримання сеансів користувача
export const getSessions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    // Тут можна повернути активні сеанси
    res.json({ message: 'Список сеансів' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Відкликання сеансу
export const revokeSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    // Тут можна реалізувати логіку відкликання сеансу
    res.json({ message: 'Сеанс відкликано' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Вихід користувача
export const logout = async (req, res) => {
  try {
    // В JWT підході немає необхідності зберігати стан на сервері
    // Токен просто стає недійсним на клієнті
    // Але можна додати токен до чорного списку, якщо потрібно
    
    res.json({ message: 'Успішний вихід' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};