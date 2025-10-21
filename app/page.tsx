import { Suspense } from 'react';
import { getProducts } from '@/lib/api';
import InfiniteProductList from '@/components/infinite-product-list';
import ErrorState from '@/components/error-state';
import SearchBar from '@/components/search-bar';
import SortSelector from '@/components/sort-selector';

export const metadata = {
  title: 'Descubre nuestra colección',
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

    return <InfiniteProductList initialProducts={products} />;
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
    <div className="w-full overflow-x-hidden">
      <div className="container-custom py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in break-words" style={{ color: 'var(--color-text-primary)' }}>
            Descubre Nuestros Productos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in px-4">
            Encuentra los mejores productos con envío rápido y garantía de calidad. 
            Explora nuestra colección completa.
          </p>
          
          <div className="mb-8 w-full px-4">
            <Suspense fallback={<div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>}>
              <SearchBar />
            </Suspense>
          </div>
          
          <div className="mb-8 flex justify-end px-4">
            <div className="w-full sm:w-64 md:w-72">
              <Suspense fallback={<div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>}>
                <SortSelector />
              </Suspense>
            </div>
          </div>
        </section>

        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          </div>
        }>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
}