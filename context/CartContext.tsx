'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
    id: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
};

type CartContextType = {
    items: CartItem[];
    addItem: (product: CartItem['product']) => void;
    removeItem: (productId: string) => void;
    itemCount: number;
    total: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const addItem = (product: CartItem['product']) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { id: product.id, quantity: 1, product }];
        });
        setIsOpen(true);
    };

    const removeItem = (productId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, itemCount, total, isOpen, setIsOpen }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
