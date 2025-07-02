import express from 'express';
const router = express.Router();
import { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/products.js';
import { protect } from '../middlewares/auth.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', protect, upload.single('image'), createProduct);
router.put('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;