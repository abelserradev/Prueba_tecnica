/**
 * Configuración de variables de entorno
 * Centraliza todas las variables de entorno del proyecto
 */

// URLs de la aplicación
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fakestoreapi.com';

// Analytics
export const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;

// Variables del servidor (solo disponibles en server-side)
export const DATABASE_URL = process.env.DATABASE_URL;
export const API_SECRET_KEY = process.env.API_SECRET_KEY;
export const JWT_SECRET = process.env.JWT_SECRET;

// Configuración de la aplicación
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Configuración de la API
export const API_CONFIG = {
  baseUrl: API_URL,
  timeout: 10000,
  retries: 3,
} as const;

// Configuración de metadata
export const METADATA_CONFIG = {
  appName: 'SambilStore',
  description: 'Tu tienda online de confianza',
  keywords: ['tienda online', 'ecommerce', 'productos', 'compras', 'electrónica', 'joyería', 'ropa'] as string[],
  locale: 'es_ES',
  siteName: 'SambilStore',
} as const;
