import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils'; // Keep using the helper since it exists.

export default async function AdminDashboard() {
    const productCount = await prisma.product.count();
    const orderCount = await prisma.order.count();
    const totalRevenueData = await prisma.order.aggregate({
        _sum: { total: true },
        where: { status: 'paid' } // Assuming 'paid' status exists
    });
    const totalRevenue = totalRevenueData._sum.total || 0;

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Dashboard Overview</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div style={{ backgroundColor: 'var(--background)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>Total Revenue</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 700 }}>{formatCurrency(totalRevenue)}</p>
                </div>
                <div style={{ backgroundColor: 'var(--background)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>Orders</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 700 }}>{orderCount}</p>
                </div>
                <div style={{ backgroundColor: 'var(--background)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>Products</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 700 }}>{productCount}</p>
                </div>
            </div>
        </div>
    );
}
