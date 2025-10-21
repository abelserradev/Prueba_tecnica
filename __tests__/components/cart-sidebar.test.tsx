import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartSidebar from '@/components/cart-sidebar';
import { getProduct } from '@/lib/api';

// Mock de la API
const mockGetProduct = getProduct as jest.MockedFunction<typeof getProduct>;

// Mock de los contextos
const mockCartContext = {
  cart: [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 },
  ],
  updateQuantity: jest.fn(),
  removeFromCart: jest.fn(),
  getCartTotal: jest.fn(() => 99.98),
};

jest.mock('@/contexts/cart-context', () => ({
  useCart: () => mockCartContext,
}));

// Mock de los productos
const mockProducts = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 29.99,
    description: 'Test product 1 description',
    category: 'electronics',
    image: 'https://example.com/image1.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: 39.99,
    description: 'Test product 2 description',
    category: 'jewelery',
    image: 'https://example.com/image2.jpg',
    rating: { rate: 4.0, count: 50 },
  },
];

describe('CartSidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetProduct
      .mockResolvedValueOnce(mockProducts[0])
      .mockResolvedValueOnce(mockProducts[1]);
  });

  it('renderiza el sidebar cuando está abierto', () => {
    render(<CartSidebar isOpen={true} onClose={jest.fn()} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Carrito de Compras')).toBeInTheDocument();
  });

  it('no renderiza el sidebar cuando está cerrado', () => {
    render(<CartSidebar isOpen={false} onClose={jest.fn()} />);
    
    const sidebar = screen.queryByRole('dialog');
    expect(sidebar).not.toBeInTheDocument();
  });

  it('muestra el estado de carga inicialmente', () => {
    render(<CartSidebar isOpen={true} onClose={jest.fn()} />);
    
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('carga y muestra los productos del carrito', async () => {
    render(<CartSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
  });

  it('muestra la información correcta de cada producto', async () => {
    render(<CartSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByText('$29.99')).toBeInTheDocument();
      expect(screen.getByText('$39.99')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument(); // Cantidad del primer producto
      expect(screen.getByText('1')).toBeInTheDocument(); // Cantidad del segundo producto
    });
  });

  it('permite actualizar la cantidad de productos', async () => {
    render(<CartSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
    
    const increaseButton = screen.getAllByLabelText(/aumentar cantidad/i)[0];
    fireEvent.click(increaseButton);
    
    expect(mockCartContext.updateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('permite disminuir la cantidad de productos', async () => {
    render(<CartSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
    
    const decreaseButton = screen.getAllByLabelText(/disminuir cantidad/i)[0];
    fireEvent.click(decreaseButton);
    
    expect(mockCartContext.updateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('permite eliminar productos del carrito', async () => {
    render(<CartSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
    
    const removeButton = screen.getAllByLabelText(/eliminar/i)[0];
    fireEvent.click(removeButton);
    
    expect(mockCartContext.removeFromCart).toHaveBeenCalledWith(1);
  });

  it('muestra el total del carrito', async () => {
    render(<CartSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByText('$99.98')).toBeInTheDocument();
    });
  });

  it('muestra el estado vacío cuando no hay productos', () => {
    mockCartContext.cart = [];
    
    render(<CartSidebar isOpen={true} onClose={jest.fn()} />);
    
    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
    expect(screen.getByText('¡Empieza a comprar!')).toBeInTheDocument();
  });

  it('cierra el sidebar cuando se hace clic en el botón de cerrar', () => {
    const mockOnClose = jest.fn();
    render(<CartSidebar isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('Cerrar carrito');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('tiene enlaces a los productos individuales', async () => {
    render(<CartSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      const productLinks = screen.getAllByRole('link');
      expect(productLinks[0]).toHaveAttribute('href', '/items/1');
      expect(productLinks[1]).toHaveAttribute('href', '/items/2');
    });
  });

  it('maneja errores al cargar productos', async () => {
    mockGetProduct.mockRejectedValueOnce(new Error('API Error'));
    
    render(<CartSidebar isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      // Debería mostrar solo los productos que se cargaron correctamente
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
  });

  it('aplica las clases CSS correctas', () => {
    render(<CartSidebar isOpen={true} onClose={jest.fn()} />);
    
    const sidebar = screen.getByRole('dialog');
    expect(sidebar).toHaveClass('fixed', 'top-0', 'right-0', 'h-full', 'w-full', 'sm:w-96', 'bg-white', 'shadow-2xl');
  });

  it('tiene los atributos de accesibilidad correctos', () => {
    render(<CartSidebar isOpen={true} onClose={jest.fn()} />);
    
    const sidebar = screen.getByRole('dialog');
    expect(sidebar).toHaveAttribute('aria-modal', 'true');
    expect(sidebar).toHaveAttribute('aria-labelledby', 'cart-sidebar-title');
  });
});
