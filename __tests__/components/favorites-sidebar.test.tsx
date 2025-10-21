import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FavoritesSidebar from '@/components/favorites-sidebar';
import { getProduct } from '@/lib/api';

// Mock de la API
const mockGetProduct = getProduct as jest.MockedFunction<typeof getProduct>;

// Mock de los contextos
const mockFavoritesContext = {
  favorites: [1, 2],
  addToFavorites: jest.fn(),
  removeFromFavorites: jest.fn(),
  isFavorite: jest.fn(),
  getFavoritesCount: jest.fn(() => 2),
};

jest.mock('@/contexts/favorites-context', () => ({
  useFavorites: () => mockFavoritesContext,
}));

// Mock de los productos
const mockProducts = [
  {
    id: 1,
    title: 'Favorite Product 1',
    price: 29.99,
    description: 'Favorite product 1 description',
    category: 'electronics',
    image: 'https://example.com/favorite1.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Favorite Product 2',
    price: 39.99,
    description: 'Favorite product 2 description',
    category: 'jewelery',
    image: 'https://example.com/favorite2.jpg',
    rating: { rate: 4.0, count: 50 },
  },
];

describe('FavoritesSidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetProduct
      .mockResolvedValueOnce(mockProducts[0])
      .mockResolvedValueOnce(mockProducts[1]);
  });

  it('renderiza el sidebar cuando está abierto', () => {
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Mis Favoritos')).toBeInTheDocument();
  });

  it('no renderiza el sidebar cuando está cerrado', () => {
    render(<FavoritesSidebar isOpen={false} onClose={jest.fn()} />);
    
    const sidebar = screen.queryByRole('dialog');
    expect(sidebar).not.toBeInTheDocument();
  });

  it('muestra el estado de carga inicialmente', () => {
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('carga y muestra los productos favoritos', async () => {
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByText('Favorite Product 1')).toBeInTheDocument();
      expect(screen.getByText('Favorite Product 2')).toBeInTheDocument();
    });
  });

  it('muestra la información correcta de cada producto favorito', async () => {
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByText('$29.99')).toBeInTheDocument();
      expect(screen.getByText('$39.99')).toBeInTheDocument();
      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByText('4.0')).toBeInTheDocument();
    });
  });

  it('permite quitar productos de favoritos', async () => {
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByText('Favorite Product 1')).toBeInTheDocument();
    });
    
    const removeButton = screen.getAllByLabelText(/quitar/i)[0];
    fireEvent.click(removeButton);
    
    expect(mockFavoritesContext.removeFromFavorites).toHaveBeenCalledWith(1);
  });

  it('muestra el estado vacío cuando no hay favoritos', () => {
    mockFavoritesContext.favorites = [];
    
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    expect(screen.getByText('No tienes productos favoritos.')).toBeInTheDocument();
    expect(screen.getByText('¡Explora nuestros productos!')).toBeInTheDocument();
  });

  it('cierra el sidebar cuando se hace clic en el botón de cerrar', () => {
    const mockOnClose = jest.fn();
    render(<FavoritesSidebar isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('Cerrar favoritos');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('tiene enlaces a los productos individuales', async () => {
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      const productLinks = screen.getAllByRole('link');
      expect(productLinks[0]).toHaveAttribute('href', '/items/1');
      expect(productLinks[1]).toHaveAttribute('href', '/items/2');
    });
  });

  it('muestra el contador de favoritos en el footer', async () => {
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByText('2 productos en favoritos')).toBeInTheDocument();
    });
  });

  it('muestra el botón de continuar comprando', async () => {
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      const continueButton = screen.getByText('Continuar Comprando');
      expect(continueButton).toBeInTheDocument();
      expect(continueButton).toHaveAttribute('href', '/');
    });
  });

  it('maneja errores al cargar productos favoritos', async () => {
    mockGetProduct.mockRejectedValueOnce(new Error('API Error'));
    
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      // Debería mostrar solo los productos que se cargaron correctamente
      expect(screen.getByText('Favorite Product 2')).toBeInTheDocument();
    });
  });

  it('muestra el icono de corazón en el header', () => {
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    expect(screen.getByTestId('heart-solid-icon')).toBeInTheDocument();
  });

  it('aplica las clases CSS correctas', () => {
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    const sidebar = screen.getByRole('dialog');
    expect(sidebar).toHaveClass('fixed', 'top-0', 'right-0', 'h-full', 'w-full', 'sm:w-96', 'bg-white', 'shadow-2xl');
  });

  it('tiene los atributos de accesibilidad correctos', () => {
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    const sidebar = screen.getByRole('dialog');
    expect(sidebar).toHaveAttribute('aria-modal', 'true');
    expect(sidebar).toHaveAttribute('aria-labelledby', 'favorites-sidebar-title');
  });

  it('muestra las calificaciones de los productos', async () => {
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/calificación: 4.5 de 5 estrellas/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/calificación: 4.0 de 5 estrellas/i)).toBeInTheDocument();
    });
  });

  it('no muestra el footer cuando no hay favoritos', () => {
    mockFavoritesContext.favorites = [];
    
    render(<FavoritesSidebar isOpen={true} onClose={jest.fn()} />);
    
    expect(screen.queryByText('productos en favoritos')).not.toBeInTheDocument();
    expect(screen.queryByText('Continuar Comprando')).not.toBeInTheDocument();
  });
});
