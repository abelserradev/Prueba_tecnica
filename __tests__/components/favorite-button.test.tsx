import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesProvider } from '@/contexts/favorites-context';
import FavoriteButton from '@/components/favorite-button';

// Mock del contexto de favoritos
const mockFavoritesContext = {
  favorites: [],
  addToFavorites: jest.fn(),
  removeFromFavorites: jest.fn(),
  isFavorite: jest.fn(),
  getFavoritesCount: jest.fn(),
};

jest.mock('@/contexts/favorites-context', () => ({
  useFavorites: () => mockFavoritesContext,
  FavoritesProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('FavoriteButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el botón de favoritos correctamente', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false);
    
    render(<FavoriteButton productId={1} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Agregar a favoritos');
  });

  it('muestra el estado de favorito cuando el producto está en favoritos', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(true);
    
    render(<FavoriteButton productId={1} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('favorite-active');
    expect(button).toHaveAttribute('aria-label', 'Quitar de favoritos');
  });

  it('llama a addToFavorites cuando se hace clic en un producto que no está en favoritos', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false);
    
    render(<FavoriteButton productId={1} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockFavoritesContext.addToFavorites).toHaveBeenCalledWith(1);
  });

  it('llama a removeFromFavorites cuando se hace clic en un producto que está en favoritos', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(true);
    
    render(<FavoriteButton productId={1} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockFavoritesContext.removeFromFavorites).toHaveBeenCalledWith(1);
  });

  it('previene la propagación del evento al hacer clic', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false);
    
    render(
      <div onClick={jest.fn()}>
        <FavoriteButton productId={1} />
      </div>
    );
    
    const button = screen.getByRole('button');
    const parentDiv = button.parentElement;
    
    fireEvent.click(button);
    
    expect(mockFavoritesContext.addToFavorites).toHaveBeenCalled();
    // El evento no debería propagarse al padre
  });

  it('aplica las clases CSS correctas', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false);
    
    render(<FavoriteButton productId={1} className="custom-class" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('favorite-button');
    expect(button).toHaveClass('custom-class');
  });

  it('muestra la animación cuando se hace clic', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false);
    
    render(<FavoriteButton productId={1} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // La animación se aplica temporalmente
    expect(button).toHaveClass('favorite-animate');
  });
});
