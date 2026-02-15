'use client';

import { useState, useEffect } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export default function CheckoutForm({ clientSecret, total }: { clientSecret: string; total: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const { items } = useCart();

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/checkout/success`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || "An unexpected error occurred.");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1.5rem' }}
            >
                <span id="button-text">
                    {isLoading ? "Processing..." : `Pay ${formatCurrency(total)}`}
                </span>
            </button>
            {message && <div id="payment-message" style={{ color: 'var(--destructive)', marginTop: '1rem', fontSize: '0.875rem' }}>{message}</div>}
        </form>
    );
}
