'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useFavorites } from '@/contexts/favorites-context';
import { getProduct } from '@/lib/api';
import type { Product } from '@/types';
import LoaderSmall from './loader-small';

interface FavoritesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FavoriteProduct extends Product {
  isFavorite: boolean;
}

export default function FavoritesSidebar({ isOpen, onClose }: FavoritesSidebarProps) {
  const { favorites, removeFromFavorites } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      setIsLoading(true);
      const productsWithDetails: FavoriteProduct[] = await Promise.all(
        favorites.map(async (productId) => {
          try {
            const product = await getProduct(productId.toString());
            return { ...product, isFavorite: true };
          } catch (error) {
            console.error(`Error loading favorite product ${productId}:`, error);
            return { productId, isFavorite: true } as FavoriteProduct;
          }
        })
      );
      setFavoriteProducts(productsWithDetails.filter(p => p.title));
      setIsLoading(false);
    };

    if (isOpen && favorites.length > 0) {
      fetchFavoriteProducts();
    } else if (favorites.length === 0) {
      setFavoriteProducts([]);
      setIsLoading(false);
    }
  }, [favorites, isOpen]);

  const handleRemoveFavorite = (productId: number) => {
    removeFromFavorites(productId);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="favorites-sidebar-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 id="favorites-sidebar-title" className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <HeartSolidIcon className="w-6 h-6 text-red-500" />
              Mis Favoritos
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cerrar favoritos"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Favorites Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <LoaderSmall />
              </div>
            ) : favoriteProducts.length === 0 ? (
              <div className="text-center py-8">
                <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No tienes productos favoritos.</p>
                <Link href="/" className="text-primary hover:underline" onClick={onClose}>
                  ¡Explora nuestros productos!
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {favoriteProducts.map((product) => (
                  <li key={product.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-2"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        <Link href={`/items/${product.id}`} onClick={onClose}>
                          {product.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1" aria-label={`Calificación: ${product.rating.rate} de 5 estrellas`}>
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs font-medium text-gray-700">
                            {product.rating.rate}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveFavorite(product.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          aria-label={`Quitar ${product.title} de favoritos`}
                        >
                          <HeartSolidIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {favoriteProducts.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  {favoriteProducts.length} producto{favoriteProducts.length !== 1 ? 's' : ''} en favoritos
                </p>
                <Link
                  href="/"
                  className="w-full bg-primary text-white py-3 rounded-md text-lg font-semibold hover:bg-primary-dark transition-colors inline-block"
                  onClick={onClose}
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
