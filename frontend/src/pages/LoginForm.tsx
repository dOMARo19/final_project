import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik'
import { object, string } from 'yup'
import InputField from '../components/InputField'
import { useLogin } from '../hooks/useAuth.ts'
import { useNavigate } from 'react-router-dom'

const validationSchema = object({
  email: string()
    .required('Email є обов\'язковим')
    .email('Неправильний email'),
  password: string()
    .required('Пароль є обов\'язковим')
    .min(8, 'Пароль має бути не менше 8 символів')
    .max(20, 'Пароль має бути менше 20 символів')
})

const initialValues = {
  email: '',
  password: ''
}

const LoginForm = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await loginMutation.mutateAsync(values);
      navigate('/');
    } catch (error) {
      setError('Помилка входу. Перевірте ваші дані.');
    }
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 60000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleForgotPassword = (email: string) => {
    if (!email) {
      alert('Будь ласка, введіть email для відновлення пароля')
      return
    }
    navigate(`/forgot-password?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="login-form-container">
      <h1 className="login-form-title">Вхід</h1>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount={true}
    >
      {({ errors, touched, isValid, values }) => (
        <Form className="login-form" autoComplete="new-password">
          <InputField
            className="login-form-input"
            name="email"
            type="text"
            label="Email"
            placeholder="Введіть ваш email"
            touched={{ email: touched.email || false }}
            errors={{ email: errors.email || '' }}
            autoComplete="new-password"
          />

          <InputField
            className="login-form-input"
            name="password"
            type="password"
            label="Пароль"
            placeholder="Введіть ваш пароль"
            touched={{ password: touched.password || false }}
            errors={{ password: errors.password || '' }}
            autoComplete="new-password"
          />

          <button 
            type="submit" 
            disabled={!isValid || loginMutation.isPending} 
            className="login-form-button"
          >
            {loginMutation.isPending ? 'Вхід...' : 'Вхід'}
          </button>

          <button 
            type="button" 
            className="forgot-password-button"
            onClick={() => handleForgotPassword(values.email)}
          >
            Забув пароль?
          </button>
        </Form>
      )}
    </Formik>
    </div>
  )
}

export default LoginForm