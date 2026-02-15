import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default function NewProductPage() {
    async function createProduct(formData: FormData) {
        'use server';

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const image = formData.get('image') as string;

        await prisma.product.create({
            data: {
                name,
                description,
                price,
                image,
            },
        });

        redirect('/admin/products');
    }

    return (
        <div style={{ maxWidth: '600px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Add Product</h1>

            <form action={createProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'var(--background)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Product Name</label>
                    <input name="name" type="text" required style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Description</label>
                    <textarea name="description" required rows={4} style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontFamily: 'inherit' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Price (USD)</label>
                    <input name="price" type="number" step="0.01" required style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Image URL</label>
                    <input name="image" type="url" placeholder="https://..." required style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Create Product
                </button>
            </form>
        </div>
    );
}
