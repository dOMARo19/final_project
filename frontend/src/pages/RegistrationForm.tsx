"use client"
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { validationSchema } from '../config/validationSchema';
import { initialValues } from '../config/initialValues';
import { handleSubmit } from '../helpers/handleSubmit';
import InputField from '../components/InputField';
import Button from '../components/Button';
import SuccessMessage from '../components/SuccessMessage';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  // Обгортка для handleSubmit, щоб відкривати модалку після успіху
  const onSubmit = async (values, formikHelpers) => {
    const result = await handleSubmit(values, formikHelpers);
    if (result === true) {
      setIsSuccessModalOpen(true);
    }
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
    navigate('/user'); // або '/UserPage', якщо такий маршрут
  };

  return (
      <div className="registration-form-container">
        <h1 className="registration-form-title">Реєстрація</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({isSubmitting, errors, touched}) => (
            <Form className="registration-form">
                <InputField
                    className="registration-form-input"
                    label="Ім'я"
                    name="name"
                    type="text"
                    placeholder="Введіть ваше ім'я"
                    errors={errors}
                    touched={touched}
                />
                <InputField
                    className="registration-form-input"
                    label="Прізвище"
                    name="lastName"
                    type="text"
                    placeholder="Введіть ваше прізвище"
                    errors={errors}
                    touched={touched}
                />
                <InputField
                    className="registration-form-input"
                    label="Номер телефону"
                    name="phoneNumber"
                    type="text"
                    placeholder="Введіть ваш номер телефону"
                    errors={errors}
                    touched={touched}
                />
                <InputField
                    className="registration-form-input"
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Введіть ваш email"
                    errors={errors}
                    touched={touched}
                />
                <InputField
                    className="registration-form-input"
                    label="Пароль"
                    name="password"
                    type="password"
                    placeholder="Введіть ваш пароль"
                    errors={errors}
                    touched={touched}
                />
                <InputField
                    className="registration-form-input"
                    label="Підтвердіть пароль"
                    name="confirmPassword"
                    type="password"
                    placeholder="Підтвердіть ваш пароль"
                    errors={errors}
                    touched={touched}
                />
                <Button isSubmitting={isSubmitting} type="submit" disabled={isSubmitting} className="registration-form-button" />

            </Form>
          )}
        </Formik>
        <SuccessMessage
          isOpen={isSuccessModalOpen}
          onClose={handleSuccessClose}
          message="Реєстрація пройшла успішно! Тепер ви можете користуватися своїм акаунтом."
        />
      </div>
  )
}

export default RegistrationForm