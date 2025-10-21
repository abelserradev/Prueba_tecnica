import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { StarIcon } from '@heroicons/react/20/solid';
import { getProduct, getProducts } from '@/lib/api';
import ErrorState from '@/components/error-state';
import ProductActions from '@/components/product-actions';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const product = await getProduct(id);
    
    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [
          {
            url: product.image,
            width: 800,
            height: 600,
            alt: product.title,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: product.description,
        images: [product.image],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Producto no encontrado',
      description: 'El producto que buscas no está disponible.',
    };
  }
}

async function ProductDetail({ id }: { id: string }) {
  try {
    const product = await getProduct(id);

    if (!product) {
      return (
        <ErrorState 
          title="Producto no encontrado"
          message="El producto que buscas no existe o no está disponible."
        />
      );
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      image: product.image,
      description: product.description,
      brand: {
        '@type': 'Brand',
        name: 'SambilStore',
      },
      offers: {
        '@type': 'Offer',
        url: `https://sambilstore.com/items/${product.id}`,
        priceCurrency: 'USD',
        price: product.price,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.rate,
        reviewCount: product.rating.count,
        bestRating: 5,
        worstRating: 1,
      },
    };

    const highlights = [
      'Producto de alta calidad',
      'Envío gratis en pedidos mayores a $50',
      'Devolución gratuita dentro de 30 días',
      'Garantía del fabricante incluida',
    ];

    return (
      <div className="bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="pt-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <li>
                <div className="flex items-center">
                  <Link 
                    href="/" 
                    className="mr-2 text-sm font-medium text-gray-900 hover:text-gray-600"
                  >
                    Inicio
                  </Link>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <Link 
                    href={`/categorias/${product.category}`}
                    className="mr-2 text-sm font-medium text-gray-900 hover:text-gray-600 capitalize"
                  >
                    {product.category}
                  </Link>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <span aria-current="page" className="font-medium text-gray-500 hover:text-gray-600 line-clamp-1">
                  {product.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
            <div className="row-span-2 aspect-[3/4] w-full rounded-lg overflow-hidden bg-gray-100 max-lg:hidden">
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={800}
                className="w-full h-full object-contain p-8"
                priority
              />
            </div>
            <div className="col-start-2 aspect-[3/2] w-full rounded-lg overflow-hidden bg-gray-50 max-lg:hidden">
              <Image
                src={product.image}
                alt={`${product.title} - vista 2`}
                width={600}
                height={400}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="col-start-2 row-start-2 aspect-[3/2] w-full rounded-lg overflow-hidden bg-gray-50 max-lg:hidden">
              <Image
                src={product.image}
                alt={`${product.title} - vista 3`}
                width={600}
                height={400}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="row-span-2 aspect-[4/5] w-full object-cover rounded-lg overflow-hidden bg-gray-100 lg:aspect-[3/4]">
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={750}
                className="w-full h-full object-contain p-8"
                priority
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Información del producto</h2>
              <p className="text-3xl tracking-tight text-gray-900">${product.price.toFixed(2)}</p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reseñas</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          product.rating.rate > rating ? 'text-gray-900' : 'text-gray-200',
                          'size-5 shrink-0',
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating.rate} de 5 estrellas</p>
                  <span className="ml-3 text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                    {product.rating.count} reseñas
                  </span>
                </div>
              </div>

              <ProductActions productId={product.id} productTitle={product.title} category={product.category} />
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description */}
              <div>
                <h3 className="sr-only">Descripción</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.description}</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Características destacadas</h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Detalles del producto</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    Este producto está disponible en nuestra tienda con entrega rápida. 
                    Todos nuestros productos pasan por controles de calidad rigurosos para 
                    garantizar tu satisfacción. Compra con confianza en SambilStore.
                  </p>
                </div>
              </div>

              {/* Additional info */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Envío</h4>
                  <p className="text-sm text-gray-600">
                    Envío gratis en pedidos superiores a $50. Entrega en 3-5 días hábiles.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Devoluciones</h4>
                  <p className="text-sm text-gray-600">
                    30 días para devoluciones gratuitas. Debe traer factura o comprobante de compra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return (
      <ErrorState 
        title="Error al cargar el producto"
        message="Hubo un problema al cargar los detalles del producto."
      />
    );
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <article className="container-custom py-8">
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        </div>
      }>
        <ProductDetail id={id} />
      </Suspense>
    </article>
  );
}
