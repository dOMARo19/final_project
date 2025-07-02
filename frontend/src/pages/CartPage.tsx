import React from 'react';
import Cart from '../components/Cart';

const CartPage = () => {
    return (
        <div className="container">
            <div className="page-header">
                <h1 className="page-title">Кошик</h1>
            </div>
            <Cart />
        </div>
    );
};

export default CartPage; 