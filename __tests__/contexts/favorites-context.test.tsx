import { renderHook, act } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '@/contexts/favorites-context';

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

describe('FavoritesContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('inicializa con favoritos vacíos', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.getFavoritesCount()).toBe(0);
  });

  it('carga los favoritos desde localStorage', () => {
    const savedFavorites = [1, 2, 3];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedFavorites));

    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    expect(result.current.favorites).toEqual(savedFavorites);
    expect(result.current.getFavoritesCount()).toBe(3);
  });

  it('agrega productos a favoritos', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addToFavorites(1);
    });

    expect(result.current.favorites).toEqual([1]);
    expect(result.current.getFavoritesCount()).toBe(1);
    expect(result.current.isFavorite(1)).toBe(true);
  });

  it('no duplica productos en favoritos', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addToFavorites(1);
      result.current.addToFavorites(1);
    });

    expect(result.current.favorites).toEqual([1]);
    expect(result.current.getFavoritesCount()).toBe(1);
  });

  it('elimina productos de favoritos', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addToFavorites(1);
      result.current.addToFavorites(2);
      result.current.removeFromFavorites(1);
    });

    expect(result.current.favorites).toEqual([2]);
    expect(result.current.getFavoritesCount()).toBe(1);
    expect(result.current.isFavorite(1)).toBe(false);
    expect(result.current.isFavorite(2)).toBe(true);
  });

  it('guarda los favoritos en localStorage cuando cambian', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addToFavorites(1);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'sambilstore-favorites',
      JSON.stringify([1])
    );
  });

  it('maneja errores al cargar desde localStorage', () => {
    localStorageMock.getItem.mockReturnValue('invalid json');

    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    expect(result.current.favorites).toEqual([]);
  });

  it('verifica correctamente si un producto está en favoritos', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addToFavorites(1);
      result.current.addToFavorites(2);
    });

    expect(result.current.isFavorite(1)).toBe(true);
    expect(result.current.isFavorite(2)).toBe(true);
    expect(result.current.isFavorite(3)).toBe(false);
  });

  it('maneja múltiples productos en favoritos', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addToFavorites(1);
      result.current.addToFavorites(2);
      result.current.addToFavorites(3);
      result.current.removeFromFavorites(2);
    });

    expect(result.current.favorites).toEqual([1, 3]);
    expect(result.current.getFavoritesCount()).toBe(2);
  });

  it('elimina todos los favoritos correctamente', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addToFavorites(1);
      result.current.addToFavorites(2);
      result.current.addToFavorites(3);
    });

    expect(result.current.getFavoritesCount()).toBe(3);

    act(() => {
      result.current.removeFromFavorites(1);
      result.current.removeFromFavorites(2);
      result.current.removeFromFavorites(3);
    });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.getFavoritesCount()).toBe(0);
  });

  it('persiste los favoritos entre sesiones', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addToFavorites(1);
      result.current.addToFavorites(2);
    });

    // Simular recarga de la página
    localStorageMock.getItem.mockReturnValue(JSON.stringify([1, 2]));

    const { result: newResult } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    expect(newResult.current.favorites).toEqual([1, 2]);
    expect(newResult.current.getFavoritesCount()).toBe(2);
  });

  it('maneja IDs de productos como números', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addToFavorites(123);
      result.current.addToFavorites(456);
    });

    expect(result.current.favorites).toEqual([123, 456]);
    expect(result.current.isFavorite(123)).toBe(true);
    expect(result.current.isFavorite(456)).toBe(true);
    expect(result.current.isFavorite(789)).toBe(false);
  });
});
