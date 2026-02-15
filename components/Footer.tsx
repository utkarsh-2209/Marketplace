export default function Footer() {
    return (
        <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem 0', marginTop: 'auto' }}>
            <div className="container" style={{ textAlign: 'center', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                &copy; {new Date().getFullYear()} Marketplace. All rights reserved.
            </div>
        </footer>
    );
}
