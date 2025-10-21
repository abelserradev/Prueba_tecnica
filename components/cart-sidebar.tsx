'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/contexts/cart-context';
import { getProduct } from '@/lib/api';
import type { Product } from '@/types';
import LoaderSmall from './loader-small';
import CheckoutModal from './checkout-modal';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartProductWithDetails {
  productId: number;
  quantity: number;
  product?: Product;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [cartProducts, setCartProducts] = useState<CartProductWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      const productsWithDetails = await Promise.all(
        cart.map(async (item) => {
          try {
            const product = await getProduct(item.productId.toString());
            return { ...item, product };
          } catch (error) {
            console.error(`Error loading product ${item.productId}:`, error);
            return { ...item, product: undefined };
          }
        })
      );
      setCartProducts(productsWithDetails);
      setIsLoading(false);
    };

    if (isOpen && cart.length > 0) {
      fetchProductDetails();
    } else if (cart.length === 0) {
      setCartProducts([]);
      setIsLoading(false);
    }
  }, [cart, isOpen]);

  const calculateTotal = () => {
    return cartProducts.reduce((total, item) => {
      if (item.product) {
        return total + item.product.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const handleIncrement = (productId: number, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 id="cart-title" className="text-2xl font-bold text-gray-900">
              Carrito
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cerrar carrito"
            >
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <LoaderSmall />
              </div>
            ) : cartProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg
                  className="w-24 h-24 text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-gray-600 mb-6">
                  Agrega productos para comenzar tu compra
                </p>
                <Link
                  href="/"
                  onClick={onClose}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                >
                  Ir a comprar
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartProducts.map((item) => {
                  if (!item.product) return null;

                  return (
                    <div
                      key={item.productId}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-contain p-2"
                          sizes="80px"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/items/${item.productId}`}
                          onClick={onClose}
                          className="text-sm font-medium text-gray-900 hover:text-primary line-clamp-2 mb-1"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-lg font-bold text-gray-900 mb-2">
                          ${item.product.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => handleDecrement(item.productId, item.quantity)}
                              className="p-1 hover:bg-gray-100 transition-colors"
                              aria-label="Disminuir cantidad"
                            >
                              <MinusIcon className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="px-3 py-1 text-sm font-medium text-gray-900 min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncrement(item.productId, item.quantity)}
                              className="p-1 hover:bg-gray-100 transition-colors"
                              aria-label="Aumentar cantidad"
                            >
                              <PlusIcon className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemove(item.productId)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer - Total & Checkout */}
          {cartProducts.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-4">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-900">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-primary">${calculateTotal().toFixed(2)}</span>
                </div>
                <button
                  className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition-colors shadow-md hover:shadow-lg"
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  Proceder al Pago
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  );
}

