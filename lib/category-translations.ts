// Mapeo de categorías de inglés a español
export const categoryTranslations: Record<string, string> = {
  'electronics': 'Electrónica',
  'jewelery': 'Joyería',
  "men's clothing": 'Ropa de Hombre',
  "women's clothing": 'Ropa de Mujer',
};

// Función para traducir categorías
export function translateCategory(category: string): string {
  return categoryTranslations[category] || category;
}

// Función para obtener la descripción en español
export const categoryDescriptions: Record<string, string> = {
  'electronics': 'Descubre los últimos dispositivos electrónicos y gadgets tecnológicos.',
  'jewelery': 'Joyería elegante y accesorios exclusivos para cada ocasión.',
  "men's clothing": 'Ropa moderna y elegante para hombre con estilo.',
  "women's clothing": 'Moda femenina de calidad con las últimas tendencias.',
};

// Función para obtener la descripción traducida
export function getCategoryDescription(category: string): string {
  return categoryDescriptions[category] || 'Explora esta categoría de productos.';
}
