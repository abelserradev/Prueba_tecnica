import LoaderWithMinimumDisplay from '@/components/loader-with-minimum-display';

export default function Loading() {
  return (
    <div className="container-custom py-8 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <LoaderWithMinimumDisplay minimumDisplayTime={1000} />
        <p className="mt-6 text-gray-600 text-lg">Cargando...</p>
      </div>
    </div>
  );
}
