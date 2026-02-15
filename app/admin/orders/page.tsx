import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: { items: true } // Include items to show count or details
    });

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Orders</h1>

            <div style={{ backgroundColor: 'var(--background)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: 'var(--secondary)' }}>
                        <tr>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Order ID</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Date</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Total</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} style={{ borderTop: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>{order.id.slice(0, 8)}...</td>
                                <td style={{ padding: '1rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: 500,
                                        backgroundColor: order.status === 'paid' ? '#dcfce7' : '#f4f4f5',
                                        color: order.status === 'paid' ? '#166534' : '#52525b'
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>{formatCurrency(order.total)}</td>
                                <td style={{ padding: '1rem' }}>{order.items.length}</td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
