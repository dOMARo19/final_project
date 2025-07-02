import React from 'react'
import Modal from 'react-modal'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { ProductInterface } from '../types/product.interface'
import { useCreateProduct } from '../hooks/useProducts'
import { categories } from '../config/categories'

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProductAdded: (product: ProductInterface) => void;
}

const AddProductSchema = Yup.object().shape({
    name: Yup.string().required('Назва є обов\'язковою'),
    price: Yup.number().required('Ціна є обов\'язковою'),
    category: Yup.string().required('Категорія є обов\'язковою'),
    description: Yup.string().required('Опис є обов\'язковим'),
    image: Yup.string().required('Зображення є обов\'язковим'),
})

const AddProductModal = ({isOpen, onClose, onProductAdded}: AddProductModalProps) => {
    const createProductMutation = useCreateProduct()

    const handleSubmit = async (values: ProductInterface) => {
        try {
            // Видаляємо id, оскільки сервер генерує його автоматично
            const { id, ...productData } = values
            await createProductMutation.mutateAsync(productData)
            onProductAdded(values)
            onClose()
        } catch (error) {
            console.error('Помилка при створенні продукту:', error)
            alert('Помилка при створенні продукту')
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Додати продукт"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <h2>Додати продукт</h2>
            <Formik
                initialValues={{
                    id: 0,
                    name: '',
                    price: 0,
                    category: '',
                    description: '',
                    image: '/images/product-image.jpg',
                    quantity: 0
                }}
                validationSchema={AddProductSchema}
                onSubmit={handleSubmit}
            >
                {({errors, touched}) => (
                    <Form className="add-product-form">
                        <div className="form-group">
                            <label htmlFor="name" className="modal-title">Назва</label>
                            <Field type="text" id="name" name="name" />
                            {errors.name && touched.name && <div className="error">{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="price" className="modal-title">Ціна</label>
                            <Field type="number" id="price" name="price" />
                            {errors.price && touched.price && <div className="error">{errors.price}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="category" className="modal-title">Категорія</label>
                            <Field as="select" id="category" name="category" className="form-select">
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
                            <label htmlFor="description" className="modal-title">Опис</label>
                            <Field type="text" id="description" name="description" />
                            {errors.description && touched.description && <div className="error">{errors.description}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="image" className="modal-title">Зображення (URL або шлях)</label>
                            <Field 
                                type="text" 
                                id="image" 
                                name="image" 
                                placeholder="/images/product-image.jpg"
                            />
                            <small className="form-help">Використовуйте URL зображення або шлях до файлу в папці public/images/</small>
                            {errors.image && touched.image && <div className="error">{errors.image}</div>}
                        </div>
                        <button 
                            type="submit" 
                            className="btn-primary" 
                            disabled={createProductMutation.isPending}
                        >
                            {createProductMutation.isPending ? 'Додавання...' : 'Додати продукт'}
                        </button>
                        <button 
                            type="button" 
                            className="btn-secondary" 
                            onClick={onClose}
                            disabled={createProductMutation.isPending}
                        >
                            Закрити
                        </button>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default AddProductModal
