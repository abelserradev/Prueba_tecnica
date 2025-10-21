'use client';

import ProductCard from './product-card';
import { useCart } from '@/contexts/cart-context';
import type { Product } from '@/types';

interface CategoryProductListProps {
  products: Product[];
}

export default function CategoryProductList({ products }: CategoryProductListProps) {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          style={{ animationDelay: `${index * 0.1}s` }}
          className="animate-slide-up"
        >
          <ProductCard product={product} onAddToCart={addToCart} />
        </div>
      ))}
    </div>
  );
}

