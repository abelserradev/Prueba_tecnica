import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/contexts/cart-context';

// Mock de localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('CartContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('inicializa con un carrito vacío', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.cart).toEqual([]);
    expect(result.current.getCartCount()).toBe(0);
  });

  it('carga el carrito desde localStorage', () => {
    const savedCart = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedCart));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.cart).toEqual(savedCart);
    expect(result.current.getCartCount()).toBe(3);
  });

  it('agrega productos al carrito', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(1);
    });

    expect(result.current.cart).toEqual([{ productId: 1, quantity: 1 }]);
    expect(result.current.getCartCount()).toBe(1);
  });

  it('incrementa la cantidad si el producto ya está en el carrito', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(1);
      result.current.addToCart(1);
    });

    expect(result.current.cart).toEqual([{ productId: 1, quantity: 2 }]);
    expect(result.current.getCartCount()).toBe(2);
  });

  it('actualiza la cantidad de un producto', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(1);
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.cart).toEqual([{ productId: 1, quantity: 5 }]);
  });

  it('elimina un producto del carrito', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(1);
      result.current.addToCart(2);
      result.current.removeFromCart(1);
    });

    expect(result.current.cart).toEqual([{ productId: 2, quantity: 1 }]);
  });

  it('guarda el carrito en localStorage cuando cambia', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(1);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'sambilstore-cart',
      JSON.stringify([{ productId: 1, quantity: 1 }])
    );
  });

  it('maneja errores al cargar desde localStorage', () => {
    localStorageMock.getItem.mockReturnValue('invalid json');

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.cart).toEqual([]);
  });

  it('calcula el total del carrito correctamente', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(1);
      result.current.addToCart(2);
    });

    // Mock de productos para el cálculo del total
    const mockProducts = [
      { id: 1, price: 29.99 },
      { id: 2, price: 39.99 },
    ];

    // Simular el cálculo del total
    const total = result.current.cart.reduce((sum, item) => {
      const product = mockProducts.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    expect(total).toBe(69.98);
  });

  it('no permite cantidades negativas', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(1);
      result.current.updateQuantity(1, -1);
    });

    expect(result.current.cart).toEqual([{ productId: 1, quantity: 1 }]);
  });

  it('elimina el producto cuando la cantidad llega a 0', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(1);
      result.current.updateQuantity(1, 0);
    });

    expect(result.current.cart).toEqual([]);
  });

  it('maneja múltiples productos correctamente', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(1);
      result.current.addToCart(2);
      result.current.addToCart(1);
      result.current.addToCart(3);
    });

    expect(result.current.cart).toEqual([
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 1 },
    ]);
    expect(result.current.getCartCount()).toBe(4);
  });
});
