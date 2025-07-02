import React, { useEffect, useState } from 'react';
import apiClient from '../config/api';
import { useAuth } from '../context/AuthContext';
import { useUserOrders, useOrders } from '../hooks/useOrders';
import { useLogout } from '../hooks/useAuth';
import { useUsers } from '../hooks/useUsers';
import { useUpdateOrderStatus } from '../hooks/useOrders';
import UserModal from '../modals/UserModal';

interface UserData {
  _id: string;
  name: string;
  lastName?: string;
  surname?: string;
  phoneNumber?: string;
  phone?: string;
  email: string;
  address?: string;
}

const UserProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useUserOrders();
  const logoutMutation = useLogout();

  // Адмін-хуки
  const { data: allUsers = [], isLoading: usersLoading, error: usersError } = useUsers();
  const { data: allOrders = [], isLoading: allOrdersLoading, error: allOrdersError } = useOrders();
  const updateOrderStatusMutation = useUpdateOrderStatus();

  // Стани для модального вікна користувача
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleLogout = () => {
    if (window.confirm('Ви впевнені, що хочете вийти з профілю?')) {
      logoutMutation.mutate();
    }
  };

  // Адмін-функції
  const handleAddUser = () => {
    setEditingUser(null);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (userToEdit: any) => {
    setEditingUser(userToEdit);
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (userData: any) => {
    // Тут буде логіка збереження користувача
    console.log('Збереження користувача:', userData);
    setIsUserModalOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Видалити користувача?")) {
      // Тут буде логіка видалення користувача
      console.log('Видалення користувача:', userId);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    updateOrderStatusMutation.mutate({ orderId, status });
  };

  useEffect(() => {
    if (!user) {
      setError('Користувач не авторизований');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    apiClient.get(`/users/${user._id}`)
      .then(res => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Не вдалося завантажити дані користувача');
        setLoading(false);
      });
  }, [user]);

  if (loading) return <div className="container"><p>Завантаження...</p></div>;
  if (error) return <div className="container"><p>{error}</p></div>;
  if (!userData) return null;

  return (
    <div className="container">
      <div className="user-profile">
        <div className="user-profile-header">
          <h1>{user?.role === 'admin' ? 'Панель адміністратора' : 'Профіль користувача'}</h1>
          <button 
            onClick={handleLogout}
            className="logout-profile-button"
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? 'Вихід...' : 'Вийти з профілю'}
          </button>
        </div>

        {/* Інформація про користувача */}
        <div className="user-info">
          <p><strong>Імʼя:</strong> {userData.name}</p>
          <p><strong>Прізвище:</strong> {userData.lastName || userData.surname || '-'}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Телефон:</strong> {userData.phoneNumber || userData.phone || '-'}</p>
          <p><strong>Адреса:</strong> {userData.address || '-'}</p>
          <p><strong>Роль:</strong> {user?.role}</p>
        </div>

        {/* Адмін-панель для адміністраторів */}
        {user?.role === 'admin' && (
          <div className="admin-panel">
            <h2>Керування користувачами</h2>
            {usersLoading && <p>Завантаження користувачів...</p>}
            {usersError && <p>Помилка при завантаженні користувачів</p>}
            {!usersLoading && !usersError && (
              <>
                <button onClick={handleAddUser} className="btn-primary">Додати користувача</button>
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Ім'я</th>
                        <th>Email</th>
                        <th>Роль</th>
                        <th>Дії</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map((u: any) => (
                        <tr key={u._id}>
                          <td title={u._id}>{u._id ? u._id.substring(0, 8) + '...' : ''}</td>
                          <td title={`${u.name} ${u.lastName}`}>{u.name} {u.lastName}</td>
                          <td title={u.email}>{u.email}</td>
                          <td>{u.role}</td>
                          <td>
                            <button onClick={() => handleEditUser(u)} className="btn-primary">Редагувати</button>
                            <button onClick={() => handleDeleteUser(u._id)} className="btn-secondary">Видалити</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <h2>Керування замовленнями</h2>
            {allOrdersLoading && <p>Завантаження замовлень...</p>}
            {allOrdersError && <p>Помилка при завантаженні замовлень</p>}
            {!allOrdersLoading && !allOrdersError && (
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Користувач</th>
                      <th>Сума</th>
                      <th>Статус</th>
                      <th>Дата</th>
                      <th>Дії</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map((order: any) => (
                      <tr key={order._id}>
                        <td title={order._id}>{order._id ? order._id.substring(0, 8) + '...' : ''}</td>
                        <td title={order.user && (order.user.name || order.user.email)}>
                          {order.user ? `${order.user.name || ''} ${order.user.lastName || ''}`.trim() : '—'}
                        </td>
                        <td>{order.totalAmount} грн</td>
                        <td>
                          <select 
                            value={order.status} 
                            onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                            disabled={updateOrderStatusMutation.isPending}
                          >
                            <option value="pending">В обробці</option>
                            <option value="processing">Обробляється</option>
                            <option value="shipped">Відправлено</option>
                            <option value="delivered">Доставлено</option>
                            <option value="cancelled">Скасовано</option>
                          </select>
                        </td>
                        <td title={order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}>
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
                        </td>
                        <td>
                          <button 
                            className="btn-primary"
                            disabled={updateOrderStatusMutation.isPending}
                          >
                            <span role="img" aria-label="update">🔄</span>
                            {updateOrderStatusMutation.isPending ? 'Оновлення...' : 'Оновити'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Історія замовлень користувача */}
        <div className="user-orders">
          <h2>Мої замовлення</h2>
          {ordersLoading && <p>Завантаження замовлень...</p>}
          {ordersError && <p>Помилка при завантаженні замовлень</p>}
          {orders && orders.length === 0 && <p>Замовлень ще немає.</p>}
          {orders && orders.length > 0 && (
            <ul>
              {orders.map((order: any) => (
                <li key={order._id}>
                  <div>Дата: {new Date(order.createdAt).toLocaleString()}</div>
                  <div>Сума: {order.totalAmount} грн</div>
                  <div>Статус: {order.status}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Модальне вікно для користувачів */}
        <UserModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          onSave={handleSaveUser}
          user={editingUser}
        />
      </div>
    </div>
  );
}

export default UserProfile