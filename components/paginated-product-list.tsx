'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './product-card';
import Pagination from './pagination';
import SortSelector from './sort-selector';
import type { SortOption } from './sort-selector';
import EmptyState from './empty-state';
import { sortProducts } from '@/lib/sort-products';
import { useCart } from '@/contexts/cart-context';
import type { Product } from '@/types';

interface PaginatedProductListProps {
  initialProducts: Product[];
}

const PRODUCTS_PER_PAGE = 6;

export default function PaginatedProductList({ initialProducts }: PaginatedProductListProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const sortBy = (searchParams.get('sort') as SortOption) || 'relevance';
  const { addToCart } = useCart();

  const sortedProducts = useMemo(() => {
    return sortProducts(initialProducts, sortBy);
  }, [initialProducts, sortBy]);
  
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (initialProducts.length === 0) {
    return (
      <EmptyState
        title="No hay productos disponibles"
        description="Parece que no tenemos productos en este momento. Vuelve pronto."
        actionLabel="Volver al inicio"
        actionHref="/"
      />
    );
  }

  return (
    <div>
      {/* Sort selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div className="text-gray-600">
          <p className="text-sm">
            Mostrando <strong className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {startIndex + 1} - {Math.min(endIndex, sortedProducts.length)}
            </strong> de <strong className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {sortedProducts.length}
            </strong> productos
          </p>
        </div>
        
        <div className="w-full sm:w-64">
          <SortSelector />
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product, index) => (
          <div
            key={product.id}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="animate-slide-up"
          >
            <ProductCard 
              product={product} 
              onAddToCart={addToCart}
            />
          </div>
        ))}
      </div>

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
