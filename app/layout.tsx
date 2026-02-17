import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";

export const metadata: Metadata = {
  title: "Premium Marketplace",
  description: "A premium e-commerce experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <SiteFooter />
            <CartSidebar />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
