import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Products</h1>
                <Link href="/admin/products/new" className="btn btn-primary">
                    Add Product
                </Link>
            </div>

            <div style={{ backgroundColor: 'var(--background)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: 'var(--secondary)' }}>
                        <tr>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Name</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Price</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>ID</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} style={{ borderTop: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>{product.name}</td>
                                <td style={{ padding: '1rem' }}>{formatCurrency(product.price)}</td>
                                <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{product.id}</td>
                                <td style={{ padding: '1rem' }}>
                                    {/* Placeholder for edit/delete */}
                                    <button style={{ color: 'var(--destructive)', fontSize: '0.875rem', fontWeight: 500 }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
