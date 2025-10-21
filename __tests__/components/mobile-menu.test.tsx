import { render, screen, fireEvent } from '@testing-library/react';
import MobileMenu from '@/components/mobile-menu';

// Mock de los contextos
const mockCartContext = {
  getCartCount: jest.fn(() => 2),
  addToCart: jest.fn(),
  cart: [],
  updateQuantity: jest.fn(),
  removeFromCart: jest.fn(),
  getCartTotal: jest.fn(),
};

const mockFavoritesContext = {
  getFavoritesCount: jest.fn(() => 3),
  favorites: [],
  addToFavorites: jest.fn(),
  removeFromFavorites: jest.fn(),
  isFavorite: jest.fn(),
};

jest.mock('@/contexts/cart-context', () => ({
  useCart: () => mockCartContext,
}));

jest.mock('@/contexts/favorites-context', () => ({
  useFavorites: () => mockFavoritesContext,
}));

describe('MobileMenu', () => {
  const mockOnOpenCart = jest.fn();
  const mockOnOpenFavorites = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el botón del menú móvil', () => {
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('abre el menú cuando se hace clic en el botón', () => {
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(menuButton);
    
    expect(screen.getByText('Menú')).toBeInTheDocument();
  });

  it('cierra el menú cuando se hace clic en el botón de cerrar', () => {
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    // Abrir menú
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(menuButton);
    
    // Cerrar menú
    const closeButton = screen.getByRole('button', { name: /cerrar menú/i });
    fireEvent.click(closeButton);
    
    expect(screen.queryByText('Menú')).not.toBeInTheDocument();
  });

  it('muestra los enlaces de navegación', () => {
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(menuButton);
    
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Categorías')).toBeInTheDocument();
  });

  it('muestra el contador del carrito', () => {
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(menuButton);
    
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Carrito')).toBeInTheDocument();
  });

  it('muestra el contador de favoritos', () => {
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(menuButton);
    
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
  });

  it('abre el carrito cuando se hace clic en el botón del carrito', () => {
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(menuButton);
    
    const cartButton = screen.getByText('Open Cart');
    fireEvent.click(cartButton);
    
    expect(mockOnOpenCart).toHaveBeenCalled();
  });

  it('abre los favoritos cuando se hace clic en el botón de favoritos', () => {
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(menuButton);
    
    const favoritesButton = screen.getByText('Open Favorites');
    fireEvent.click(favoritesButton);
    
    expect(mockOnOpenFavorites).toHaveBeenCalled();
  });

  it('cierra el menú cuando se hace clic en un enlace de navegación', () => {
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(menuButton);
    
    const productLink = screen.getByRole('link', { name: /productos/i });
    fireEvent.click(productLink);
    
    expect(screen.queryByText('Menú')).not.toBeInTheDocument();
  });

  it('tiene los atributos de accesibilidad correctos', () => {
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    fireEvent.click(menuButton);
    
    const sidebar = screen.getByRole('dialog');
    expect(sidebar).toHaveAttribute('aria-modal', 'true');
    expect(sidebar).toHaveAttribute('aria-labelledby', 'mobile-menu-title');
  });

  it('aplica las clases CSS correctas', () => {
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    expect(menuButton).toHaveClass('mobile-menu-btn', 'md:hidden');
  });

  it('no muestra contadores cuando no hay productos o favoritos', () => {
    mockCartContext.getCartCount.mockReturnValue(0);
    mockFavoritesContext.getFavoritesCount.mockReturnValue(0);
    
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(menuButton);
    
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('maneja el estado del menú correctamente', () => {
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    // Inicialmente cerrado
    expect(screen.queryByText('Menú')).not.toBeInTheDocument();
    
    // Abrir
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(menuButton);
    expect(screen.getByText('Menú')).toBeInTheDocument();
    
    // Cerrar
    const closeButton = screen.getByRole('button', { name: /cerrar menú/i });
    fireEvent.click(closeButton);
    expect(screen.queryByText('Menú')).not.toBeInTheDocument();
  });

  it('muestra el icono de corazón sólido cuando hay favoritos', () => {
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(menuButton);
    
    expect(screen.getByTestId('heart-solid-icon')).toBeInTheDocument();
  });

  it('muestra el icono de corazón vacío cuando no hay favoritos', () => {
    mockFavoritesContext.getFavoritesCount.mockReturnValue(0);
    
    render(<MobileMenu onOpenCart={mockOnOpenCart} onOpenFavorites={mockOnOpenFavorites} />);
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(menuButton);
    
    expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
  });
});
