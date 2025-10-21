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
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center mt-12 mb-8" aria-label="Paginación">
      <div className="flex items-center gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Página anterior"
          style={{ color: 'var(--color-text-primary)' }}
        >
          ← Anterior
        </button>

        <div className="pagination-circles flex items-center justify-center">
          {visiblePages.map((page, index) => (
            <figure
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pagination-circle ${currentPage === page ? 'active' : ''}`}
              style={{ '--order': index + 1 } as React.CSSProperties}
              aria-label={`Página ${page}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePageChange(page);
                }
              }}
            >
              {page}
            </figure>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Página siguiente"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Siguiente →
        </button>
      </div>

      <style jsx>{`
        .pagination-circles {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pagination-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 800;
          color: #71717a;
          padding: 1rem;
          background-color: white;
          position: relative;
          border-radius: 50%;
          border: 1px solid #d4d4d8;
          cursor: pointer;
          transition: all 0.25s ease;
          margin: 0;
        }

        .pagination-circle:nth-child(1) {
          width: 4rem;
          height: 4rem;
          z-index: 6;
          order: 3;
        }

        .pagination-circle:nth-child(2) {
          width: 2.75rem;
          height: 2.75rem;
          z-index: 4;
          order: 2;
          margin-left: -0.5rem;
        }

        .pagination-circle:nth-child(3) {
          width: 2.75rem;
          height: 2.75rem;
          z-index: 4;
          order: 4;
          margin-left: -0.5rem;
        }

        .pagination-circle:nth-child(4) {
          width: 2rem;
          height: 2rem;
          z-index: 3;
          order: 1;
          margin-left: -0.5rem;
        }

        .pagination-circle:nth-child(5) {
          width: 2rem;
          height: 2rem;
          z-index: 3;
          order: 5;
          margin-left: -0.5rem;
        }

        .pagination-circle.active {
          background-color: #4FB6BE;
          color: white;
          border-color: #4FB6BE;
          box-shadow: 0 4px 12px rgba(79, 182, 190, 0.3);
        }

        .pagination-circles:hover .pagination-circle:hover {
          z-index: 50;
          width: 4rem;
          height: 4rem;
        }

        .pagination-circles:hover .pagination-circle:not(:hover) {
          width: 2.375rem;
          height: 2.375rem;
        }

        .pagination-circle:focus {
          outline: 2px solid #4FB6BE;
          outline-offset: 2px;
        }
      `}</style>
    </nav>
  );
}
