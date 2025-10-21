'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from '@/contexts/cart-context';
import { useFavorites } from '@/contexts/favorites-context';
import CartSidebar from './cart-sidebar';
import FavoritesSidebar from './favorites-sidebar';
import MobileMenu from './mobile-menu';
import DynamicNavigation from './dynamic-navigation';

export default function Header() {
  const { getCartCount } = useCart();
  const { getFavoritesCount } = useFavorites();
  const cartCount = getCartCount();
  const favoritesCount = getFavoritesCount();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d1117] shadow-lg">
      <nav className="container-custom py-3" role="navigation" aria-label="Navegación principal">
        <div className="flex items-center justify-between">
          {/* Lado izquierdo - Menú móvil y navegación */}
          <div className="flex items-center space-x-1">
            {/* Mobile Menu Button - Solo visible en móvil */}
            <div className="md:hidden">
              <MobileMenu 
                onOpenCart={() => setIsCartOpen(true)} 
                onOpenFavorites={() => setIsFavoritesOpen(true)} 
              />
            </div>

            {/* Navegación dinámica - Solo visible en desktop */}
            <DynamicNavigation />
          </div>

          {/* Logo y texto centrado */}
          <Link 
            href="/" 
            className="flex items-center space-x-4 text-lg md:text-xl font-bold text-white hover:opacity-80 transition-colors focus:outline-none absolute left-1/2 transform -translate-x-1/2"
            aria-label="Ir a página principal"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 -mt-1">
              <Image
                src="/logo_sambil.jpg"
                alt="Sambil Venezuela Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 40px, 48px"
              />
            </div>
            <span className="ml-2">SambilStore</span>
          </Link>

          {/* Lado derecho - Favoritos y Carrito */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Botón de Favoritos */}
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="relative p-3 text-white hover:bg-[#21262c] focus:bg-[#1a1f24] active:bg-[#1a1f24] rounded-lg transition-all duration-200 focus:outline-none group"
              aria-label="Ver favoritos"
            >
              {favoritesCount > 0 ? (
                <HeartSolidIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200 text-red-500" />
              ) : (
                <HeartIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200 text-gray-300 hover:text-red-400" />
              )}
            </button>

            {/* Botón de Carrito */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 text-white hover:bg-[#21262c] focus:bg-[#1a1f24] active:bg-[#1a1f24] rounded-lg transition-all duration-200 focus:outline-none group"
              aria-label="Ver carrito"
            >
              <ShoppingCartIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              {/* Indicador de cantidad del carrito */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Favorites Sidebar */}
      <FavoritesSidebar isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
    </header>
  );
}
