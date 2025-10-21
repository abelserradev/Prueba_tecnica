import { render, screen } from '@testing-library/react';
import DynamicNavigation from '@/components/dynamic-navigation';

// Mock de usePathname
const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
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

describe('DynamicNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza la navegación básica en la página principal', () => {
    mockUsePathname.mockReturnValue('/');
    
    render(<DynamicNavigation />);
    
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.queryByText('Electrónica')).not.toBeInTheDocument();
  });

  it('renderiza la navegación básica en la página de categorías', () => {
    mockUsePathname.mockReturnValue('/categorias');
    
    render(<DynamicNavigation />);
    
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.queryByText('Electrónica')).not.toBeInTheDocument();
  });

  it('muestra la categoría actual cuando está en una página de categoría específica', () => {
    mockUsePathname.mockReturnValue('/categorias/electronics');
    
    render(<DynamicNavigation />);
    
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.getByText('Electrónica')).toBeInTheDocument();
  });

  it('muestra la categoría traducida correctamente', () => {
    mockUsePathname.mockReturnValue('/categorias/men%27s%20clothing');
    
    render(<DynamicNavigation />);
    
    expect(screen.getByText('Ropa de Hombre')).toBeInTheDocument();
  });

  it('aplica las clases CSS correctas a la categoría activa', () => {
    mockUsePathname.mockReturnValue('/categorias/electronics');
    
    render(<DynamicNavigation />);
    
    const categoryLink = screen.getByText('Electrónica').closest('a');
    expect(categoryLink).toHaveClass('nav-button', 'group', 'relative');
    expect(categoryLink).toHaveAttribute('href', '/categorias/electronics');
  });

  it('tiene los atributos de accesibilidad correctos', () => {
    mockUsePathname.mockReturnValue('/categorias/electronics');
    
    render(<DynamicNavigation />);
    
    const categoryLink = screen.getByText('Electrónica').closest('a');
    expect(categoryLink).toHaveAttribute('role', 'menuitem');
  });

  it('maneja categorías con espacios en la URL', () => {
    mockUsePathname.mockReturnValue('/categorias/women%27s%20clothing');
    
    render(<DynamicNavigation />);
    
    expect(screen.getByText('Ropa de Mujer')).toBeInTheDocument();
  });

  it('maneja categorías con caracteres especiales', () => {
    mockUsePathname.mockReturnValue('/categorias/jewelery');
    
    render(<DynamicNavigation />);
    
    expect(screen.getByText('Joyería')).toBeInTheDocument();
  });

  it('no muestra categoría para rutas que no son de categorías', () => {
    mockUsePathname.mockReturnValue('/items/1');
    
    render(<DynamicNavigation />);
    
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.queryByText('Electrónica')).not.toBeInTheDocument();
  });

  it('maneja categorías desconocidas', () => {
    mockUsePathname.mockReturnValue('/categorias/unknown-category');
    
    render(<DynamicNavigation />);
    
    expect(screen.getByText('Unknown-category')).toBeInTheDocument();
  });

  it('renderiza los iconos correctos para cada enlace', () => {
    mockUsePathname.mockReturnValue('/');
    
    render(<DynamicNavigation />);
    
    // Verificar que los iconos SVG están presentes
    const svgElements = screen.getAllByRole('img', { hidden: true });
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('aplica el estilo activo a la categoría actual', () => {
    mockUsePathname.mockReturnValue('/categorias/electronics');
    
    render(<DynamicNavigation />);
    
    const categoryLink = screen.getByText('Electrónica').closest('a');
    expect(categoryLink).toHaveClass('bg-[#2f81f7]');
  });

  it('maneja URLs con múltiples segmentos', () => {
    mockUsePathname.mockReturnValue('/categorias/electronics/subcategory');
    
    render(<DynamicNavigation />);
    
    expect(screen.getByText('Electrónica')).toBeInTheDocument();
  });

  it('no muestra categoría para rutas de búsqueda', () => {
    mockUsePathname.mockReturnValue('/buscar?q=test');
    
    render(<DynamicNavigation />);
    
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.queryByText('Electrónica')).not.toBeInTheDocument();
  });

  it('maneja categorías con encoding URL', () => {
    mockUsePathname.mockReturnValue('/categorias/men%27s%20clothing');
    
    render(<DynamicNavigation />);
    
    const categoryLink = screen.getByText('Ropa de Hombre').closest('a');
    expect(categoryLink).toHaveAttribute('href', '/categorias/men%27s%20clothing');
  });
});
