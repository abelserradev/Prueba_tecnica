import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import NavigationProgress from '@/components/navigation-progress';
import { CartProvider } from '@/contexts/cart-context';
import { FavoritesProvider } from '@/contexts/favorites-context';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL 
  || process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'SambilStore - Tu tienda online de confianza',
    template: '%s | SambilStore',
  },
  description: 'Descubre los mejores productos en nuestra tienda online. Electrónica, joyería, ropa y más con envío rápido.',
  keywords: ['tienda online', 'ecommerce', 'productos', 'compras', 'electrónica', 'joyería', 'ropa'],
  authors: [{ name: 'SambilStore Team' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName: 'SambilStore',
    title: 'SambilStore - Tu tienda online de confianza',
    description: 'Descubre los mejores productos en nuestra tienda online.',
    images: [
      {
        url: '/logo_sambil.jpg',
        width: 400,
        height: 400,
        alt: 'Sambil Venezuela Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SambilStore - Tu tienda online de confianza',
    description: 'Descubre los mejores productos en nuestra tienda online.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <FavoritesProvider>
            <NavigationProgress />
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
