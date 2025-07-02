import { ProductInterface } from '../types/product.interface';
import { FilterInterface } from '../types/filter.interface';

export const filterProducts = (products: ProductInterface[], filters: FilterInterface): ProductInterface[] => {
    let filteredProducts = [...products];

    // Пошук за назвою та описом
    if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }

    // Фільтр за категорією
    if (filters.category) {
        filteredProducts = filteredProducts.filter(product =>
            product.category === filters.category
        );
    }

    // Фільтр за діапазоном цін
    filteredProducts = filteredProducts.filter(product =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Сортування
    filteredProducts.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (filters.sortBy) {
            case 'name':
                aValue = a.name.toLowerCase();
                bValue = b.name.toLowerCase();
                break;
            case 'price':
                aValue = a.price;
                bValue = b.price;
                break;
            case 'category':
                aValue = a.category.toLowerCase();
                bValue = b.category.toLowerCase();
                break;
            default:
                aValue = a.name.toLowerCase();
                bValue = b.name.toLowerCase();
        }

        if (filters.sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    return filteredProducts;
}; 