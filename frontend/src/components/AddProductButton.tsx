import React, { useState } from 'react'
import AddProductModal from '../modals/AddProductModal'
import { ProductInterface } from '../types/product.interface'

interface AddProductButtonProps {
    onProductAdded: (product: ProductInterface) => void
    className?: string
}

const AddProductButton = ({onProductAdded, className}: AddProductButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newProduct, setNewProduct] = useState<ProductInterface | null>(null)

    const handleProductAdded = (product: ProductInterface) => {
        setNewProduct(product)
        onProductAdded(product)
        setIsModalOpen(false)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)} className={className}>Додати продукт</button>
            <AddProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onProductAdded={handleProductAdded}
            />
        </div>
  )
}

export default AddProductButton
