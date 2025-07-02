import React from 'react';
import { FilterProps } from '../types/filter.interface';
import { HiMiniMagnifyingGlass, HiMiniFunnel } from "react-icons/hi2";
import { categories } from '../config/categories';

const ProductFilters: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
    const handleInputChange = (field: keyof typeof filters, value: any) => {
        onFilterChange({
            ...filters,
            [field]: value
        });
    };

    const clearFilters = () => {
        onFilterChange({
            category: '',
            minPrice: 0,
            maxPrice: 10000,
            searchQuery: '',
            sortBy: 'name',
            sortOrder: 'asc'
        });
    };

    return (
        <div className="product-filters">
            <div className="filters-header">
                <h3 className="filters-title">
                    <HiMiniFunnel className="filter-icon" />
                    Фільтри
                </h3>
                <button onClick={clearFilters} className="btn-clear-filters">
                    Очистити фільтри
                </button>
            </div>

            <div className="filters-content">
                {/* Пошук */}
                <div className="filter-group">
                    <label className="filter-label">Пошук</label>
                    <div className="search-input-wrapper">
                        <HiMiniMagnifyingGlass className="search-icon" />
                        <input
                            type="text"
                            placeholder="Пошук товарів..."
                            value={filters.searchQuery}
                            onChange={(e) => handleInputChange('searchQuery', e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                {/* Категорія */}
                <div className="filter-group">
                    <label className="filter-label">Категорія</label>
                    <select
                        value={filters.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Всі категорії</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Діапазон цін */}
                <div className="filter-group">
                    <label className="filter-label">Діапазон цін</label>
                    <div className="price-range">
                        <input
                            type="number"
                            placeholder="Мін. ціна"
                            value={filters.minPrice || ''}
                            onChange={(e) => handleInputChange('minPrice', Number(e.target.value) || 0)}
                            className="price-input"
                        />
                        <span className="price-separator">-</span>
                        <input
                            type="number"
                            placeholder="Макс. ціна"
                            value={filters.maxPrice || ''}
                            onChange={(e) => handleInputChange('maxPrice', Number(e.target.value))}
                            className="price-input"
                        />
                    </div>
                </div>

                {/* Сортування */}
                <div className="filter-group">
                    <label className="filter-label">Сортування</label>
                    <div className="sort-controls">
                        <select
                            value={filters.sortBy}
                            onChange={(e) => handleInputChange('sortBy', e.target.value as any)}
                            className="sort-select"
                        >
                            <option value="name">За назвою</option>
                            <option value="price">За ціною</option>
                            <option value="category">За категорією</option>
                        </select>
                        <button
                            onClick={() => handleInputChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="sort-order-btn"
                        >
                            {filters.sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFilters; 