import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/product-card';
import type { Product } from '@/types';

// Mock de los contextos
const mockCartContext = {
  addToCart: jest.fn(),
  getCartCount: jest.fn(),
  cart: [],
  updateQuantity: jest.fn(),
  removeFromCart: jest.fn(),
  getCartTotal: jest.fn(),
};

const mockFavoritesContext = {
  favorites: [],
  addToFavorites: jest.fn(),
  removeFromFavorites: jest.fn(),
  isFavorite: jest.fn(),
  getFavoritesCount: jest.fn(),
};

jest.mock('@/contexts/cart-context', () => ({
  useCart: () => mockCartContext,
}));

jest.mock('@/contexts/favorites-context', () => ({
  useFavorites: () => mockFavoritesContext,
}));

// Mock de la función de traducción
jest.mock('@/lib/category-translations', () => ({
  translateCategory: (category: string) => {
    const translations: Record<string, string> = {
      electronics: 'Electrónica',
      jewelery: 'Joyería',
      "men's clothing": 'Ropa de Hombre',
      "women's clothing": 'Ropa de Mujer',
    };
    return translations[category] || category;
  },
}));

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'Test product description',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: {
    rate: 4.5,
    count: 100,
  },
};

describe('ProductCard', () => {
  const mockOnAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockFavoritesContext.isFavorite.mockReturnValue(false);
  });

  it('renderiza la información del producto correctamente', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('Test product description')).toBeInTheDocument();
    expect(screen.getByText('Electrónica')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(100)')).toBeInTheDocument();
  });

  it('renderiza la imagen del producto con los atributos correctos', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renderiza el enlace al detalle del producto', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/items/1');
    expect(link).toHaveAttribute('aria-label', 'Ver detalles de Test Product');
  });

  it('traduce la categoría correctamente', () => {
    const productWithMenClothing = {
      ...mockProduct,
      category: "men's clothing",
    };
    
    render(<ProductCard product={productWithMenClothing} onAddToCart={mockOnAddToCart} />);
    
    expect(screen.getByText('Ropa de Hombre')).toBeInTheDocument();
  });

  it('renderiza el botón de favoritos', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    const favoriteButton = screen.getByRole('button', { name: /agregar a favoritos/i });
    expect(favoriteButton).toBeInTheDocument();
  });

  it('renderiza el botón de agregar al carrito', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    const addToCartButton = screen.getByRole('button', { name: /agregar/i });
    expect(addToCartButton).toBeInTheDocument();
  });

  it('llama a onAddToCart cuando se hace clic en el botón de agregar al carrito', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    const addToCartButton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(addToCartButton);
    
    expect(mockOnAddToCart).toHaveBeenCalledWith(1);
  });

  it('aplica las clases CSS correctas', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveClass('card', 'group', 'animate-fade-in');
  });

  it('muestra la calificación con el formato correcto', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    const ratingElement = screen.getByLabelText(/calificación: 4.5 de 5 estrellas/i);
    expect(ratingElement).toBeInTheDocument();
  });

  it('maneja productos con descripción larga', () => {
    const productWithLongDescription = {
      ...mockProduct,
      description: 'This is a very long description that should be truncated to prevent layout issues in the product card component',
    };
    
    render(<ProductCard product={productWithLongDescription} onAddToCart={mockOnAddToCart} />);
    
    expect(screen.getByText(productWithLongDescription.description)).toBeInTheDocument();
  });
});
