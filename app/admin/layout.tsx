import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--secondary)' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: 'var(--background)', borderRight: '1px solid var(--border)', padding: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>Admin Panel</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius)', color: 'var(--foreground)' }}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/admin/products" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius)', color: 'var(--foreground)' }}>
                        <Package size={20} />
                        Products
                    </Link>
                    <Link href="/admin/orders" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius)', color: 'var(--foreground)' }}>
                        <ShoppingCart size={20} />
                        Orders
                    </Link>
                </nav>
            </aside>

            {/* Content */}
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
