# Pruebas Unitarias - SambilStore

Este directorio contiene las pruebas unitarias para todos los componentes React, contextos y utilidades de la aplicación SambilStore.

## Estructura de Pruebas

```
__tests__/
├── setup.ts                           # Configuración global de Jest
├── components/                        # Pruebas de componentes
│   ├── favorite-button.test.tsx      # Botón de favoritos
│   ├── product-card.test.tsx         # Tarjeta de producto
│   ├── header.test.tsx               # Header principal
│   ├── cart-sidebar.test.tsx        # Sidebar del carrito
│   ├── favorites-sidebar.test.tsx   # Sidebar de favoritos
│   ├── mobile-menu.test.tsx         # Menú móvil
│   └── dynamic-navigation.test.tsx   # Navegación dinámica
├── contexts/                          # Pruebas de contextos
│   ├── cart-context.test.tsx        # Contexto del carrito
│   └── favorites-context.test.tsx   # Contexto de favoritos
└── lib/                              # Pruebas de utilidades
    ├── category-translations.test.ts # Traducciones de categorías
    └── sort-products.test.ts         # Ordenamiento de productos
```

## Cobertura de Pruebas

### Componentes (8 archivos)
- ✅ **FavoriteButton**: Botón de corazón animado
- ✅ **ProductCard**: Tarjeta de producto con favoritos
- ✅ **Header**: Navegación principal con carrito y favoritos
- ✅ **CartSidebar**: Sidebar del carrito de compras
- ✅ **FavoritesSidebar**: Sidebar de productos favoritos
- ✅ **MobileMenu**: Menú móvil con favoritos
- ✅ **DynamicNavigation**: Navegación contextual

### Contextos (2 archivos)
- ✅ **CartContext**: Estado global del carrito
- ✅ **FavoritesContext**: Estado global de favoritos

### Utilidades (2 archivos)
- ✅ **CategoryTranslations**: Traducción de categorías
- ✅ **SortProducts**: Lógica de ordenamiento

## Casos de Prueba Cubiertos

### 🎯 Funcionalidad Principal
- **Renderizado**: Verificación de que los componentes se renderizan correctamente
- **Interacciones**: Pruebas de clics, hover, y eventos de usuario
- **Estados**: Verificación de estados activos, inactivos, y de carga
- **Props**: Validación de props requeridas y opcionales

### 🔄 Contextos y Estado
- **Inicialización**: Estado inicial de contextos
- **Persistencia**: Guardado y carga desde localStorage
- **Sincronización**: Actualización de estado entre componentes
- **Manejo de errores**: Comportamiento con datos inválidos

### 🎨 UI y Accesibilidad
- **Atributos ARIA**: Roles, labels, y navegación por teclado
- **Clases CSS**: Aplicación correcta de estilos
- **Responsive**: Comportamiento en diferentes tamaños de pantalla
- **Animaciones**: Verificación de clases de animación

### 📱 Navegación y Routing
- **Enlaces**: Verificación de href y navegación
- **Rutas dinámicas**: Comportamiento con parámetros de URL
- **Breadcrumbs**: Navegación contextual
- **Menús**: Apertura y cierre de menús móviles

### 🛒 Carrito y Favoritos
- **Agregar productos**: Funcionalidad de agregar al carrito
- **Eliminar productos**: Remoción de items
- **Cantidades**: Actualización de cantidades
- **Persistencia**: Mantenimiento entre sesiones

## Comandos de Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar con cobertura
npm run test:coverage

# Ejecutar para CI/CD
npm run test:ci
```

## Configuración

### Jest Configuration
- **Setup**: `__tests__/setup.ts` - Configuración global
- **Environment**: `jsdom` - Simulación del DOM
- **Coverage**: 80% mínimo en todas las métricas
- **Mocks**: Next.js, Heroicons, localStorage, API

### Mocks Incluidos
- **Next.js Router**: `useRouter`, `useSearchParams`, `usePathname`
- **Next.js Components**: `Image`, `Link`
- **Heroicons**: Todos los iconos utilizados
- **localStorage**: Persistencia de datos
- **API**: Funciones de la API externa

## Métricas de Calidad

### Cobertura Mínima
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

### Tipos de Pruebas
- **Unit Tests**: Componentes individuales
- **Integration Tests**: Contextos y estado
- **Accessibility Tests**: Atributos ARIA
- **User Interaction Tests**: Eventos y comportamientos

## Mejores Prácticas

### ✅ Implementadas
- **Mocking**: Todos los módulos externos mockeados
- **Isolation**: Pruebas independientes entre sí
- **Cleanup**: Limpieza después de cada prueba
- **Descriptive Names**: Nombres descriptivos para tests
- **Edge Cases**: Casos límite y errores cubiertos

### 🎯 Casos Especiales
- **Empty States**: Estados vacíos (carrito vacío, sin favoritos)
- **Loading States**: Estados de carga
- **Error Handling**: Manejo de errores de API
- **Edge Cases**: Datos inválidos, URLs malformadas
- **Accessibility**: Navegación por teclado, screen readers

## Ejecución en CI/CD

Las pruebas están configuradas para ejecutarse en pipelines de CI/CD con:
- **Coverage Reports**: Reportes de cobertura
- **Watch Mode**: Deshabilitado para CI
- **Exit Code**: Falla si no se cumple la cobertura mínima
- **Parallel Execution**: Ejecución paralela de pruebas

## Mantenimiento

### Agregar Nuevas Pruebas
1. Crear archivo en la estructura correspondiente
2. Importar dependencias necesarias
3. Seguir el patrón de describe/it
4. Incluir casos edge y de error
5. Verificar cobertura mínima

### Actualizar Pruebas Existentes
1. Verificar que los mocks sigan siendo válidos
2. Actualizar casos de prueba si cambia la funcionalidad
3. Mantener la cobertura mínima
4. Ejecutar todas las pruebas antes de commit

---

**Total de Archivos de Prueba**: 12
**Cobertura Objetivo**: 80%
**Tiempo de Ejecución**: < 30 segundos
**Mantenibilidad**: Alta
