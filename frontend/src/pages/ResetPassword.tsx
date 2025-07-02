import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { object, string, ref } from 'yup';
import InputField from '../components/InputField';
import { validateResetToken, resetPassword } from '../helpers/passwordReset';

const validationSchema = object({
  password: string()
    .required('Пароль є обов\'язковим')
    .min(8, 'Пароль має бути не менше 8 символів')
    .max(20, 'Пароль має бути менше 20 символів'),
  confirmPassword: string()
    .required('Підтвердження пароля є обов\'язковим')
    .oneOf([ref('password')], 'Паролі мають співпадати')
});

const initialValues = {
  password: '',
  confirmPassword: ''
};

const ResetPassword = () => {
  const [token, setToken] = useState<string>('');
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Отримуємо токен з URL параметрів
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      // Валідуємо токен
      validateToken(tokenFromUrl);
    } else {
      setIsValidToken(false);
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      // Використовуємо API функцію
      await validateResetToken(token);
      setIsValidToken(true);
    } catch (error) {
      console.error('Помилка валідації токена:', error);
      setIsValidToken(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: { password: string; confirmPassword: string }) => {
    setIsLoading(true);
    
    try {
      // Використовуємо API функцію
      await resetPassword(token, values.password);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Помилка при встановленні пароля:', error);
      alert(error instanceof Error ? error.message : 'Сталася помилка при встановленні пароля. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="reset-password-container">
        <div className="loading-message">
          <p>Перевірка токена...</p>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="reset-password-container">
        <div className="error-message">
          <h1 className="reset-password-title">Недійсний токен</h1>
          <p>Посилання для відновлення пароля недійсне або застаріло.</p>
          <button 
            className="back-to-login-button"
            onClick={() => window.location.href = '/login'}
          >
            Повернутися до входу
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-success">
          <h1 className="reset-password-title">Пароль успішно змінено</h1>
          <div className="success-message">
            <p>Ваш пароль було успішно змінено.</p>
            <p>Тепер ви можете увійти з новим паролем.</p>
          </div>
          <button 
            className="back-to-login-button"
            onClick={() => window.location.href = '/login'}
          >
            Увійти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <h1 className="reset-password-title">Встановлення нового пароля</h1>
      <p className="reset-password-description">
        Введіть новий пароль для вашого облікового запису.
      </p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount={true}
      >
        {({ errors, touched, isValid }) => (
          <Form className="reset-password-form" autoComplete="off">
            <InputField
              className="reset-password-input"
              name="password"
              type="password"
              label="Новий пароль"
              placeholder="Введіть новий пароль"
              touched={{ password: touched.password || false }}
              errors={{ password: errors.password || '' }}
              autoComplete="new-password"
            />

            <InputField
              className="reset-password-input"
              name="confirmPassword"
              type="password"
              label="Підтвердження пароля"
              placeholder="Підтвердіть новий пароль"
              touched={{ confirmPassword: touched.confirmPassword || false }}
              errors={{ confirmPassword: errors.confirmPassword || '' }}
              autoComplete="new-password"
            />

            <button 
              type="submit" 
              disabled={!isValid || isLoading} 
              className="reset-password-button"
            >
              {isLoading ? 'Збереження...' : 'Зберегти новий пароль'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword; 