import { Suspense } from 'react';
import { getProducts } from '@/lib/api';
import PaginatedProductList from '@/components/paginated-product-list';
import LoaderWithMinimumDisplay from '@/components/loader-with-minimum-display';
import ErrorState from '@/components/error-state';
import SearchBar from '@/components/search-bar';

export const metadata = {
  title: 'Productos - Descubre nuestra colección',
  description: 'Explora nuestra amplia selección de productos de calidad. Electrónica, joyería, ropa y más.',
};

async function ProductList() {
  try {
    const products = await getProducts();

    if (!products || products.length === 0) {
      return (
        <ErrorState 
          title="No hay productos disponibles"
          message="No pudimos cargar los productos en este momento."
        />
      );
    }

    return <PaginatedProductList initialProducts={products} />;
  } catch (error) {
    console.error('Error loading products:', error);
    return (
      <ErrorState 
        title="Error al cargar productos"
        message="Hubo un problema al cargar los productos. Por favor, intenta nuevamente."
      />
    );
  }
}

export default function HomePage() {
  return (
    <div className="container-custom py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in" style={{ color: 'var(--color-text-primary)' }}>
          Descubre Nuestros Productos
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in">
          Encuentra los mejores productos con envío rápido y garantía de calidad. 
          Explora nuestra colección completa.
        </p>
        
        <div className="mb-8">
          <SearchBar />
        </div>
      </section>

      <Suspense fallback={
        <div className="flex justify-center items-center min-h-[400px]">
          <LoaderWithMinimumDisplay minimumDisplayTime={800} />
        </div>
      }>
        <ProductList />
      </Suspense>
    </div>
  );
}