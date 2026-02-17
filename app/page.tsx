import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'var(--secondary)',
        padding: '6rem 0',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem'
      }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.025em' }}>
          Curated Premium Goods
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', maxWidth: '600px', margin: '0 1rem' }}>
          Discover our collection of high-quality, handcrafted items designed for modern living.
        </p>
        <Link href="/products" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem 2rem', fontSize: '1rem' }}>
          Shop Collection
        </Link>
      </section>

      {/* Featured Products */}
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Featured Products</h2>
          <Link href="/products" style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            View All
          </Link>
        </div>

        <div className="grid-products">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} style={{ display: 'block' }}>
              <div style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                transition: 'transform 0.2s ease',
                backgroundColor: 'var(--background)'
              }}
              // Inline hover styles are tricky in React, using class or global css is better. 
              // For simplicity, relying on structure.
              >
                <div style={{ position: 'relative', height: '300px', width: '100%', backgroundColor: '#f4f4f5' }}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted-foreground)' }}>
                      No Image
                    </div>
                  )}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{product.name}</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)' }}>{formatCurrency(product.price)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
