import React from 'react';
import { useCart } from '../context/CartContext';
import { HiMiniShoppingCart } from "react-icons/hi2";

const CartIcon = () => {
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();

    return (
        <div className="cart-icon">
            <HiMiniShoppingCart className="cart-icon__svg" />
            {totalItems > 0 && (
                <span className="cart-icon__badge">{totalItems}</span>
            )}
        </div>
    );
};

export default CartIcon; 