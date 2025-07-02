import React, { useState } from 'react'
import Modal from 'react-modal'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useCreateOrder } from '../hooks/useOrders'
import { useNavigate } from 'react-router-dom'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const createOrder = useCreateOrder()
  const navigate = useNavigate()

  // Стейти для полів форми
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [delivery, setDelivery] = useState('')
  const [payment, setPayment] = useState('')

  if (!user) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Оформлення замовлення"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="modal-title">Оформлення замовлення</h2>
        <p className="modal-text">Щоб оформити замовлення, увійдіть у свій акаунт.</p>
        <button className="btn-primary" onClick={() => { navigate('/login'); onClose(); }}>Увійти</button>
        <button className="btn-secondary" onClick={onClose}>Скасувати</button>
      </Modal>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Формуємо масив items для замовлення
    const orderItems = items.map(item => ({
      name: name,
      phone: phone,
      address: address,
      delivery: delivery,
      payment: payment
    }))

    // Формуємо payload
    const orderData: any = {
      user: user._id, // додаємо userId
      items: orderItems,
      total: getTotalPrice(),
      shippingAddress: address,
      paymentMethod: payment,
      customerName: name,
      customerPhone: phone,
      deliveryMethod: delivery
    }

    try {
      await createOrder.mutateAsync(orderData)
      alert('Замовлення оформлено!')
      clearCart()
      onClose()
    } catch (err) {
      alert('Помилка при оформленні замовлення')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Оформлення замовлення"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Оформлення замовлення</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div>
          <label>Ім'я</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Телефон</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Адреса доставки</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="delivery">Спосіб доставки</label>
          <select id="delivery" name="delivery" value={delivery} onChange={e => setDelivery(e.target.value)} required>
            <option value="">Оберіть спосіб доставки</option>
            <option value="nova_poshta">Нова Пошта</option>
            <option value="ukrposhta">Укрпошта</option>
            <option value="courier">Кур'єр</option>
            <option value="pickup">Самовивіз</option>
          </select>
        </div>
        <div>
          <label htmlFor="payment">Спосіб оплати</label>
          <select id="payment" name="payment" value={payment} onChange={e => setPayment(e.target.value)} required>
            <option value="">Оберіть спосіб оплати</option>
            <option value="card">Карткою онлайн</option>
            <option value="cod">Післяплата</option>
            <option value="cash">Готівкою при отриманні</option>
          </select>
        </div>
        <div>
          <strong>Сума до сплати: {getTotalPrice()} грн</strong>
        </div>
        <button type="submit" className="btn-primary">Підтвердити замовлення</button>
        <button type="button" className="btn-secondary" onClick={onClose}>Скасувати</button>
      </form>
    </Modal>
  )
}

export default CheckoutModal