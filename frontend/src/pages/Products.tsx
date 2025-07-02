import React, { useState } from 'react'
import { ProductInterface } from '../types/product.interface'
import { FilterInterface } from '../types/filter.interface'
import AddProductButton from '../components/AddProductButton'
import ProductFilters from '../components/ProductFilters'
import { useCart } from '../context/CartContext'
import { filterProducts } from '../helpers/productFilters'
import { HiMiniArchiveBoxXMark } from "react-icons/hi2";
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import EditProductModal from '../modals/EditProductModal'
import { useProducts, useDeleteProduct, useUpdateProduct } from '../hooks/useProducts.ts'
import { categories } from '../config/categories'

const Products = () => {
  const [filters, setFilters] = useState<FilterInterface>({
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Використовуємо React Query хуки
  const { data: products = [], isLoading, error } = useProducts(filters);
  const deleteProductMutation = useDeleteProduct();
  const updateProductMutation = useUpdateProduct();

  // Стани для модального вікна редагування
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductInterface | null>(null);



  const handleProductAdded = (newProduct: ProductInterface) => {
    // React Query автоматично оновить кеш після мутації
  };

  const handleDeleteProduct = (id: number) => {
    deleteProductMutation.mutate(id);
  }

  const handleAddToCart = (product: ProductInterface) => {
    addToCart(product);
  };

  const handleFilterChange = (newFilters: FilterInterface) => {
    setFilters(newFilters);
  };

  // Фільтруємо продукти
  const filteredProducts = filterProducts(products, filters);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  // Відкриття модального вікна для редагування
  const handleEditProduct = (product: ProductInterface) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  // Збереження відредагованого товару
  const handleSaveProduct = (updatedProduct: ProductInterface) => {
    updateProductMutation.mutate({
      id: updatedProduct.id,
      productData: updatedProduct
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="container">
      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">Помилка завантаження товарів</p>}
      {!isLoading && !error && (
        <>
          <div className="products-header">
            <h1 className="products-title">Товари</h1>
            {user && user.role === 'admin' && (
              <AddProductButton onProductAdded={handleProductAdded} className="btn-primary" />
            )}
          </div>
          
          <div className="products-layout">
            <aside className="filters-sidebar">
              <ProductFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </aside>
            
            <main className="products-main">
              {filteredProducts.length === 0 ? (
                <div className="no-products">
                  <h3>Товари не знайдено</h3>
                  <p>Спробуйте змінити фільтри або пошуковий запит</p>
                </div>
              ) : (
                <>
                  <div className="products-info">
                    <p>Знайдено товарів: {filteredProducts.length}</p>
                  </div>
                  <ul className="products-list">
                    {filteredProducts.map((product) => (
                      <li key={product.id} className="product-item">
                        <h2 className="product-item__title">{product.name}</h2>
                        <p className="product-item__description">{product.description}</p>
                        <img src={product.image} alt={product.name} className="product-item__image" />
                        <p className="product-item__price">{product.price} грн</p>
                        <p className="product-item__category">Категорія: {product.category}</p>
                        
                        {user && user.role === 'admin' && (
                          <p className="product-item__quantity">В наявності: {product.quantity} шт.</p>
                        )}
                        
                        <div className="product-item__actions">
                          {(!user || user.role !== 'admin') && (
                            <button 
                              className="btn-primary" 
                              onClick={() => handleAddToCart(product)}
                            >
                              Додати до кошика
                            </button>
                          )}
                          
                          <button 
                            className="btn-primary"
                            onClick={() => handleProductClick(product.id)}
                          >
                            Детальніше
                          </button>
                          
                          {user && user.role === 'admin' && (
                            <>
                              <button 
                                className="btn-primary"
                                onClick={() => handleEditProduct(product)}
                              >
                                Редагувати
                              </button>
                              <button 
                                className="btn-primary" 
                                onClick={() => handleDeleteProduct(product.id)}
                                disabled={deleteProductMutation.isPending}
                              >
                                {deleteProductMutation.isPending ? 'Видалення...' : <HiMiniArchiveBoxXMark />}
                              </button>
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </main>
          </div>
        </>
      )}

      {/* Модальне вікно для редагування товару */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  )
}

export default Products
