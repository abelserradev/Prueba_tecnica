'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './product-card';
import EmptyState from './empty-state';
import { useCart } from '@/contexts/cart-context';
import { sortProducts } from '@/lib/sort-products';
import type { Product } from '@/types';
import type { SortOption } from './sort-selector';

interface InfiniteProductListProps {
  initialProducts: Product[];
}

const PRODUCTS_PER_PAGE = 8;

export default function InfiniteProductList({ initialProducts }: InfiniteProductListProps) {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get('sort') || 'relevance';
  
  // Inicializar con los primeros productos ordenados
  const getInitialState = () => {
    const sortedProducts = sortProducts(initialProducts, sortParam as SortOption);
    return {
      products: sortedProducts.slice(0, PRODUCTS_PER_PAGE),
      hasMore: sortedProducts.length > PRODUCTS_PER_PAGE,
    };
  };

  const initialState = getInitialState();
  const [products, setProducts] = useState<Product[]>(initialState.products);
  const [hasMore, setHasMore] = useState(initialState.hasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  // Efecto para manejar el ordenamiento y reinicializar cuando cambie
  useEffect(() => {
    const sortedProducts = sortProducts(initialProducts, sortParam as SortOption);
    const initialSlice = sortedProducts.slice(0, PRODUCTS_PER_PAGE);
    
    setProducts(initialSlice);
    setHasMore(sortedProducts.length > PRODUCTS_PER_PAGE);
    setPage(1);
    setIsLoading(false);
    
    // Scroll al inicio cuando cambian los productos o el ordenamiento
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialProducts, sortParam]);

  const loadMoreProducts = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    // Simular carga de API con delay más realista
    setTimeout(() => {
      const sortedProducts = sortProducts(initialProducts, sortParam as SortOption);
      const startIndex = page * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      const newProducts = sortedProducts.slice(startIndex, endIndex);

      if (newProducts.length > 0) {
        setProducts(prev => [...prev, ...newProducts]);
        setPage(page + 1);
        setHasMore(endIndex < sortedProducts.length);
      } else {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 800); // Reducido de 1000ms a 800ms para mejor UX
  }, [page, isLoading, hasMore, initialProducts, sortParam]);

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
              <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 animate-pulse">
                Cargando más productos...
              </p>
            </div>
          )}
        </div>
      )}

      {/* Botón Back to Top al final de la lista */}
      {!hasMore && products.length > 0 && (
        <div className="flex justify-center py-12" role="status">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group relative w-[50px] h-[50px] rounded-full bg-[#014471] border-none font-semibold flex items-center justify-center shadow-[0px_0px_0px_4px_rgba(79,182,190,0.3)] cursor-pointer transition-all duration-300 overflow-hidden hover:w-[140px] hover:rounded-[50px] hover:bg-[#4FB6BE]"
            aria-label="Volver arriba"
          >
            <svg 
              className="w-3 transition-all duration-300 group-hover:transform group-hover:-translate-y-[200%]" 
              viewBox="0 0 384 512"
              fill="white"
            >
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>
            <span className="absolute -bottom-5 text-white text-[0px] transition-all duration-300 group-hover:text-[13px] group-hover:bottom-auto group-hover:opacity-100">
              Volver arriba
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
