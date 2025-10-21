'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

const sortOptions = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'rating', label: 'Mejor Puntuación' },
] as const;

export default function SortSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentSort = (searchParams.get('sort') as SortOption) || 'relevance';
  const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Relevancia';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    params.delete('page'); // Reset a página 1 al cambiar ordenamiento
    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label htmlFor="sort-selector" className="block text-sm font-medium text-gray-700 mb-2">
        Ordenar por:
      </label>
      
      <button
        id="sort-selector"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-4 pr-10 py-2.5 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 hover:border-gray-400 focus:ring-primary"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate text-gray-900">{currentLabel}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg 
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none animate-fade-in"
          role="listbox"
          aria-labelledby="sort-selector"
        >
          {sortOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`cursor-pointer select-none relative py-2.5 pl-3 pr-9 hover:bg-gray-50 transition-colors ${
                currentSort === option.value ? 'bg-primary/5' : ''
              }`}
              role="option"
              aria-selected={currentSort === option.value}
            >
              <span className={`block truncate ${
                currentSort === option.value ? 'font-semibold' : 'font-normal'
              }`} style={{ color: currentSort === option.value ? 'var(--color-primary)' : '#111827' }}>
                {option.label}
              </span>
              {currentSort === option.value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg 
                    className="h-5 w-5" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
