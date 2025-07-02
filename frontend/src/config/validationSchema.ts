import { object, string, ref } from 'yup';

export const validationSchema = object ({
    name: string()
    .required('Ім\'я є обов\'язковим'),
    lastName: string()
    .required('Прізвище є обов\'язковим'),
    phoneNumber: string()
    .required('Номер телефону є обов\'язковим'),
    email: string()
    .email('Неправильний email')
    .required('Email є обов\'язковим'),
    password: string()
    .min(8, 'Пароль має бути не менше 8 символів')
    .max(20, 'Пароль має бути менше 20 символів')
    .required('Пароль є обов\'язковим'),
    confirmPassword: string()
    .oneOf([ref('password')], 'Паролі мають співпадати')
    .required('Підтвердження пароля є обов\'язковим'),
}

)