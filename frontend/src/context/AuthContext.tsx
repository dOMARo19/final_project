import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import apiClient from '../config/api';

interface User {
  _id: string
  name: string
  lastName: string
  phoneNumber: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (userData: User) => {
    setUser(userData)
    // тут можна зберігати токен у localStorage, якщо потрібно
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    // тут можна видаляти токен з localStorage
  }

  const isAuthenticated = !!user

  // Автоматичне підвантаження користувача при наявності токена
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      apiClient.get('/users/profile')
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}