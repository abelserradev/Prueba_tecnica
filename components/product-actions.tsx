'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/cart-context';
import { translateCategory } from '@/lib/category-translations';
import CheckoutModal from './checkout-modal';

interface ProductActionsProps {
  productId: number;
  productTitle: string;
  category: string;
}

export default function ProductActions({ productId, productTitle, category }: ProductActionsProps) {
  const [primaryBg, setPrimaryBg] = useState('var(--color-primary)');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(productId);
  };

  const handleBuyNow = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <div className="mt-10">
      {/* Category badge */}
      <div className="mb-6">
        <span 
          className="inline-block text-sm font-medium px-4 py-2 rounded-full capitalize" 
          style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
        >
          {translateCategory(category)}
        </span>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        style={{ backgroundColor: primaryBg }}
        onMouseEnter={() => setPrimaryBg('var(--color-secondary)')}
        onMouseLeave={() => setPrimaryBg('var(--color-primary)')}
      >
        Agregar al carrito
      </button>

      <button
        type="button"
        onClick={handleBuyNow}
        className="mt-3 flex w-full items-center justify-center rounded-md border-2 px-8 py-3 text-base font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none hover:bg-gray-50"
        style={{ borderColor: 'var(--color-text-primary)', color: 'var(--color-text-primary)' }}
      >
        Comprar ahora
      </button>

      {/* Modal de Checkout */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        singleProductId={productId}
      />
    </div>
  );
}
