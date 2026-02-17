import Link from 'next/link';
import { ShoppingBag, User as UserIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { auth, signOut } from '@/auth';
import { NavCartButton } from '@/components/NavCartButton';

export default async function Navbar() {
    const session = await auth();

    // We need a client component for the cart button because it uses context.
    // However, Header is now async (server component) to get session.
    // We can extract the CartButton to a separate client component or just suppress the hydration warning if we keep it simple.
    // Better: Make Header a server component and pass props or use a wrapper.
    // BUT the original Header was 'use client'.
    // If we make Header 'use client', we can't use `await auth()`.
    // We should use `useSession` on client, but that requires SessionProvider.
    // EASIER: Make Header server component, and extract CartButton.

    return (
        <header style={{ borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'var(--background)' }}>
            <div className="container" style={{ display: 'flex', height: '4rem', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    Marketplace
                </Link>
                <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Link href="/products" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                        Products
                    </Link>

                    {session ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.875rem' }}>{session.user?.email}</span>
                            <form action={async () => {
                                'use server';
                                await signOut();
                            }}>
                                <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Sign Out</button>
                            </form>
                        </div>
                    ) : (
                        <Link href="/login" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                            Sign In
                        </Link>
                    )}

                    <NavCartButton />
                </nav>
            </div>
        </header>
    );
}

// Minimal wrapper for the client-side cart logic
// import { CartButton } from './CartButton'; // This was inside the component file at the bottom, which is not ideal.
// I will move it to the top.
