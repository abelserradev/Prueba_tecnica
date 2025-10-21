import '@testing-library/jest-dom';

// Mock de Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
    entries: jest.fn(),
    forEach: jest.fn(),
    toString: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock de localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock de la API
jest.mock('@/lib/api', () => ({
  getProducts: jest.fn(),
  getProduct: jest.fn(),
  getCategories: jest.fn(),
  getProductsByCategory: jest.fn(),
  searchProducts: jest.fn(),
}));

// Mock de Heroicons
jest.mock('@heroicons/react/24/outline', () => ({
  ShoppingCartIcon: () => <div data-testid="shopping-cart-icon" />,
  HeartIcon: () => <div data-testid="heart-icon" />,
  XMarkIcon: () => <div data-testid="x-mark-icon" />,
  PlusIcon: () => <div data-testid="plus-icon" />,
  MinusIcon: () => <div data-testid="minus-icon" />,
  TrashIcon: () => <div data-testid="trash-icon" />,
}));

jest.mock('@heroicons/react/24/solid', () => ({
  HeartIcon: () => <div data-testid="heart-solid-icon" />,
}));

// Mock de Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock de Next.js Link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
