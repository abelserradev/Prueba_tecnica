'use client';

import { useEffect } from 'react';
import ErrorState from '@/components/error-state';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="container-custom py-8">
      <ErrorState 
        title="Algo salió mal"
        message="Hubo un error inesperado. Por favor, intenta nuevamente."
      />
      <div className="text-center mt-4">
        <button onClick={reset} className="btn-primary">
          Intentar nuevamente
        </button>
      </div>
    </div>
  );
}
