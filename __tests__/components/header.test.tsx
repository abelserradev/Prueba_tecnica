import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/header';

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

// Mock de los componentes hijos
jest.mock('@/components/cart-sidebar', () => {
  return function MockCartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return isOpen ? <div data-testid="cart-sidebar">Cart Sidebar</div> : null;
  };
});

jest.mock('@/components/favorites-sidebar', () => {
  return function MockFavoritesSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return isOpen ? <div data-testid="favorites-sidebar">Favorites Sidebar</div> : null;
  };
});

jest.mock('@/components/mobile-menu', () => {
  return function MockMobileMenu({ onOpenCart, onOpenFavorites }: { onOpenCart: () => void; onOpenFavorites: () => void }) {
    return (
      <div data-testid="mobile-menu">
        <button onClick={onOpenCart}>Open Cart</button>
        <button onClick={onOpenFavorites}>Open Favorites</button>
      </div>
    );
  };
});

jest.mock('@/components/dynamic-navigation', () => {
  return function MockDynamicNavigation() {
    return <div data-testid="dynamic-navigation">Dynamic Navigation</div>;
  };
});

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el header correctamente', () => {
    render(<Header />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('SambilStore')).toBeInTheDocument();
  });

  it('renderiza el logo con los atributos correctos', () => {
    render(<Header />);
    
    const logo = screen.getByAltText('Sambil Venezuela Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo_sambil.jpg');
  });

  it('renderiza el menú móvil en dispositivos móviles', () => {
    render(<Header />);
    
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();
  });

  it('renderiza la navegación dinámica en desktop', () => {
    render(<Header />);
    
    const dynamicNav = screen.getByTestId('dynamic-navigation');
    expect(dynamicNav).toBeInTheDocument();
  });

  it('muestra el contador del carrito cuando hay productos', () => {
    render(<Header />);
    
    const cartButton = screen.getByRole('button', { name: /ver carrito/i });
    expect(cartButton).toBeInTheDocument();
    
    // El contador debería mostrar el número de productos
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('muestra el contador de favoritos cuando hay favoritos', () => {
    render(<Header />);
    
    const favoritesButton = screen.getByRole('button', { name: /ver favoritos/i });
    expect(favoritesButton).toBeInTheDocument();
    
    // El contador debería mostrar el número de favoritos
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('abre el carrito cuando se hace clic en el botón del carrito', () => {
    render(<Header />);
    
    const cartButton = screen.getByRole('button', { name: /ver carrito/i });
    fireEvent.click(cartButton);
    
    expect(screen.getByTestId('cart-sidebar')).toBeInTheDocument();
  });

  it('abre los favoritos cuando se hace clic en el botón de favoritos', () => {
    render(<Header />);
    
    const favoritesButton = screen.getByRole('button', { name: /ver favoritos/i });
    fireEvent.click(favoritesButton);
    
    expect(screen.getByTestId('favorites-sidebar')).toBeInTheDocument();
  });

  it('no muestra contadores cuando no hay productos o favoritos', () => {
    mockCartContext.getCartCount.mockReturnValue(0);
    mockFavoritesContext.getFavoritesCount.mockReturnValue(0);
    
    render(<Header />);
    
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('tiene el enlace al inicio con los atributos correctos', () => {
    render(<Header />);
    
    const homeLink = screen.getByRole('link', { name: /ir a página principal/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('aplica las clases CSS correctas al header', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky', 'top-0', 'z-50', 'w-full', 'bg-[#0d1117]', 'shadow-lg');
  });

  it('maneja el estado de los sidebars correctamente', () => {
    render(<Header />);
    
    // Inicialmente no deberían estar abiertos
    expect(screen.queryByTestId('cart-sidebar')).not.toBeInTheDocument();
    expect(screen.queryByTestId('favorites-sidebar')).not.toBeInTheDocument();
    
    // Abrir carrito
    const cartButton = screen.getByRole('button', { name: /ver carrito/i });
    fireEvent.click(cartButton);
    expect(screen.getByTestId('cart-sidebar')).toBeInTheDocument();
    
    // Abrir favoritos
    const favoritesButton = screen.getByRole('button', { name: /ver favoritos/i });
    fireEvent.click(favoritesButton);
    expect(screen.getByTestId('favorites-sidebar')).toBeInTheDocument();
  });
});
