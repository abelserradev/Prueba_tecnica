import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckoutModal from '@/components/checkout-modal';
import { CartProvider } from '@/contexts/cart-context';

// Mock the API
jest.mock('@/lib/api', () => ({
  getProduct: jest.fn(),
}));

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'Test Description',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: { rate: 4.5, count: 100 },
};

const mockCart = [
  { productId: 1, quantity: 2 },
];

const renderWithCartProvider = (component: React.ReactElement, cart = mockCart) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};

describe('CheckoutModal', () => {
  beforeEach(() => {
    const { getProduct } = require('@/lib/api');
    getProduct.mockResolvedValue(mockProduct);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders checkout modal when open', () => {
    renderWithCartProvider(
      <CheckoutModal isOpen={true} onClose={jest.fn()} />
    );

    expect(screen.getByText('Resumen de Compra')).toBeInTheDocument();
    expect(screen.getByText('Información de Facturación')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderWithCartProvider(
      <CheckoutModal isOpen={false} onClose={jest.fn()} />
    );

    expect(screen.queryByText('Resumen de Compra')).not.toBeInTheDocument();
  });

  it('displays cart products and total', async () => {
    renderWithCartProvider(
      <CheckoutModal isOpen={true} onClose={jest.fn()} />
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Cantidad: 2')).toBeInTheDocument();
      expect(screen.getByText('$59.98')).toBeInTheDocument(); // 29.99 * 2
    });
  });

  it('handles form input changes', () => {
    renderWithCartProvider(
      <CheckoutModal isOpen={true} onClose={jest.fn()} />
    );

    const firstNameInput = screen.getByLabelText('Nombre *');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    expect(firstNameInput).toHaveValue('John');
  });

  it('handles payment method selection', () => {
    renderWithCartProvider(
      <CheckoutModal isOpen={true} onClose={jest.fn()} />
    );

    const cardPayment = screen.getByLabelText(/Tarjeta de Crédito\/Débito/);
    const transferPayment = screen.getByLabelText(/Transferencia Bancaria/);

    expect(cardPayment).toBeChecked(); // Default selection

    fireEvent.click(transferPayment);
    expect(transferPayment).toBeChecked();
    expect(cardPayment).not.toBeChecked();
  });

  it('shows card details when card payment is selected', () => {
    renderWithCartProvider(
      <CheckoutModal isOpen={true} onClose={jest.fn()} />
    );

    expect(screen.getByLabelText('Número de Tarjeta *')).toBeInTheDocument();
    expect(screen.getByLabelText('Fecha de Vencimiento *')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV *')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre en la Tarjeta *')).toBeInTheDocument();
  });

  it('hides card details when other payment method is selected', () => {
    renderWithCartProvider(
      <CheckoutModal isOpen={true} onClose={jest.fn()} />
    );

    const transferPayment = screen.getByLabelText(/Transferencia Bancaria/);
    fireEvent.click(transferPayment);

    expect(screen.queryByLabelText('Número de Tarjeta *')).not.toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    const onClose = jest.fn();
    renderWithCartProvider(
      <CheckoutModal isOpen={true} onClose={onClose} />
    );

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when X button is clicked', () => {
    const onClose = jest.fn();
    renderWithCartProvider(
      <CheckoutModal isOpen={true} onClose={onClose} />
    );

    const closeButton = screen.getByLabelText('Cerrar modal');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    const onClose = jest.fn();
    renderWithCartProvider(
      <CheckoutModal isOpen={true} onClose={onClose} />
    );

    // Fill required fields
    fireEvent.change(screen.getByLabelText('Nombre *'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Apellido *'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Teléfono *'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Dirección *'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('Ciudad *'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Código Postal *'), { target: { value: '10001' } });

    const submitButton = screen.getByText(/Pagar/);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Procesando...')).toBeInTheDocument();
    });
  });

  it('displays loading state while fetching products', () => {
    const { getProduct } = require('@/lib/api');
    getProduct.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderWithCartProvider(
      <CheckoutModal isOpen={true} onClose={jest.fn()} />
    );

    expect(screen.getByRole('status')).toBeInTheDocument(); // LoaderSmall has role="status"
  });

  it('displays empty state when cart is empty', () => {
    renderWithCartProvider(
      <CheckoutModal isOpen={true} onClose={jest.fn()} />,
      [] // Empty cart
    );

    expect(screen.getByText('Total: $0.00')).toBeInTheDocument();
  });
});
