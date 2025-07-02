export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: 'laptops', name: 'Ноутбуки' },
  { id: 'smartphones', name: 'Смартфони' },
  { id: 'tablets', name: 'Планшети' },
  { id: 'tvs', name: 'Телевізори' },
  { id: 'computers', name: 'Комп\'ютери' },
  { id: 'audio', name: 'Звукові колонки' },
  { id: 'accessories', name: 'Аксесуари' },
  { id: 'cameras', name: 'Фотокамери' },
  { id: 'games', name: 'Ігри' },
  { id: 'other', name: 'Інше' }
];

// Функція для отримання назви категорії за ID
export const getCategoryName = (categoryId: string): string => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : categoryId;
};

// Функція для отримання ID категорії за назвою
export const getCategoryId = (categoryName: string): string => {
  const category = categories.find(cat => cat.name === categoryName);
  return category ? category.id : categoryName;
}; 