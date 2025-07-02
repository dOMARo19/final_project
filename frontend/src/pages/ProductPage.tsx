import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../config/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ProductInterface } from '../types/product.interface';


const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    apiClient.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data as ProductInterface);
        setLoading(false);
      })
      .catch(() => {
        setError('Продукт не знайдено');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container"><p>Завантаження...</p></div>;
  if (error) return (
    <div className="container">
      <div className="product-not-found">
        <h2>{error}</h2>
        <button onClick={() => navigate('/')} className="btn-primary">
          Повернутися до продуктів
        </button>
      </div>
    </div>
  );
  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container">
      <div className="product-page">
        <button onClick={() => navigate('/')} className="back-button">
          ← Повернутися до продуктів
        </button>
        <div className="product-details">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <p className="product-category">Категорія: {product.category}</p>
            <p className="product-price">{product.price} грн</p>
            {user && user.role === 'admin' && (
              <p className="product-quantity">В наявності: {product.quantity} шт.</p>
            )}
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              Додати до кошика
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;