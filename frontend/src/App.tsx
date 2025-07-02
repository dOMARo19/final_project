import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes/Config'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './pages/NotFound'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      ...routes.map(({ path, Component }) => ({
        path,
        element: <Component />
      }))
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div>
          <RouterProvider router={router} />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

