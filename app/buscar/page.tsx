import { Suspense } from 'react';
import type { Metadata } from 'next';
import { searchProducts } from '@/lib/api';
import SearchProductList from '@/components/search-product-list';
import EmptyState from '@/components/empty-state';
import ErrorState from '@/components/error-state';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q || '';
  
  return {
    title: query ? `Resultados para "${query}"` : 'Buscar productos',
    description: query 
      ? `Resultados de búsqueda para "${query}" en SambilStore`
      : 'Busca productos en nuestra tienda online',
  };
}

async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return (
      <EmptyState
        title="Comienza tu búsqueda"
        description="Ingresa un término de búsqueda en la barra superior para encontrar productos."
      />
    );
  }

  try {
    const results = await searchProducts(query);

    if (results.length === 0) {
      return (
        <EmptyState
          title="No se encontraron resultados"
          description={`No encontramos productos que coincidan con "${query}". Intenta con otros términos.`}
          actionLabel="Ver todos los productos"
          actionHref="/"
        />
      );
    }

    return (
      <>
        <div className="mb-6">
          <p className="text-gray-600">
            Se encontraron <strong className="text-text-primary">{results.length}</strong> resultados para{' '}
            <strong className="text-text-primary">&quot;{query}&quot;</strong>
          </p>
        </div>

        <SearchProductList products={results} />
      </>
    );
  } catch (error) {
    console.error('Error searching products:', error);
    return (
      <ErrorState 
        title="Error en la búsqueda"
        message="Hubo un problema al buscar productos. Por favor, intenta nuevamente."
      />
    );
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';

  return (
    <div className="w-full overflow-x-hidden">
      <div className="container-custom py-8">
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2 animate-fade-in break-words px-4">
            Búsqueda de Productos
          </h1>
        </section>

        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          </div>
        }>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  );
}
