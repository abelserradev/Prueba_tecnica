import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 mt-16" role="contentinfo">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start space-x-3 mb-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo_sambil.jpg"
                  alt="Sambil Venezuela Logo"
                  fill
                  className="object-contain"
                  sizes="32px"
                />
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>SambilStore</h3>
            </Link>
            <p className="text-sm text-gray-600">
              Tu tienda online de confianza con los mejores productos del mercado.
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-md font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:opacity-80 transition-colors focus:outline-none focus:ring-2 rounded" style={{ color: 'inherit' }}>
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="hover:opacity-80 transition-colors focus:outline-none focus:ring-2 rounded" style={{ color: 'inherit' }}>
                  Categorías
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-md font-semibold text-text-primary mb-3">Contacto</h4>
            <p className="text-sm text-gray-600">
              Email: info@sambilstore.com<br />
              Teléfono: 02121112233
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} SambilStore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
