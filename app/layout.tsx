import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import NavigationProgress from '@/components/navigation-progress';
import { CartProvider } from '@/contexts/cart-context';
import { FavoritesProvider } from '@/contexts/favorites-context';
import { APP_URL, METADATA_CONFIG } from '@/lib/config';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${METADATA_CONFIG.appName} - ${METADATA_CONFIG.description}`,
    template: `%s | ${METADATA_CONFIG.appName}`,
  },
  description: 'Descubre los mejores productos en nuestra tienda online. Electrónica, joyería, ropa y más con envío rápido.',
  keywords: [...METADATA_CONFIG.keywords],
  authors: [{ name: `${METADATA_CONFIG.appName} Team` }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: METADATA_CONFIG.locale,
    url: '/',
    siteName: METADATA_CONFIG.siteName,
    title: `${METADATA_CONFIG.appName} - ${METADATA_CONFIG.description}`,
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
    title: `${METADATA_CONFIG.appName} - ${METADATA_CONFIG.description}`,
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
      <body className="flex flex-col min-h-screen w-full">
        <CartProvider>
          <FavoritesProvider>
            <NavigationProgress />
            <Header />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
