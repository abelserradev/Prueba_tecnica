'use client';

import { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface AddToCartButtonProps {
  productId: number;
  onAddToCart: (productId: number) => void;
}

export default function AddToCartButton({ productId, onAddToCart }: AddToCartButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onAddToCart(productId);
  };

  return (
    <div className="add-to-cart-wrapper">
      <button 
        className="add-to-cart-button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <ShoppingCartIcon className="w-5 h-5" />
        ) : (
          'Agregar'
        )}
      </button>
    </div>
  );
}
