export interface CartItemInterface {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export interface CartContextType {
    items: CartItemInterface[];
    addToCart: (product: any) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
} 