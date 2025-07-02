import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import InputField from '../components/InputField';
import { sendForgotPasswordRequest } from '../helpers/passwordReset';

const validationSchema = object({
  email: string()
    .required('Email є обов\'язковим')
    .email('Неправильний email')
});

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialEmail, setInitialEmail] = useState('');

  useEffect(() => {
    // Отримуємо email з URL параметрів
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');
    if (emailFromUrl) {
      setInitialEmail(emailFromUrl);
    }
  }, []);

  const initialValues = {
    email: initialEmail
  };

  const handleSubmit = async (values: { email: string }) => {
    setIsLoading(true);
    
    try {
      // Використовуємо API функцію
      await sendForgotPasswordRequest(values.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Помилка при відправці запиту:', error);
      alert(error instanceof Error ? error.message : 'Сталася помилка при відправці запиту. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-success">
          <h1 className="forgot-password-title">Перевірте ваш email</h1>
          <div className="success-message">
            <p>Ми відправили інструкції для відновлення пароля на ваш email.</p>
            <p>Перевірте папку "Вхідні" та "Спам".</p>
          </div>
          <button 
            className="back-to-login-button"
            onClick={() => window.history.back()}
          >
            Повернутися до входу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <h1 className="forgot-password-title">Відновлення пароля</h1>
      <p className="forgot-password-description">
        Введіть ваш email, і ми відправимо вам інструкції для відновлення пароля.
      </p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount={true}
      >
        {({ errors, touched, isValid }) => (
          <Form className="forgot-password-form" autoComplete="off">
            <InputField
              className="forgot-password-input"
              name="email"
              type="email"
              label="Email"
              placeholder="Введіть ваш email"
              touched={{ email: touched.email || false }}
              errors={{ email: errors.email || '' }}
              autoComplete="email"
            />

            <button 
              type="submit" 
              disabled={!isValid || isLoading} 
              className="forgot-password-button"
            >
              {isLoading ? 'Відправка...' : 'Відправити інструкції'}
            </button>

            <button 
              type="button" 
              className="back-to-login-link"
              onClick={() => window.history.back()}
            >
              Повернутися до входу
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword; 