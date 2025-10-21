import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SambilStore - Tu tienda online de confianza',
    short_name: 'SambilStore',
    description: 'Descubre los mejores productos en nuestra tienda online',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4FB6BE',
    icons: [
      {
        src: '/logo_sambil.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'any',
      },
      {
        src: '/logo_sambil.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
  };
}
