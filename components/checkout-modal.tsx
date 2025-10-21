'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { XMarkIcon, CreditCardIcon, BanknotesIcon, DevicePhoneMobileIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/contexts/cart-context';
import { getProduct } from '@/lib/api';
import type { Product } from '@/types';
import LoaderSmall from './loader-small';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  singleProductId?: number; // Para compra directa de un producto
}

interface CheckoutProduct extends Product {
  quantity: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: 'card' | 'transfer' | 'mobile';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

export default function CheckoutModal({ isOpen, onClose, singleProductId }: CheckoutModalProps) {
  const { cart, getCartTotal, clearCart } = useCart();
  const [checkoutProducts, setCheckoutProducts] = useState<CheckoutProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    products: CheckoutProduct[];
    total: number;
  } | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  // Cargar productos del carrito o producto individual
  useEffect(() => {
    const loadProducts = async () => {
      if (isOpen) {
        setIsLoading(true);
        
        if (singleProductId) {
          // Compra directa de un producto
          try {
            const product = await getProduct(singleProductId.toString());
            setCheckoutProducts([{ ...product, quantity: 1 }]);
          } catch (error) {
            console.error(`Error loading product ${singleProductId}:`, error);
            setCheckoutProducts([]);
          }
          setIsLoading(false);
        } else if (cart.length > 0) {
          // Compra desde el carrito
          const productsWithDetails: (CheckoutProduct | null)[] = await Promise.all(
            cart.map(async (item) => {
              try {
                const product = await getProduct(item.productId.toString());
                return { ...product, quantity: item.quantity };
              } catch (error) {
                console.error(`Error loading product ${item.productId}:`, error);
                return null;
              }
            })
          );
          setCheckoutProducts(productsWithDetails.filter(p => p && p.title) as CheckoutProduct[]);
          setIsLoading(false);
        } else {
          setCheckoutProducts([]);
          setIsLoading(false);
        }
      }
    };

    loadProducts();
  }, [cart, isOpen, singleProductId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Guardar información del pedido antes de vaciar el carrito
    const orderTotal = checkoutProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCompletedOrder({
      products: [...checkoutProducts],
      total: orderTotal
    });
    
    // Aquí iría la lógica real de procesamiento de pago
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Vaciar el carrito después del pago exitoso (solo si no es compra directa)
    if (!singleProductId) {
      clearCart();
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    setCompletedOrder(null);
    onClose();
  };

  const total = checkoutProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

      // Pantalla de éxito
      if (showSuccess) {
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-8 text-center">
              <div className="mb-4 sm:mb-6">
                <CheckCircleIcon className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación pronto.
                </p>
              </div>
          
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Resumen del Pedido</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Total pagado: <span className="font-bold text-base sm:text-lg">${completedOrder?.total.toFixed(2) || '0.00'}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Productos: {completedOrder?.products.length || 0} artículo{(completedOrder?.products.length || 0) !== 1 ? 's' : ''}
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-full px-4 py-2 text-sm sm:text-base bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Lado izquierdo - Productos */}
          <div className="flex-1 p-4 sm:p-6 lg:border-r border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Resumen de Compra</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <LoaderSmall />
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {checkoutProducts.map((product) => (
                  <div key={product.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-1 sm:p-2"
                        sizes="(max-width: 640px) 48px, 64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">Cantidad: {product.quantity}</p>
                      <p className="text-sm sm:text-base font-medium text-gray-900">
                        ${(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="flex justify-between text-base sm:text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lado derecho - Formulario */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Información de Facturación</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Cerrar modal"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Información Personal */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Información Personal</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Dirección */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Dirección de Envío</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Métodos de Pago */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Método de Pago</h3>
                <div className="space-y-2 sm:space-y-3">
                  <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <CreditCardIcon className="w-5 h-5 mr-3 text-gray-500" />
                    <span className="text-sm font-medium">Tarjeta de Crédito/Débito</span>
                  </label>

                  <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={formData.paymentMethod === 'transfer'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <BanknotesIcon className="w-5 h-5 mr-3 text-gray-500" />
                    <span className="text-sm font-medium">Transferencia Bancaria</span>
                  </label>

                  <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mobile"
                      checked={formData.paymentMethod === 'mobile'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <DevicePhoneMobileIcon className="w-5 h-5 mr-3 text-gray-500" />
                    <span className="text-sm font-medium">Pago Móvil</span>
                  </label>
                </div>

                {/* Información de Tarjeta */}
                {formData.paymentMethod === 'card' && (
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg space-y-3 sm:space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Número de Tarjeta *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Fecha de Vencimiento *
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/AA"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre en la Tarjeta *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 text-sm sm:text-base border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 text-sm sm:text-base bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
