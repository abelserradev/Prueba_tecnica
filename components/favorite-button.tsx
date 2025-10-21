'use client';

import { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useFavorites } from '@/contexts/favorites-context';

interface FavoriteButtonProps {
  productId: number;
  className?: string;
}

export default function FavoriteButton({ productId, className = '' }: FavoriteButtonProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isFav = isFavorite(productId);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    
    if (isFav) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleToggle}
      className={`favorite-button ${isFav ? 'favorite-active' : ''} ${isAnimating ? 'favorite-animate' : ''} ${className}`}
      aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      {isFav ? (
        <HeartSolidIcon className="w-5 h-5" />
      ) : (
        <HeartIcon className="w-5 h-5" />
      )}
    </button>
  );
}
