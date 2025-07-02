export interface FilterInterface {
    category: string;
    minPrice: number;
    maxPrice: number;
    searchQuery: string;
    sortBy: 'name' | 'price' | 'category';
    sortOrder: 'asc' | 'desc';
}

export interface FilterProps {
    filters: FilterInterface;
    onFilterChange: (filters: FilterInterface) => void;
} 