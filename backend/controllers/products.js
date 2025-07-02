import Product from '../models/Product.js';

// Отримати всі продукти
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Отримати один продукт
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Створити продукт (тільки адмін)
export const createProduct = async (req, res) => {
  try {
    // Перевіряємо, чи користувач є адміністратором
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ заборонено. Потрібні права адміністратора.' });
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category, // Тепер це буде назва категорії
      stock: req.body.quantity || req.body.stock || 0, // Підтримуємо обидва варіанти
      image: req.body.image || (req.file ? req.file.path : undefined)
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Оновити продукт (тільки адмін)
export const updateProduct = async (req, res) => {
  try {
    // Перевіряємо, чи користувач є адміністратором
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ заборонено. Потрібні права адміністратора.' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category; // Тепер це назва категорії
    product.stock = req.body.quantity || req.body.stock || product.stock;
    if (req.body.image) product.image = req.body.image;
    if (req.file) product.image = req.file.path;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Видалити продукт (тільки адмін)
export const deleteProduct = async (req, res) => {
  try {
    // Перевіряємо, чи користувач є адміністратором
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ заборонено. Потрібні права адміністратора.' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};