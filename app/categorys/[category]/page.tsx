import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProductsByCategory, getCategories } from '@/lib/api';
import { translateCategory } from '@/lib/category-translations';
import CategoryProductList from '@/components/category-product-list';
import EmptyState from '@/components/empty-state';
import ErrorState from '@/components/error-state';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = decodeURIComponent(category);
  const translatedCategory = translateCategory(categoryName);
  
  return {
    title: `${translatedCategory} - Categoría`,
    description: `Explora nuestra colección de productos en la categoría ${translatedCategory}.`,
  };
}

async function CategoryProducts({ category }: { category: string }) {
  try {
    const decodedCategory = decodeURIComponent(category);
    const products = await getProductsByCategory(decodedCategory);

    if (!products || products.length === 0) {
      return (
        <EmptyState
          title="No hay productos en esta categoría"
          description={`No encontramos productos en la categoría "${translateCategory(decodedCategory)}".`}
          actionLabel="Ver todas las categorías"
          actionHref="/categorys"
        />
      );
    }

    return (
      <>
        <div className="mb-8">
          <p className="text-gray-600">
            <strong className="text-text-primary">{products.length}</strong> productos encontrados
          </p>
        </div>

        <CategoryProductList products={products} />
      </>
    );
  } catch (error) {
    console.error('Error loading category products:', error);
    return (
      <ErrorState 
        title="Error al cargar productos"
        message="Hubo un problema al cargar los productos de esta categoría."
      />
    );
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryName = decodeURIComponent(category);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="container-custom py-8">
        <nav className="mb-6 overflow-x-auto" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm whitespace-nowrap">
            <li className="shrink-0">
              <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
                Inicio
              </Link>
            </li>
            <li className="text-gray-400 shrink-0">/</li>
            <li className="shrink-0">
              <Link href="/categorys" className="text-primary hover:text-primary/80 transition-colors">
                Categorías
              </Link>
            </li>
            <li className="text-gray-400 shrink-0">/</li>
            <li className="text-gray-600 capitalize" aria-current="page">
              {translateCategory(categoryName)}
            </li>
          </ol>
        </nav>

        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2 capitalize animate-fade-in break-words">
            {translateCategory(categoryName)}
          </h1>
          <p className="text-gray-600 animate-fade-in">
            Descubre nuestra selección de productos en esta categoría
          </p>
        </section>

        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          </div>
        }>
          <CategoryProducts category={category} />
        </Suspense>
      </div>
    </div>
  );
}
