'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from './product-card';
import Loader from './loader';
import EmptyState from './empty-state';
import { useCart } from '@/contexts/cart-context';
import type { Product } from '@/types';

interface InfiniteProductListProps {
  initialProducts: Product[];
}

const PRODUCTS_PER_PAGE = 8;

export default function InfiniteProductList({ initialProducts }: InfiniteProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts.slice(0, PRODUCTS_PER_PAGE));
  const [hasMore, setHasMore] = useState(initialProducts.length > PRODUCTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const loadMoreProducts = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    // Simular carga de API con delay más realista
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = page * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      const newProducts = initialProducts.slice(startIndex, endIndex);

      if (newProducts.length > 0) {
        setProducts(prev => [...prev, ...newProducts]);
        setPage(nextPage);
        setHasMore(endIndex < initialProducts.length);
      } else {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 800); // Reducido de 1000ms a 800ms para mejor UX
  }, [page, isLoading, hasMore, initialProducts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreProducts, hasMore, isLoading]);

  if (products.length === 0) {
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
    <div className="space-y-8">
      {/* Grid de productos con animaciones mejoradas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            style={{ 
              animationDelay: `${(index % PRODUCTS_PER_PAGE) * 0.1}s`,
              animationFillMode: 'both'
            }}
            className="animate-fade-in-up hover:transform hover:scale-105 transition-all duration-300"
          >
            <ProductCard product={product} onAddToCart={addToCart} />
          </div>
        ))}
      </div>

      {/* Trigger para infinite scroll */}
      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-8">
          {isLoading && (
            <div className="flex flex-col items-center space-y-4">
              <Loader />
              <p className="text-sm text-gray-500 animate-pulse">
                Cargando más productos...
              </p>
            </div>
          )}
        </div>
      )}

      {/* Mensaje de fin de lista */}
      {!hasMore && products.length > 0 && (
        <div className="text-center py-12" role="status">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <div className="w-8 h-px bg-gray-300"></div>
            <span className="text-sm font-medium">Has visto todos los productos</span>
            <div className="w-8 h-px bg-gray-300"></div>
          </div>
        </div>
      )}
    </div>
  );
}
