import LoaderWithMinimumDisplay from './loader-with-minimum-display';

export function ProductCardSkeleton() {
  return (
    <div className="card" aria-busy="true" aria-label="Cargando producto">
      <LoaderWithMinimumDisplay minimumDisplayTime={800} />
    </div>
  );
}

export function ProductListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoaderWithMinimumDisplay minimumDisplayTime={800} />
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="container-custom py-8 flex items-center justify-center min-h-[500px]" aria-busy="true" aria-label="Cargando detalles del producto">
      <LoaderWithMinimumDisplay minimumDisplayTime={1000} />
    </div>
  );
}
