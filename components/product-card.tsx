import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './add-to-cart-button';
import FavoriteButton from './favorite-button';
import { translateCategory } from '@/lib/category-translations';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="card group animate-fade-in product-card-hover">
              <Link
                href={`/items/${product.id}`}
                className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
                aria-label={`Ver detalles de ${product.title}`}
              >
                <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    ${product.price.toFixed(2)}
                  </div>
                  <FavoriteButton productId={product.id} />
                </div>

        <div className="p-4">
          <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full mb-2">
            {translateCategory(product.category)}
          </span>
          
          <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1" aria-label={`Calificación: ${product.rating.rate} de 5 estrellas`}>
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                {product.rating.rate}
              </span>
              <span className="text-xs text-gray-500">
                ({product.rating.count})
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      <AddToCartButton 
        productId={product.id} 
        onAddToCart={onAddToCart} 
      />
    </article>
  );
}
