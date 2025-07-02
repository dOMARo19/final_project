import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UserModal from '../modals/UserModal';

const initialUsers = [
  { id: 1, name: 'Іван Петренко', email: 'ivan@example.com', role: 'user' },
  { id: 2, name: 'Олена Коваль', email: 'olena@example.com', role: 'admin' },
  { id: 3, name: 'Петро Сидоренко', email: 'petro@example.com', role: 'user' },
];

const initialOrders = [
  { id: 101, user: 'Іван Петренко', total: 1200, status: 'Виконано' },
  { id: 102, user: 'Олена Коваль', total: 800, status: 'В обробці' },
  { id: 103, user: 'Петро Сидоренко', total: 500, status: 'Скасовано' },
];

const AdminPage = () => {
  const { user, login } = useAuth();
  const [users, setUsers] = useState(initialUsers);
  const [orders, setOrders] = useState(initialOrders);
  
  // Стани для модального вікна
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Додавання користувача
  const handleAddUser = () => {
    setEditingUser(null);
    setIsUserModalOpen(true);
  };

  // Редагування користувача
  const handleEditUser = (userToEdit: any) => {
    setEditingUser(userToEdit);
    setIsUserModalOpen(true);
  };

  // Збереження користувача
  const handleSaveUser = (userData: any) => {
    if (editingUser) {
      // Редагування
      setUsers(users.map(u => u.id === editingUser.id ? { ...userData, id: editingUser.id } : u));
    } else {
      // Додавання
      setUsers([...users, { ...userData, id: Date.now() }]);
    }
  };

  // Видалення користувача
  const handleDeleteUser = (id: number) => {
    if (window.confirm("Видалити користувача?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // Додавання замовлення
  const handleAddOrder = () => {
    const user = prompt("Ім'я користувача:");
    const total = prompt("Сума:");
    const status = prompt("Статус:", "В обробці");
    if (user && total && status) {
      setOrders([...orders, { id: Date.now(), user, total: Number(total), status }]);
    }
  };

  // Редагування замовлення
  const handleEditOrder = (id: number) => {
    const orderToEdit = orders.find(o => o.id === id);
    if (!orderToEdit) return;
    const user = prompt("Ім'я користувача:", orderToEdit.user);
    const total = prompt("Сума:", orderToEdit.total.toString());
    const status = prompt("Статус:", orderToEdit.status);
    if (user && total && status) {
      setOrders(orders.map(o => o.id === id ? { ...o, user, total: Number(total), status } : o));
    }
  };

  // Видалення замовлення
  const handleDeleteOrder = (id: number) => {
    if (window.confirm("Видалити замовлення?")) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  return (
    <div className="container">
      <div className="admin-page">
        <h1>Панель адміністратора</h1>
        <p>Вітаємо в адмін-панелі! Тут ви можете керувати товарами, замовленнями та користувачами.</p>
        
        <h2>Користувачі</h2>
        <button onClick={handleAddUser} className='btn-primary'>Додати користувача</button>
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
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => handleEditUser(u)} className='btn-primary'>Редагувати</button>
                  <button onClick={() => handleDeleteUser(u.id)} className='btn-secondary'>Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Замовлення</h2>
        <button onClick={handleAddOrder} className='btn-primary'>Додати замовлення</button>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Користувач</th>
              <th>Сума</th>
              <th>Статус</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.user}</td>
                <td>{o.total} грн</td>
                <td>{o.status}</td>
                <td>
                  <button onClick={() => handleEditOrder(o.id)} className='btn-primary'>Редагувати</button>
                  <button onClick={() => handleDeleteOrder(o.id)} className='btn-secondary'>Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
};

export default AdminPage;