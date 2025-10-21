import {
  categoryTranslations,
  categoryDescriptions,
  translateCategory,
  getCategoryDescription,
} from '@/lib/category-translations';

describe('Category Translations', () => {
  describe('categoryTranslations', () => {
    it('contiene todas las traducciones esperadas', () => {
      expect(categoryTranslations).toEqual({
        electronics: 'Electrónica',
        jewelery: 'Joyería',
        "men's clothing": 'Ropa de Hombre',
        "women's clothing": 'Ropa de Mujer',
      });
    });

    it('tiene las claves correctas', () => {
      const expectedKeys = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
      expect(Object.keys(categoryTranslations)).toEqual(expectedKeys);
    });
  });

  describe('categoryDescriptions', () => {
    it('contiene todas las descripciones esperadas', () => {
      expect(categoryDescriptions).toEqual({
        electronics: 'Descubre los últimos dispositivos electrónicos y gadgets tecnológicos.',
        jewelery: 'Joyería elegante y accesorios exclusivos para cada ocasión.',
        "men's clothing": 'Ropa moderna y elegante para hombre con estilo.',
        "women's clothing": 'Moda femenina de calidad con las últimas tendencias.',
      });
    });

    it('tiene las mismas claves que categoryTranslations', () => {
      expect(Object.keys(categoryDescriptions)).toEqual(Object.keys(categoryTranslations));
    });
  });

  describe('translateCategory', () => {
    it('traduce categorías conocidas correctamente', () => {
      expect(translateCategory('electronics')).toBe('Electrónica');
      expect(translateCategory('jewelery')).toBe('Joyería');
      expect(translateCategory("men's clothing")).toBe('Ropa de Hombre');
      expect(translateCategory("women's clothing")).toBe('Ropa de Mujer');
    });

    it('capitaliza la primera letra para categorías desconocidas', () => {
      expect(translateCategory('unknown')).toBe('Unknown');
      expect(translateCategory('test category')).toBe('Test category');
    });

    it('maneja categorías vacías', () => {
      expect(translateCategory('')).toBe('');
    });

    it('maneja categorías con espacios', () => {
      expect(translateCategory('men s clothing')).toBe('Men s clothing');
    });

    it('es case-sensitive', () => {
      expect(translateCategory('Electronics')).toBe('Electronics');
      expect(translateCategory('ELECTRONICS')).toBe('ELECTRONICS');
    });
  });

  describe('getCategoryDescription', () => {
    it('retorna descripciones para categorías conocidas', () => {
      expect(getCategoryDescription('electronics')).toBe(
        'Descubre los últimos dispositivos electrónicos y gadgets tecnológicos.'
      );
      expect(getCategoryDescription('jewelery')).toBe(
        'Joyería elegante y accesorios exclusivos para cada ocasión.'
      );
      expect(getCategoryDescription("men's clothing")).toBe(
        'Ropa moderna y elegante para hombre con estilo.'
      );
      expect(getCategoryDescription("women's clothing")).toBe(
        'Moda femenina de calidad con las últimas tendencias.'
      );
    });

    it('retorna descripción por defecto para categorías desconocidas', () => {
      expect(getCategoryDescription('unknown')).toBe('Explora esta categoría de productos.');
      expect(getCategoryDescription('test')).toBe('Explora esta categoría de productos.');
    });

    it('maneja categorías vacías', () => {
      expect(getCategoryDescription('')).toBe('Explora esta categoría de productos.');
    });
  });

  describe('Consistencia de datos', () => {
    it('todas las categorías traducidas tienen descripciones', () => {
      Object.keys(categoryTranslations).forEach(category => {
        expect(categoryDescriptions).toHaveProperty(category);
        expect(categoryDescriptions[category]).toBeTruthy();
        expect(categoryDescriptions[category].length).toBeGreaterThan(0);
      });
    });

    it('todas las descripciones son strings no vacíos', () => {
      Object.values(categoryDescriptions).forEach(description => {
        expect(typeof description).toBe('string');
        expect(description.length).toBeGreaterThan(0);
        expect(description.trim()).toBe(description);
      });
    });

    it('todas las traducciones son strings no vacíos', () => {
      Object.values(categoryTranslations).forEach(translation => {
        expect(typeof translation).toBe('string');
        expect(translation.length).toBeGreaterThan(0);
        expect(translation.trim()).toBe(translation);
      });
    });
  });

  describe('Casos edge', () => {
    it('maneja caracteres especiales en categorías', () => {
      expect(translateCategory('men\'s clothing')).toBe('Ropa de Hombre');
      expect(translateCategory('women\'s clothing')).toBe('Ropa de Mujer');
    });

    it('maneja categorías con números', () => {
      expect(translateCategory('category123')).toBe('Category123');
    });

    it('maneja categorías con símbolos', () => {
      expect(translateCategory('category@#$')).toBe('Category@#$');
    });

    it('preserva el formato original para categorías no traducidas', () => {
      expect(translateCategory('  spaced  ')).toBe('  spaced  ');
    });
  });
});
