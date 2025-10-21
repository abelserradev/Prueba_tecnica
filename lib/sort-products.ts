import type { Product } from '@/types';
import type { SortOption } from '@/components/sort-selector';

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    
    case 'rating':
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    
    case 'relevance':
    default:
      return sorted;
  }
}
