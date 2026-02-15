import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
    return (
        <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CheckCircle size={64} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Payment Successful!</h1>
            <p style={{ color: 'var(--muted-foreground)', maxWidth: '500px', marginBottom: '2rem', lineHeight: 1.6 }}>
                Thank you for your order. We have received your payment and will start processing your order immediately. You will receive a confirmation email shortly.
            </p>
            <Link href="/" className="btn btn-primary">
                Continue Shopping
            </Link>
        </div>
    );
}
