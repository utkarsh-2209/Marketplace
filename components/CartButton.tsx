'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

export function CartButton() {
    const { itemCount, setIsOpen } = useCart();

    return (
        <button
            className="btn btn-outline"
            style={{ padding: '0.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            onClick={() => setIsOpen(true)}
        >
            <ShoppingBag size={20} />
            <span style={{ fontSize: '0.875rem' }}>{itemCount}</span>
        </button>
    );
}
