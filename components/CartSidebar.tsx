'use client';

import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartSidebar() {
    const { isOpen, setIsOpen, items, removeItem, addItem, total } = useCart();

    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
            {/* Backdrop */}
            <div
                style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
                onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'var(--background)',
                height: '100%',
                boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Shopping Cart</h2>
                    <button onClick={() => setIsOpen(false)} style={{ padding: '0.5rem' }}>
                        <X size={20} />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    {items.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--muted-foreground)' }}>
                            Your cart is empty.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {items.map((item) => (
                                <div key={item.id} style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ width: '80px', height: '80px', flexShrink: 0, backgroundColor: '#f4f4f5', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                                        {item.product.image && (
                                            <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        )}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>{item.product.name}</h4>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>{formatCurrency(item.product.price)}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <button className="btn btn-outline" style={{ padding: '0.25rem' }} onClick={() => removeItem(item.id)}>
                                                <Trash2 size={14} />
                                            </button>
                                            <span style={{ fontSize: '0.875rem', margin: '0 0.5rem' }}>Qty: {item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', backgroundColor: 'var(--secondary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 600, fontSize: '1.125rem' }}>
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                        <Link
                            href="/checkout"
                            className="btn btn-primary"
                            style={{ width: '100%', textDecoration: 'none' }}
                            onClick={() => setIsOpen(false)}
                        >
                            Checkout
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
