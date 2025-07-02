import Order from '../models/Order.js';

// Отримати всі замовлення
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name lastName email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Отримати замовлення за ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Замовлення не знайдено' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Створити нове замовлення
export const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Оновити замовлення
export const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Замовлення не знайдено' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Видалити замовлення
export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Замовлення не знайдено' });
        }
        res.status(200).json({ message: 'Замовлення успішно видалено' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Отримати всі замовлення поточного користувача
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('user', 'name lastName email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

