import { sortProducts } from '@/lib/sort-products';
import type { Product } from '@/types';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product A',
    price: 100.00,
    description: 'Description A',
    category: 'electronics',
    image: 'image1.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Product B',
    price: 50.00,
    description: 'Description B',
    category: 'jewelery',
    image: 'image2.jpg',
    rating: { rate: 3.0, count: 50 },
  },
  {
    id: 3,
    title: 'Product C',
    price: 75.00,
    description: 'Description C',
    category: 'electronics',
    image: 'image3.jpg',
    rating: { rate: 5.0, count: 200 },
  },
  {
    id: 4,
    title: 'Product D',
    price: 25.00,
    description: 'Description D',
    category: 'jewelery',
    image: 'image4.jpg',
    rating: { rate: 2.5, count: 25 },
  },
];

describe('sortProducts', () => {
  it('ordena por relevancia (orden original)', () => {
    const result = sortProducts(mockProducts, 'relevance');
    expect(result).toEqual(mockProducts);
  });

  it('ordena por precio de menor a mayor', () => {
    const result = sortProducts(mockProducts, 'price-low-high');
    const prices = result.map(p => p.price);
    expect(prices).toEqual([25.00, 50.00, 75.00, 100.00]);
  });

  it('ordena por precio de mayor a menor', () => {
    const result = sortProducts(mockProducts, 'price-high-low');
    const prices = result.map(p => p.price);
    expect(prices).toEqual([100.00, 75.00, 50.00, 25.00]);
  });

  it('ordena por mejor calificación', () => {
    const result = sortProducts(mockProducts, 'best-rating');
    const ratings = result.map(p => p.rating.rate);
    expect(ratings).toEqual([5.0, 4.5, 3.0, 2.5]);
  });

  it('maneja productos con la misma calificación', () => {
    const productsWithSameRating: Product[] = [
      { ...mockProducts[0], rating: { rate: 4.0, count: 100 } },
      { ...mockProducts[1], rating: { rate: 4.0, count: 50 } },
      { ...mockProducts[2], rating: { rate: 4.0, count: 200 } },
    ];

    const result = sortProducts(productsWithSameRating, 'best-rating');
    // Debería mantener el orden original cuando las calificaciones son iguales
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(3);
  });

  it('maneja productos con precios iguales', () => {
    const productsWithSamePrice: Product[] = [
      { ...mockProducts[0], price: 50.00 },
      { ...mockProducts[1], price: 50.00 },
      { ...mockProducts[2], price: 50.00 },
    ];

    const result = sortProducts(productsWithSamePrice, 'price-low-high');
    // Debería mantener el orden original cuando los precios son iguales
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(3);
  });

  it('maneja array vacío', () => {
    const result = sortProducts([], 'price-low-high');
    expect(result).toEqual([]);
  });

  it('maneja array con un solo producto', () => {
    const singleProduct = [mockProducts[0]];
    const result = sortProducts(singleProduct, 'price-low-high');
    expect(result).toEqual(singleProduct);
  });

  it('no modifica el array original', () => {
    const originalProducts = [...mockProducts];
    sortProducts(mockProducts, 'price-low-high');
    expect(mockProducts).toEqual(originalProducts);
  });

  it('retorna un nuevo array', () => {
    const result = sortProducts(mockProducts, 'price-low-high');
    expect(result).not.toBe(mockProducts);
  });

  it('maneja opciones de ordenamiento inválidas', () => {
    // @ts-ignore - Testing invalid input
    const result = sortProducts(mockProducts, 'invalid-sort');
    expect(result).toEqual(mockProducts);
  });

  it('ordena correctamente productos con calificaciones decimales', () => {
    const productsWithDecimals: Product[] = [
      { ...mockProducts[0], rating: { rate: 4.2, count: 100 } },
      { ...mockProducts[1], rating: { rate: 4.25, count: 50 } },
      { ...mockProducts[2], rating: { rate: 4.1, count: 200 } },
    ];

    const result = sortProducts(productsWithDecimals, 'best-rating');
    const ratings = result.map(p => p.rating.rate);
    expect(ratings).toEqual([4.25, 4.2, 4.1]);
  });

  it('ordena correctamente productos con precios decimales', () => {
    const productsWithDecimals: Product[] = [
      { ...mockProducts[0], price: 99.99 },
      { ...mockProducts[1], price: 99.98 },
      { ...mockProducts[2], price: 100.01 },
    ];

    const result = sortProducts(productsWithDecimals, 'price-low-high');
    const prices = result.map(p => p.price);
    expect(prices).toEqual([99.98, 99.99, 100.01]);
  });

  it('maneja productos con calificaciones de 0', () => {
    const productsWithZeroRating: Product[] = [
      { ...mockProducts[0], rating: { rate: 0, count: 0 } },
      { ...mockProducts[1], rating: { rate: 4.5, count: 100 } },
    ];

    const result = sortProducts(productsWithZeroRating, 'best-rating');
    expect(result[0].rating.rate).toBe(4.5);
    expect(result[1].rating.rate).toBe(0);
  });

  it('maneja productos con precios de 0', () => {
    const productsWithZeroPrice: Product[] = [
      { ...mockProducts[0], price: 0 },
      { ...mockProducts[1], price: 50.00 },
    ];

    const result = sortProducts(productsWithZeroPrice, 'price-low-high');
    expect(result[0].price).toBe(0);
    expect(result[1].price).toBe(50.00);
  });
});
