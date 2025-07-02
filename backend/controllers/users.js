import User from '../models/User.js';

// Отримати всіх користувачів (тільки адмін)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Отримати користувача за ID (тільки адмін)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Оновити користувача (адмін або сам користувач)
export const updateUser = async (req, res) => {
  try {
    // Адмін може оновлювати будь-якого користувача, звичайний користувач - тільки себе
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Недостатньо прав для виконання цієї дії' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    // Оновлення даних
    user.name = req.body.name || user.name;
    user.surname = req.body.surname || user.surname;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    // Тільки адмін може змінювати роль
    if (req.body.role && req.user.role === 'admin') {
      user.role = req.body.role;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      surname: updatedUser.surname,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      role: updatedUser.role,
      isEmailVerified: updatedUser.isEmailVerified,
      is2FAEnabled: updatedUser.is2FAEnabled
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Видалити користувача (тільки адмін)
export const deleteUser = async (req, res) => {
  try {
    // Адмін може видаляти будь-якого користувача, крім себе
    if (req.user.id === req.params.id) {
      return res.status(400).json({ message: 'Ви не можете видалити самого себе' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    await user.remove();
    res.json({ message: 'Користувача успішно видалено' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Отримати активні сеанси користувача (адмін або сам користувач)
export const getUserSessions = async (req, res) => {
  try {
    // Адмін може переглядати сеанси будь-якого користувача, звичайний користувач - тільки свої
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Недостатньо прав для виконання цієї дії' });
    }

    const user = await User.findById(req.params.id).select('activeSessions');
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    res.json(user.activeSessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Завершити сеанс користувача (адмін або сам користувач)
export const revokeUserSession = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    // Адмін може завершувати сеанси будь-якого користувача, звичайний користувач - тільки свої
    if (req.user.role !== 'admin' && req.user.id !== req.params.userId) {
      return res.status(403).json({ message: 'Недостатньо прав для виконання цієї дії' });
    }

    user.activeSessions = user.activeSessions.filter(
      session => session.sessionId !== req.params.sessionId
    );

    await user.save();
    res.json({ message: 'Сеанс успішно завершено' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Не авторизований' });
  }
  res.json(req.user);
};