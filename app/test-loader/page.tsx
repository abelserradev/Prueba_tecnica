import Loader from '@/components/loader';

export const metadata = {
  title: 'Test Loader - Ver animación',
  description: 'Página para probar el loader animado',
};

export default function TestLoaderPage() {
  return (
    <div className="container-custom py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          Prueba del Loader
        </h1>
        <p className="text-gray-600 mb-4">
          Aquí puedes ver el loader animado que se muestra durante las cargas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Loader en fondo blanco */}
        <div className="card p-8">
          <h2 className="text-xl font-bold mb-4 text-center" style={{ color: 'var(--color-text-primary)' }}>
            Fondo Blanco
          </h2>
          <div className="bg-white rounded-lg" style={{ minHeight: '300px' }}>
            <Loader />
          </div>
        </div>

        {/* Loader en fondo gris */}
        <div className="card p-8">
          <h2 className="text-xl font-bold mb-4 text-center" style={{ color: 'var(--color-text-primary)' }}>
            Fondo Gris
          </h2>
          <div className="bg-gray-50 rounded-lg" style={{ minHeight: '300px' }}>
            <Loader />
          </div>
        </div>

        {/* Loader pequeño */}
        <div className="card p-8">
          <h2 className="text-xl font-bold mb-4 text-center" style={{ color: 'var(--color-text-primary)' }}>
            Tamaño Pequeño
          </h2>
          <div className="bg-white rounded-lg flex items-center justify-center" style={{ minHeight: '200px' }}>
            <div className="spinner" style={{ width: '40px', height: '40px' }}>
              <div className="spinner-bar" style={{ '--delay': 0.1, '--rotation': 36, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.2, '--rotation': 72, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.3, '--rotation': 108, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.4, '--rotation': 144, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.5, '--rotation': 180, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.6, '--rotation': 216, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.7, '--rotation': 252, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.8, '--rotation': 288, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.9, '--rotation': 324, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 1, '--rotation': 360, '--translation': 150 } as React.CSSProperties} />
            </div>
          </div>
        </div>

        {/* Loader grande */}
        <div className="card p-8">
          <h2 className="text-xl font-bold mb-4 text-center" style={{ color: 'var(--color-text-primary)' }}>
            Tamaño Grande
          </h2>
          <div className="bg-white rounded-lg flex items-center justify-center" style={{ minHeight: '200px' }}>
            <div className="spinner" style={{ width: '120px', height: '120px' }}>
              <div className="spinner-bar" style={{ '--delay': 0.1, '--rotation': 36, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.2, '--rotation': 72, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.3, '--rotation': 108, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.4, '--rotation': 144, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.5, '--rotation': 180, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.6, '--rotation': 216, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.7, '--rotation': 252, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.8, '--rotation': 288, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 0.9, '--rotation': 324, '--translation': 150 } as React.CSSProperties} />
              <div className="spinner-bar" style={{ '--delay': 1, '--rotation': 360, '--translation': 150 } as React.CSSProperties} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          💡 Cómo ver el loader en acción:
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>El loader aparece automáticamente cuando navegas entre páginas</li>
          <li>Se muestra durante el infinite scroll al cargar más productos</li>
          <li>Aparece en las búsquedas y al filtrar por categorías</li>
          <li>Si las cargas son muy rápidas, abre las DevTools y ve a la pestaña Network, activa "Slow 3G" para simular una conexión lenta</li>
        </ul>
      </div>
    </div>
  );
}
