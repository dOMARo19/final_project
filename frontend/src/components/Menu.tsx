import React from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../routes/Config'
import CartIcon from './CartIcon'
import RegistrationForm from '../pages/RegistrationForm'
import LoginForm from '../pages/LoginForm'
import ProfileIcon from './ProfileIcon'
import { useAuth } from '../context/AuthContext'
import { useLogout } from '../hooks/useAuth'

const Menu = () => {
  const { user, isAuthenticated } = useAuth()
  const logoutMutation = useLogout()

  const handleLogout = () => {
    if (window.confirm('Ви впевнені, що хочете вийти з профілю?')) {
      logoutMutation.mutate()
    }
  }

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <ul className="navbar__list">
            {routes
              .filter((route) => route.showInMenu)
              .map((route) => (
                <li className="navbar__item" key={route.path}>
                  <NavLink to={route.path} className="navbar__link">
                    {route.label}
                  </NavLink>
                </li>
              ))}
            <li className="navbar__item navbar__item--cart">
              <NavLink to="/cart" className="navbar__link">
                <CartIcon />
              </NavLink>
            </li>
            {!isAuthenticated ? (
              <>
                <li className="navbar__item navbar__item--registration">
                  <NavLink to="/registration" className="navbar__link">
                    Реєстрація
                  </NavLink>
                </li>
                <li className="navbar__item navbar__item--login">
                  <NavLink to="/login" className="navbar__link">
                    Вхід
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="navbar__item navbar__item--user">
                  <NavLink to="/user" className="navbar__link">
                    {user?.role === 'admin' ? 'Адмін-панель' : <ProfileIcon />}
                  </NavLink>
                </li>
                <li className="navbar__item navbar__item--logout">
                  <button 
                    onClick={handleLogout}
                    className="navbar__link logout-button"
                    disabled={logoutMutation.isPending}
                  >
                    {logoutMutation.isPending ? 'Вихід...' : 'Вихід'}
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Menu
