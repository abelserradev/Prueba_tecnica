import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategories } from '@/lib/api';
import { translateCategory, getCategoryDescription } from '@/lib/category-translations';
import LoaderWithMinimumDisplay from '@/components/loader-with-minimum-display';
import ErrorState from '@/components/error-state';

export const metadata: Metadata = {
  title: 'Categorías de Productos',
  description: 'Explora nuestras categorías de productos: electrónica, joyería, ropa y más.',
};

const categoryImages: Record<string, string> = {
  electronics: '💻',
  jewelery: '💍',
  "men's clothing": '👔',
  "women's clothing": '👗',
};


async function CategoriesList() {
  try {
    const categories = await getCategories();

    if (!categories || categories.length === 0) {
      return (
        <ErrorState 
          title="No hay categorías disponibles"
          message="No pudimos cargar las categorías en este momento."
        />
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link
            key={category}
            href={`/categorias/${category}`}
            className="card group hover:border-primary border-2 border-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-6xl">
              {categoryImages[category] || '📦'}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-text-primary mb-2 capitalize group-hover:text-primary transition-colors">
                {translateCategory(category)}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {getCategoryDescription(category)}
              </p>
              <span className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                Ver productos
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error loading categories:', error);
    return (
      <ErrorState 
        title="Error al cargar categorías"
        message="Hubo un problema al cargar las categorías. Por favor, intenta nuevamente."
      />
    );
  }
}

export default function CategoriesPage() {
  return (
    <div className="container-custom py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 animate-fade-in">
          Categorías de Productos
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in">
          Explora nuestras diferentes categorías y encuentra exactamente lo que buscas.
        </p>
      </section>

      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[400px]">
            <LoaderWithMinimumDisplay minimumDisplayTime={800} />
          </div>
        }
      >
        <CategoriesList />
      </Suspense>
    </div>
  );
}
