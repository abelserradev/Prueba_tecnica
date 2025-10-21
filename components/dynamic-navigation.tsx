'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { translateCategory } from '@/lib/category-translations';

export default function DynamicNavigation() {
  const pathname = usePathname();
  
  // Detectar si estamos en la página de inicio (productos)
  const isHomePage = pathname === '/';
  
  // Detectar si estamos en una página de categoría
  const isCategoryPage = pathname.startsWith('/categorys/');
  const currentCategory = isCategoryPage ? pathname.split('/categorys/')[1] : null;
  const translatedCategory = currentCategory ? translateCategory(decodeURIComponent(currentCategory)) : null;

  return (
    <div className="hidden md:flex items-center space-x-2">
      <Link
        href="/"
        className={`nav-button group relative flex items-center gap-1 px-3 py-2 text-white transition-all duration-200 rounded ${
          isHomePage 
            ? 'bg-[#2f81f7] hover:bg-[#1d4ed8] focus:bg-[#1d4ed8] active:bg-[#1d4ed8]' 
            : 'hover:bg-[#21262c] focus:bg-[#1a1f24] active:bg-[#1a1f24]'
        }`}
        role="menuitem"
      >
        <span className={`nav-indicator absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4/5 rounded-full transition-opacity ${
          isHomePage 
            ? 'bg-white opacity-100' 
            : 'bg-[#2f81f7] opacity-0 group-focus:opacity-100 group-active:opacity-100'
        }`} />
        <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="m1.5 13v1a.5.5 0 0 0 .3379.4731 18.9718 18.9718 0 0 0 6.1621 1.0269 18.9629 18.9629 0 0 0 6.1621-1.0269.5.5 0 0 0 .3379-.4731v-1a6.5083 6.5083 0 0 0 -4.461-6.1676 3.5 3.5 0 1 0 -4.078 0 6.5083 6.5083 0 0 0 -4.461 6.1676zm4-9a2.5 2.5 0 1 1 2.5 2.5 2.5026 2.5026 0 0 1 -2.5-2.5zm2.5 3.5a5.5066 5.5066 0 0 1 5.5 5.5v.6392a18.08 18.08 0 0 1 -11 0v-.6392a5.5066 5.5066 0 0 1 5.5-5.5z" />
        </svg>
        <span className={`text-sm ${isHomePage ? 'font-medium' : ''}`}>Productos</span>
      </Link>

      <Link
        href="/categorys"
        className="nav-button group relative flex items-center gap-1 px-3 py-2 text-white transition-all duration-200 hover:bg-[#21262c] focus:bg-[#1a1f24] active:bg-[#1a1f24] rounded"
        role="menuitem"
      >
        <span className="nav-indicator absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4/5 bg-[#2f81f7] rounded-full opacity-0 group-focus:opacity-100 group-active:opacity-100 transition-opacity" />
        <svg className="w-4 h-4" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="m17.074 30h-2.148c-1.038 0-1.914-.811-1.994-1.846l-.125-1.635c-.687-.208-1.351-.484-1.985-.824l-1.246 1.067c-.788.677-1.98.631-2.715-.104l-1.52-1.52c-.734-.734-.78-1.927-.104-2.715l1.067-1.246c-.34-.635-.616-1.299-.824-1.985l-1.634-.125c-1.035-.079-1.846-.955-1.846-1.993v-2.148c0-1.038.811-1.914 1.846-1.994l1.635-.125c.208-.687.484-1.351.824-1.985l-1.068-1.247c-.676-.788-.631-1.98.104-2.715l1.52-1.52c.734-.734 1.927-.779 2.715-.104l1.246 1.067c.635-.34 1.299-.616 1.985-.824l.125-1.634c.08-1.034.956-1.845 1.994-1.845h2.148c1.038 0 1.914.811 1.994 1.846l.125 1.635c.687.208 1.351.484 1.985.824l1.246-1.067c.787-.676 1.98-.631 2.715.104l1.52 1.52c.734.734.78 1.927.104 2.715l-1.067 1.246c.34.635.616 1.299.824 1.985l1.634.125c1.035.079 1.846.955 1.846 1.993v2.148c0 1.038-.811 1.914-1.846 1.994l-1.635.125c-.208.687-.484 1.351-.824 1.985l1.067 1.246c.677.788.631 1.98-.104 2.715l-1.52 1.52c-.734.734-1.928.78-2.715.104l-1.246-1.067c-.635.34-1.299.616-1.985.824l-.125 1.634c-.079 1.035-.955 1.846-1.993 1.846zm-5.835-6.373c.848.53 1.768.912 2.734 1.135.426.099.739.462.772.898l.18 2.341 2.149-.001.18-2.34c.033-.437.347-.8.772-.898.967-.223 1.887-.604 2.734-1.135.371-.232.849-.197 1.181.089l1.784 1.529 1.52-1.52-1.529-1.784c-.285-.332-.321-.811-.089-1.181.53-.848.912-1.768 1.135-2.734.099-.426.462-.739.898-.772l2.341-.18h-.001v-2.148l-2.34-.18c-.437-.033-.8-.347-.898-.772-.223-.967-.604-1.887-1.135-2.734-.232-.37-.196-.849.089-1.181l1.529-1.784-1.52-1.52-1.784 1.529c-.332.286-.81.321-1.181.089-.848-.53-1.768-.912-2.734-1.135-.426-.099-.739-.462-.772-.898l-.18-2.341-2.148.001-.18 2.34c-.033.437-.347.8-.772.898-.967.223-1.887.604-2.734 1.135-.37.232-.849.197-1.181-.089l-1.785-1.529-1.52 1.52 1.529 1.784c.285.332.321.811.089 1.181-.53.848-.912 1.768-1.135 2.734-.099.426-.462.739-.898.772l-2.341.18.002 2.148 2.34.18c.437.033.8.347.898.772.223.967.604 1.887 1.135 2.734.232.37.196.849-.089 1.181l-1.529 1.784 1.52 1.52 1.784-1.529c.332-.287.813-.32 1.18-.089z" />
          <path fill="currentColor" d="m16 23c-3.859 0-7-3.141-7-7s3.141-7 7-7 7 3.141 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
        </svg>
        <span className="text-sm">Categorías</span>
      </Link>

      {/* Mostrar categoría actual si estamos en una página de categoría */}
      {isCategoryPage && translatedCategory && (
        <Link
          href={`/categorys/${currentCategory}`}
          className="nav-button group relative flex items-center gap-1 px-3 py-2 text-white transition-all duration-200 bg-[#2f81f7] hover:bg-[#1d4ed8] focus:bg-[#1d4ed8] active:bg-[#1d4ed8] rounded"
          role="menuitem"
        >
          <span className="nav-indicator absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4/5 bg-white rounded-full opacity-100 transition-opacity" />
          <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-sm font-medium">{translatedCategory}</span>
        </Link>
      )}
    </div>
  );
}
