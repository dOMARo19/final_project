import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ProductInterface } from '../types/product.interface';
import { categories } from '../config/categories';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductInterface) => void;
  product: ProductInterface | null;
}



const EditProductSchema = Yup.object().shape({
  name: Yup.string().required('Назва є обов\'язковою'),
  price: Yup.number().required('Ціна є обов\'язковою').positive('Ціна має бути позитивною'),
  category: Yup.string().required('Категорія є обов\'язковою'),
  description: Yup.string().required('Опис є обов\'язковим'),
  image: Yup.string().required('Зображення є обов\'язковим'),
  quantity: Yup.number().required('Кількість є обов\'язковою').min(0, 'Кількість не може бути від\'ємною'),
});

const EditProductModal: React.FC<EditProductModalProps> = ({ isOpen, onClose, onSave, product }) => {
  if (!product) return null;

  const initialValues = {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    image: product.image,
    quantity: product.quantity || 0,
  };

  const handleSubmit = (values: ProductInterface) => {
    onSave(values);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Редагувати товар"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Редагувати товар</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={EditProductSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="edit-product-form">
            <div className="form-group">
              <label htmlFor="name">Назва</label>
              <Field type="text" id="name" name="name" />
              {errors.name && touched.name && <div className="error">{errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Ціна</label>
              <Field type="number" id="price" name="price" />
              {errors.price && touched.price && <div className="error">{errors.price}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Категорія</label>
              <Field as="select" id="category" name="category">
                <option value="">Виберіть категорію</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Field>
              {errors.category && touched.category && <div className="error">{errors.category}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Опис</label>
              <Field as="textarea" id="description" name="description" />
              {errors.description && touched.description && <div className="error">{errors.description}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Зображення (URL)</label>
              <Field type="text" id="image" name="image" />
              {errors.image && touched.image && <div className="error">{errors.image}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="quantity">Кількість</label>
              <Field type="number" id="quantity" name="quantity" />
              {errors.quantity && touched.quantity && <div className="error">{errors.quantity}</div>}
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="btn-primary">Зберегти зміни</button>
              <button type="button" className="btn-secondary" onClick={onClose}>Скасувати</button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditProductModal;