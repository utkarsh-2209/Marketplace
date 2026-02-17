'use client';

import { useCart } from '@/context/CartContext';

// Define a minimal product type for the props
type Product = {
    id: string;
    name: string;
    price: number;
    image: string | null;
};

export default function ProductAddToCart({ product }: { product: Product }) {
    const { addItem } = useCart();

    return (
        <button
            onClick={() => addItem(product)}
            className="btn btn-primary"
            style={{ marginTop: 'auto', width: '100%' }}
        >
            Add to Cart
        </button>
    );
}
