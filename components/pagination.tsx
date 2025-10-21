'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    
    // En móvil, mostrar máximo 3 páginas + ellipsis
    const maxVisibleMobile = 3;
    const maxVisibleDesktop = 7;

    if (totalPages <= maxVisibleMobile) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (totalPages <= maxVisibleDesktop) {
      // En desktop, mostrar hasta 7 páginas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para muchas páginas
      if (currentPage <= 3) {
        // Mostrar primeras páginas
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Mostrar últimas páginas
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Mostrar página actual y adyacentes
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) return null;

  return (
    <nav 
      className="flex items-center justify-center mt-8 sm:mt-12 mb-6 sm:mb-8 px-2 sm:px-4" 
      aria-label="Paginación"
    >
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-wrap justify-center max-w-full">
        {/* Botón Anterior */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-nav-button group"
          aria-label="Página anterior"
          data-disabled={currentPage === 1}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline font-semibold">Anterior</span>
        </button>

        {/* Números de página */}
        <div className="flex items-center gap-1 sm:gap-2">
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span 
                  key={`ellipsis-${index}`}
                  className="px-2 sm:px-3 py-1 sm:py-2 text-gray-400 font-bold select-none text-sm sm:text-base"
                  aria-hidden="true"
                >
                  •••
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = currentPage === pageNum;

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className="pagination-page-button"
                data-active={isActive}
                aria-label={`Página ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="relative z-10 font-bold">{pageNum}</span>
              </button>
            );
          })}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-nav-button group"
          aria-label="Página siguiente"
          data-disabled={currentPage === totalPages}
        >
          <span className="hidden sm:inline font-semibold">Siguiente</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .pagination-nav-button {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          border: 2px solid #e4e4e7;
          background-color: white;
          color: var(--color-text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-width: 2.5rem;
          height: 2.5rem;
        }

        .pagination-nav-button::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--color-primary) 0%, #3da5ad 100%);
          border-radius: 0.75rem;
          transform: translate(-50%, -50%) scale(0);
          transform-origin: center;
          opacity: 0;
          z-index: 0;
          transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .pagination-nav-button:not([data-disabled="true"]):hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          transform: translateY(-2px);
          box-shadow: 
            0rem 6px 13px rgba(79, 182, 190, 0.1),
            0rem 24px 24px rgba(79, 182, 190, 0.09);
        }

        .pagination-nav-button:not([data-disabled="true"]):hover::before {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }

        .pagination-nav-button:not([data-disabled="true"]):hover {
          color: white;
        }

        .pagination-nav-button:not([data-disabled="true"]):hover svg,
        .pagination-nav-button:not([data-disabled="true"]):hover span {
          position: relative;
          z-index: 1;
        }

        .pagination-nav-button[data-disabled="true"] {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .pagination-nav-button:focus {
          outline: none;
          ring: 2px;
          ring-color: var(--color-primary);
          ring-offset: 2px;
        }

        .pagination-page-button {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          border: 2px solid #e4e4e7;
          background-color: white;
          color: var(--color-text-primary);
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 700;
          position: relative;
          transition: all 0.3s ease;
          overflow: visible;
        }

        .pagination-page-button::after {
          content: "";
          position: absolute;
          bottom: -1rem;
          left: 50%;
          width: 0.25rem;
          height: 0.25rem;
          border-radius: 50%;
          background-color: var(--color-primary);
          transform: translateX(-50%) scale(0);
          transform-origin: center;
          opacity: 0;
          z-index: 10;
          transition: all 0.3s 0.1s ease;
        }

        .pagination-page-button::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 0.5rem;
          background: linear-gradient(135deg, var(--color-primary) 0%, #3da5ad 100%);
          transform: translate(-50%, -50%) scale(0);
          transform-origin: center;
          z-index: 0;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .pagination-page-button:hover:not([data-active="true"]) {
          border-color: var(--color-primary);
          color: var(--color-primary);
          transform: translateY(-2px) scale(1.05);
          box-shadow: 
            0rem 4px 8px rgba(79, 182, 190, 0.15),
            0rem 8px 16px rgba(79, 182, 190, 0.1);
        }

        .pagination-page-button[data-active="true"] {
          border-color: transparent;
          color: white;
          transform: scale(1.1);
        }

        .pagination-page-button[data-active="true"]::after {
          bottom: -0.5rem;
          opacity: 1;
          transform: translateX(-50%) scale(1);
          box-shadow:
            0rem 2px 4px rgba(79, 182, 190, 0.3),
            0rem 4px 8px rgba(79, 182, 190, 0.2);
        }

        .pagination-page-button[data-active="true"]::before {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
          box-shadow:
            0rem 2px 4px rgba(79, 182, 190, 0.3),
            0rem 4px 8px rgba(79, 182, 190, 0.2);
        }

        .pagination-page-button:focus {
          outline: none;
          ring: 2px;
          ring-color: var(--color-primary);
          ring-offset: 2px;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .pagination-page-button {
            min-width: 1.75rem;
            height: 1.75rem;
            font-size: 0.7rem;
            border-radius: 0.375rem;
          }

          .pagination-nav-button {
            padding: 0.375rem 0.5rem;
            font-size: 0.7rem;
            min-width: 2rem;
            height: 2rem;
            border-radius: 0.375rem;
          }

          .pagination-nav-button svg {
            width: 0.875rem;
            height: 0.875rem;
          }

          .pagination-page-button[data-active="true"] {
            transform: scale(1.05);
          }

          .pagination-page-button:hover:not([data-active="true"]) {
            transform: translateY(-1px) scale(1.02);
          }
        }

        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 768px) {
          .pagination-page-button {
            min-width: 2.25rem;
            height: 2.25rem;
            font-size: 0.8rem;
          }

          .pagination-nav-button {
            padding: 0.5rem 0.75rem;
            font-size: 0.8rem;
            min-width: 2.5rem;
            height: 2.5rem;
          }
        }

        /* Desktop optimizations */
        @media (min-width: 769px) {
          .pagination-page-button {
            min-width: 2.5rem;
            height: 2.5rem;
            font-size: 0.875rem;
          }

          .pagination-nav-button {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
            min-width: 3rem;
            height: 3rem;
          }
        }
      `}</style>
    </nav>
  );
}
