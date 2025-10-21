import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  description: 'La página que buscas no existe.',
};

export default function NotFound() {
  return (
    <div className="container-custom min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Página no encontrada
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>
        <div className="space-x-4">
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
          <Link 
            href="/categorias" 
            className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
          >
            Ver categorías
          </Link>
        </div>
      </div>
    </div>
  );
}
