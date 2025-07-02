import express from 'express';
import { 
  register, 
  login, 
  getProfile, 
  updateProfile, 
  updatePassword,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  enable2FA,
  disable2FA,
  verify2FA,
  getSessions,
  revokeSession,
  logout
} from '../controllers/auth.js';
import { check } from 'express-validator';
import { protect } from '../middlewares/auth.js';

const router = express.Router();
// Реєстрація
router.post(
  '/register',
  [
    check('name', 'Ім\'я обов\'язкове').not().isEmpty(),
    check('lastName', 'Прізвище обов\'язкове').not().isEmpty(),
    check('phoneNumber', 'Телефон обов\'язковий').not().isEmpty(),
    check('email', 'Будь ласка, введіть валідний email').isEmail(),
    check('password', 'Пароль повинен містити мінімум 6 символів').isLength({ min: 6 }),
    check('confirmPassword', 'Паролі не збігаються').custom((value, { req }) => value === req.body.password)
  ],
  register
);

// Логін
router.post(
  '/login',
  [
    check('email', 'Будь ласка, введіть валідний email').isEmail(),
    check('password', 'Пароль обов\'язковий').exists()
  ],
  login
);

// Отримання профілю (вимагає авторизації)
router.get('/profile', getProfile);

// Оновлення профілю (вимагає авторизації)
router.put('/profile', updateProfile);

// Оновлення паролю (вимагає авторизації)
router.put('/password', updatePassword);

// Відновлення пароля
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Підтвердження email
router.post('/send-verification', protect, sendVerificationEmail);
router.post('/verify-email', protect, verifyEmail);

// Двофакторна автентифікація
router.post('/enable-2fa', protect, enable2FA);
router.post('/disable-2fa', protect, disable2FA);
router.post('/verify-2fa', protect, verify2FA);

// Керування сеансами
router.get('/sessions', protect, getSessions);
router.delete('/sessions/:sessionId', protect, revokeSession);

// Вихід
router.post('/logout', protect, logout);

export default router;