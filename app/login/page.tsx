'use client';
// Note: We need client for useActionState (or similar) but let's stick to simple form action to `authenticate` action later.
// Actually, NextAuth v5 recommends server actions for login too.
// Let's create `app/actions/auth.ts` for login as well.

import { authenticate } from '@/app/actions/auth';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>Sign In</h1>
                <form action={authenticate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Email</label>
                        <input name="email" type="email" required style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Password</label>
                        <input name="password" type="password" required style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
                <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    Don't have an account? <Link href="/register" style={{ textDecoration: 'underline' }}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
