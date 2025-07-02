import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { HiMiniTrash, HiMiniPlus, HiMiniMinus } from "react-icons/hi2";
import CheckoutModal from '../modals/CheckoutModal';

const Cart = () => {
    const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    if (items.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Кошик порожній</h2>
                <p>Додайте товари з каталогу</p>
            </div>
        );
    }

    return (
        <div className="cart">
            <div className="cart-header">
                <h2>Кошик ({getTotalItems()} товарів)</h2>
                <button onClick={clearCart} className="btn-clear-cart">
                    Очистити кошик
                </button>
            </div>
            
            <div className="cart-items">
                {items.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item__image" />
                        <div className="cart-item__info">
                            <h3 className="cart-item__name">{item.name}</h3>
                            <p className="cart-item__price">{item.price} грн</p>
                        </div>
                        <div className="cart-item__quantity">
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="btn-quantity"
                            >
                                <HiMiniMinus />
                            </button>
                            <span className="quantity-display">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="btn-quantity"
                            >
                                <HiMiniPlus />
                            </button>
                        </div>
                        <div className="cart-item__total">
                            <p>{item.price * item.quantity} грн</p>
                        </div>
                        <button 
                            onClick={() => removeFromCart(item.id)}
                            className="btn-remove"
                        >
                            <HiMiniTrash />
                        </button>
                    </div>
                ))}
            </div>
            
            <div className="cart-footer">
                <div className="cart-total">
                    <h3>Загальна сума: {getTotalPrice()} грн</h3>
                </div>
                <button
                    className="btn-checkout"
                    onClick={() => setIsCheckoutOpen(true)}
                >
                    Оформити замовлення
                </button>
            </div>
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
            />
        </div>
    );
};

export default Cart; 