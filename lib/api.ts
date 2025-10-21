import type { Product } from '@/types';
import { API_CONFIG } from './config';

// URL base de la API
const API_BASE_URL = API_CONFIG.baseUrl;

export async function getProducts(limit?: number): Promise<Product[]> {
  const url = limit 
    ? `${API_BASE_URL}/products?limit=${limit}` 
    : `${API_BASE_URL}/products`;
  
  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Error al obtener productos');
  }

  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Error al obtener producto');
  }

  return response.json();
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/products/categories`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Error al obtener categorías');
  }

  return response.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products/category/${category}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Error al obtener productos de la categoría');
  }

  return response.json();
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const searchTerm = query.toLowerCase();
  
  return products.filter(product => 
    product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
}
