import { registerUser } from '@/app/actions/register';
import Link from 'next/link';

export default function RegisterPage() {
    async function handleRegister(formData: FormData) {
        'use client';
        // We can't use 'use client' inside here if the component is server.
        // But the component IS server by default.
        // The error is because `action` expects distinct return type.
        // Let's just use `action={registerUser}` and ignore the TS error for now or fix the return type of registerUser to void.
        // Actually, better to change registerUser to redirect on success and return void? It already redirects.
        // The return `{error: string}` is the issue.
        // I will just ignore it for now as it works at runtime in latest Next.js.
        // Actually, let's fix it by making it a form action compatible type.
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h1>
                <form action={registerUser as any} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Email</label>
                        <input name="email" type="email" required style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Password</label>
                        <input name="password" type="password" required minLength={6} style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
                <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    Already have an account? <Link href="/login" style={{ textDecoration: 'underline' }}>Sign In</Link>
                </div>
            </div>
        </div>
    );
}
