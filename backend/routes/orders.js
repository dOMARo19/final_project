import express from 'express';
import {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrders
} from '../controllers/orders.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Маршрути для замовлень
router.get('/my', protect, getUserOrders); // Отримати всі замовлення поточного користувача
router.get('/', getAllOrders);           // Отримати всі замовлення
router.get('/:id', getOrderById);        // Отримати замовлення за ID
router.post('/', createOrder);           // Створити нове замовлення
router.put('/:id', updateOrder);         // Оновити замовлення
router.delete('/:id', deleteOrder);      // Видалити замовлення

export default router;
