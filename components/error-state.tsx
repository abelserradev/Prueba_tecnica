interface ErrorStateProps {
  title?: string;
  message?: string;
}

export default function ErrorState({ 
  title = 'Algo salió mal', 
  message = 'Hubo un problema al cargar los datos. Por favor, intenta nuevamente.' 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" role="alert">
      <div className="w-24 h-24 mb-6 rounded-full bg-red-100 flex items-center justify-center">
        <svg 
          className="w-12 h-12 text-red-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="btn-primary"
        aria-label="Recargar página"
      >
        Intentar nuevamente
      </button>
    </div>
  );
}
