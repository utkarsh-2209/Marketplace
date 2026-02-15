'use client';

import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
    const { items, total } = useCart();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (items.length > 0) {
            // Create PaymentIntent as soon as the page loads
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: items.map(item => ({ id: item.product.id, quantity: item.quantity })) }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [items]);

    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#000000',
        },
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Checkout</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem' }}>
                {/* Form */}
                <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Shipping Information</h2>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input type="text" placeholder="First Name" style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%' }} />
                            <input type="text" placeholder="Last Name" style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%' }} />
                        </div>
                        <input type="email" placeholder="Email" style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%' }} />
                        <input type="text" placeholder="Address" style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                            <input type="text" placeholder="City" style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%' }} />
                            <input type="text" placeholder="State" style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%' }} />
                            <input type="text" placeholder="ZIP" style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%' }} />
                        </div>
                    </form>

                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>Payment</h2>
                    <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                        {clientSecret ? (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm clientSecret={clientSecret} total={total} />
                            </Elements>
                        ) : (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>
                                {items.length === 0 ? "Cart is empty" : "Loading payment details..."}
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div>
                    <div style={{ backgroundColor: 'var(--secondary)', padding: '1.5rem', borderRadius: 'var(--radius)', position: 'sticky', top: '6rem' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Order Summary</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                            {items.map((item) => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                    <span>{item.product.name} x {item.quantity}</span>
                                    <span>{formatCurrency(item.product.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

