import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

// Force dynamic rendering to handle search params/dynamic routes if needed using params
// Next.js 15 app router dynamic params
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        notFound();
    }

    return (
        <div className="container" style={{ padding: '4rem 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            {/* Image */}
            <div style={{ backgroundColor: '#f4f4f5', borderRadius: 'var(--radius)', overflow: 'hidden', height: 'fit-content' }}>
                {product.image ? (
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                ) : (
                    <div style={{ padding: '4rem', textAlign: 'center' }}>No Image</div>
                )}
            </div>
            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{product.name}</h1>
                    <p style={{ fontSize: '1.5rem', fontWeight: 500 }}>{formatCurrency(product.price)}</p>
                </div>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{product.description}</p>

                <AddToCartButton product={product} />
            </div>
        </div>
    );
}
