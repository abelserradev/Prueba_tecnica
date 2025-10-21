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

const PRODUCTS_PER_PAGE = 6;

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
    }, 1000);
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
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            style={{ animationDelay: `${(index % PRODUCTS_PER_PAGE) * 0.1}s` }}
            className="animate-slide-up"
          >
            <ProductCard product={product} onAddToCart={addToCart} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div ref={observerTarget} className="mt-8">
          {isLoading && (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          )}
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div className="text-center py-8" role="status">
          <p className="text-gray-600">No hay más productos para mostrar</p>
        </div>
      )}
    </div>
  );
}
