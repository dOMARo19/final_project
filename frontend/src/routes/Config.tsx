import React from 'react'
import Products from '../pages/Products'
import Contacts from '../pages/Contacts'
import CartPage from '../pages/CartPage'
import RegistrationForm from '../pages/RegistrationForm'
import LoginForm from '../pages/LoginForm'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import UserProfile from '../pages/UserPage'
import AdminPage from '../pages/AdminPage'
import ProductPage from '../pages/ProductPage'

interface RouterConfig {
    path: string;
    Component: React.ComponentType;
    label: string;
    showInMenu: boolean;
}

export const routes: RouterConfig[] = [
    {
        path: '/',
        Component: Products,
        label: 'Товари',
        showInMenu: true,
    },
    {
        path: '/contacts',
        Component: Contacts,
        label: 'Контактна інформація',
        showInMenu: true,
    },
    {
        path: '/cart',
        Component: CartPage,
        label: 'Кошик',
        showInMenu: false,
    },
    {
        path: '/registration',
        Component: RegistrationForm,
        label: 'Реєстрація',
        showInMenu: false,
    },
    {
        path: '/login',
        Component: LoginForm,
        label: 'Вхід',
        showInMenu: false,
    },
    {
        path: '/forgot-password',
        Component: ForgotPassword,
        label: 'Відновлення пароля',
        showInMenu: false,
    },
    {
        path: '/reset-password',
        Component: ResetPassword,
        label: 'Встановлення пароля',
        showInMenu: false,
    },
    {
        path: '/user',
        Component: UserProfile,
        label: 'Профіль',
        showInMenu: false,
    },
    {
        path: '/admin',
        Component: AdminPage,
        label: 'Адміністратор',
        showInMenu: false,
    },
    {
        path: '/product/:id',
        Component: ProductPage,
        label: 'Товар',
        showInMenu: false, 
      }
]