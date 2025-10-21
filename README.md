# 🛍️ SambilStore - E-commerce Moderno

Una aplicación de e-commerce completa construida con **Next.js 15**, **React 19**, **TypeScript** y **Tailwind CSS v4**. Consume la API de FakeStore para mostrar productos, categorías y funcionalidades avanzadas de carrito de compras.

## 📋 Tabla de Contenidos

- [🚀 Instalación Rápida](#-instalación-rápida)
- [✨ Características](#-características)
- [🚀 Tecnologías](#-tecnologías)
- [📦 Instalación Paso a Paso](#-instalación-paso-a-paso)
- [🏗️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [🎨 Sistema de Diseño](#-sistema-de-diseño)
- [🔧 Funcionalidades Técnicas](#-funcionalidades-técnicas)
- [📱 Responsive Design](#-responsive-design)
- [🛒 Carrito de Compras](#-carrito-de-compras)
- [🔍 SEO y Accesibilidad](#-seo-y-accesibilidad)
- [⚡ Optimizaciones de Performance](#-optimizaciones-de-performance)
- [🧪 Testing y Demostración](#-testing-y-demostración)
- [📊 Métricas de Rendimiento](#-métricas-de-rendimiento)
- [🚀 Despliegue](#-despliegue)
- [📚 Referencias](#-referencias)

## 🚀 Instalación Rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/abelserradev/Prueba_tecnica.git
cd Prueba_tecnica

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
echo "NEXT_PUBLIC_API_URL=https://fakestoreapi.com" > .env.local

# 4. Ejecutar en desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:3000
```

**¡Listo!** 🎉 La aplicación estará funcionando en `http://localhost:3000`

## ✨ Características

### 🏠 **Página Principal (/)**
- ✅ **Infinite Scroll**: Carga automática de productos al hacer scroll
- ✅ **Ordenamiento**: Por relevancia, precio y calificación
- ✅ **Búsqueda integrada**: Barra de búsqueda en tiempo real
- ✅ **Botones interactivos**: "Agregar al carrito" con animaciones
- ✅ **Diseño responsive**: Optimizado para móvil, tablet y desktop
- ✅ **Loading states**: Indicadores de carga con tiempo mínimo visible

### 🔍 **Búsqueda de Productos (/buscar)**
- ✅ **Búsqueda en tiempo real**: Filtrado instantáneo
- ✅ **Resultados filtrados**: Por título, descripción y categoría
- ✅ **Página dedicada**: Resultados con paginación
- ✅ **Estados de carga**: Loading, empty, error

### 📂 **Categorías (/categorys)**
- ✅ **Lista de categorías**: Todas las categorías disponibles
- ✅ **Filtrado por categoría**: Páginas individuales por categoría
- ✅ **Navegación intuitiva**: Breadcrumbs y navegación activa
- ✅ **Traducciones**: Categorías en español

### 🛒 **Carrito de Compras**
- ✅ **Agregar/eliminar productos**: Gestión completa del carrito
- ✅ **Actualizar cantidades**: Control de stock
- ✅ **Persistencia**: Almacenamiento en localStorage
- ✅ **Sidebar deslizable**: Interfaz moderna
- ✅ **Contador en tiempo real**: Indicador visual de productos

### 📱 **Diseño Responsive**
- ✅ **Mobile-first**: Enfoque móvil primero
- ✅ **Menú hamburguesa**: Navegación móvil optimizada
- ✅ **Sidebar de carrito**: Interfaz adaptativa
- ✅ **Touch-friendly**: Botones optimizados para touch

### ⚡ **Performance Avanzado**
- ✅ **Server Components (RSC)**: Renderizado del servidor
- ✅ **Optimización de imágenes**: WebP/AVIF automático
- ✅ **Lazy loading**: Carga diferida de componentes
- ✅ **Caching inteligente**: Estrategias de caché optimizadas
- ✅ **Core Web Vitals**: Optimizado para métricas de Google

## 🚀 Tecnologías

### **Frontend**
- **Framework**: Next.js 15.5.6 (App Router)
- **UI Library**: React 19.0.0
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS v4.1.15
- **Iconos**: Heroicons 2.1.1

### **Backend & API**
- **API Externa**: FakeStore API (REST)
- **Caching**: Next.js Router Cache + Revalidation
- **SEO**: Metadata dinámico, JSON-LD, sitemap

### **Herramientas de Desarrollo**
- **Linting**: ESLint 8 + Next.js config
- **Type Checking**: TypeScript strict mode
- **Build**: Next.js build system
- **Dev Server**: Next.js dev server

## 📦 Instalación Paso a Paso

### **Prerrequisitos**
- ✅ **Node.js**: 18.0.0 o superior
- ✅ **npm**: 9.0.0 o superior  
- ✅ **Git**: Para clonar el repositorio

### **Paso 1: Clonar el Repositorio**
```bash
# Clonar el repositorio
git clone https://github.com/abelserradev/Prueba_tecnica.git

# Navegar al directorio del proyecto
cd Prueba_tecnica
```

### **Paso 2: Instalar Dependencias**
```bash
# Instalar todas las dependencias
npm install

# Verificar instalación (opcional)
npm list --depth=0
```

### **Paso 3: Configurar Variables de Entorno**
```bash
# Crear archivo de variables de entorno
echo "NEXT_PUBLIC_API_URL=https://fakestoreapi.com" > .env.local

# Verificar que se creó el archivo
ls -la .env.local
```

### **Paso 4: Ejecutar en Modo Desarrollo**
```bash
# Iniciar servidor de desarrollo
npm run dev

# ✅ El servidor estará disponible en: http://localhost:3000
```

### **Paso 5: Verificar Funcionamiento**
1. **🌐 Abrir navegador**: Ir a `http://localhost:3000`
2. **📱 Verificar carga**: La página principal debe cargar con productos
3. **🧭 Probar navegación**: Hacer clic en "Categorías" y "Productos"
4. **🔍 Probar búsqueda**: Usar la barra de búsqueda
5. **🛒 Probar carrito**: Agregar productos al carrito

### **Paso 6: Build para Producción (Opcional)**
```bash
# Crear build optimizado
npm run build

# Iniciar servidor de producción
npm start
```

### **🚨 Solución de Problemas**

**Error: "Cannot find module"**
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

**Error: "Port 3000 already in use"**
```bash
# Usar puerto diferente
npm run dev -- -p 3001
```

**Error: "API not responding"**
```bash
# Verificar variables de entorno
cat .env.local
```

## 🏗️ Estructura del Proyecto

```
sambilstore/
├── 📁 app/                          # App Router (Next.js 15)
│   ├── 📄 layout.tsx               # Layout principal con SEO
│   ├── 📄 page.tsx                 # Página principal (infinite scroll)
│   ├── 📄 loading.tsx              # UI de carga global
│   ├── 📄 error.tsx                # Página de error global
│   ├── 📄 not-found.tsx            # Página 404 personalizada
│   ├── 📄 robots.ts                # robots.txt dinámico
│   ├── 📄 sitemap.ts               # sitemap.xml dinámico
│   ├── 📄 manifest.ts              # PWA manifest
│   ├── 📁 items/[id]/              # Páginas de productos individuales
│   │   └── 📄 page.tsx             # Detalle de producto con SEO
│   ├── 📁 categorys/               # Páginas de categorías
│   │   ├── 📄 page.tsx             # Lista de categorías
│   │   └── 📁 [category]/          # Páginas individuales por categoría
│   │       └── 📄 page.tsx         # Productos por categoría
│   └── 📁 buscar/                  # Página de búsqueda
│       └── 📄 page.tsx             # Resultados de búsqueda
├── 📁 components/                  # Componentes reutilizables
│   ├── 📄 header.tsx               # Header con navegación
│   ├── 📄 footer.tsx                # Footer informativo
│   ├── 📄 navigation-progress.tsx  # Barra de progreso de navegación
│   ├── 📄 infinite-product-list.tsx # Lista con infinite scroll
│   ├── 📄 product-card.tsx         # Tarjeta de producto
│   ├── 📄 search-bar.tsx           # Barra de búsqueda
│   ├── 📄 sort-selector.tsx        # Selector de ordenamiento
│   ├── 📄 cart-sidebar.tsx         # Sidebar del carrito
│   ├── 📄 mobile-menu.tsx          # Menú móvil
│   ├── 📄 add-to-cart-button.tsx   # Botón agregar al carrito
│   ├── 📄 empty-state.tsx          # Estado vacío
│   ├── 📄 error-state.tsx          # Estado de error
│   └── 📄 loading-skeleton.tsx     # Skeleton loading
├── 📁 contexts/                    # Contextos de React
│   ├── 📄 cart-context.tsx         # Contexto del carrito
│   └── 📄 favorites-context.tsx    # Contexto de favoritos
├── 📁 lib/                         # Utilidades y lógica
│   ├── 📄 api.ts                   # Funciones de API
│   ├── 📄 config.ts                # Configuración de la app
│   ├── 📄 sort-products.ts         # Lógica de ordenamiento
│   └── 📄 category-translations.ts # Traducciones de categorías
├── 📁 types/                       # Tipos de TypeScript
│   └── 📄 index.ts                 # Interfaces y tipos
├── 📁 public/                      # Archivos estáticos
│   ├── 🖼️ logo_sambil.jpg         # Logo de Sambil
│   ├── 🖼️ apple-touch-icon.png   # Icono para iOS
│   ├── 🖼️ android-chrome-192x192.png # Icono Android 192x192
│   ├── 🖼️ android-chrome-512x512.png # Icono Android 512x512
│   ├── 🖼️ favicon-16x16.png       # Favicon 16x16
│   ├── 🖼️ favicon-32x32.png       # Favicon 32x32
│   └── 📄 site.webmanifest        # PWA manifest
├── 📄 package.json                 # Dependencias y scripts
├── 📄 next.config.ts               # Configuración de Next.js
├── 📄 tailwind.config.ts           # Configuración de Tailwind
├── 📄 tsconfig.json                # Configuración de TypeScript
└── 📄 README.md                    # Este archivo
```

## 🎨 Sistema de Diseño

### **Paleta de Colores**
```css
:root {
  --color-primary: #4FB6BE;      /* Turquesa - Botones principales */
  --color-secondary: #EBBA68;    /* Dorado - Acentos */
  --color-accent: #F5D05F;       /* Amarillo - Destacados */
  --color-text-primary: #014471; /* Azul oscuro - Texto principal */
  --color-background: #ffffff;   /* Blanco - Fondo */
  --color-surface: #f8fafc;     /* Gris claro - Superficies */
}
```

### **Tipografía**
- **Fuente principal**: Inter (Google Fonts)
- **Pesos**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Tamaños**: 12px, 14px, 16px, 18px, 20px, 24px, 32px, 48px

### **Espaciado**
- **Base**: 4px (0.25rem)
- **Escala**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px

### **Componentes Personalizados**
- ✅ **Botones**: Con animaciones hover y focus
- ✅ **Cards**: Efectos de escala y sombras
- ✅ **Sidebar**: Deslizable con animaciones
- ✅ **Menú hamburguesa**: Animado y responsive
- ✅ **Paginación**: Con círculos apilados
- ✅ **Loading**: Spinner rotatorio personalizado

## 🔧 Funcionalidades Técnicas

### **SEO Optimizado**
```typescript
// Metadata dinámico por página
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
    },
  };
}
```

### **JSON-LD (Schema.org)**
```typescript
// Structured data para productos
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.title,
  description: product.description,
  image: product.image,
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: product.rating.rate,
    reviewCount: product.rating.count,
  },
};
```

### **Sitemap Dinámico**
```typescript
// Generación automática de sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const categories = await getCategories();
  
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/items/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));
  
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    ...productUrls,
    ...categoryUrls,
  ];
}
```

### **Performance**
- ✅ **Server Components**: Renderizado del servidor por defecto
- ✅ **Optimización de imágenes**: WebP/AVIF automático
- ✅ **Lazy loading**: Carga diferida de componentes
- ✅ **Caching inteligente**: Estrategias de caché optimizadas
- ✅ **Bundle splitting**: División automática de código

## 📱 Responsive Design

### **Breakpoints**
```css
/* Mobile First Approach */
.container-custom {
  padding: 1rem;           /* Mobile: < 640px */
}

@media (min-width: 640px) {
  .container-custom {
    padding: 1.5rem;       /* Tablet: 640px - 1024px */
  }
}

@media (min-width: 1024px) {
  .container-custom {
    padding: 2rem;         /* Desktop: > 1024px */
  }
}
```

### **Grid Responsive**
```css
/* Productos por pantalla */
.grid-responsive {
  grid-template-columns: 1fr;                    /* Mobile: 1 columna */
}

@media (min-width: 640px) {
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr);        /* Tablet: 2 columnas */
  }
}

@media (min-width: 1024px) {
  .grid-responsive {
    grid-template-columns: repeat(3, 1fr);       /* Desktop: 3 columnas */
  }
}

@media (min-width: 1280px) {
  .grid-responsive {
    grid-template-columns: repeat(4, 1fr);       /* Large: 4 columnas */
  }
}
```

### **Características Móviles**
- ✅ **Menú hamburguesa**: Navegación móvil optimizada
- ✅ **Sidebar de carrito**: Interfaz adaptativa
- ✅ **Touch-friendly**: Botones optimizados para touch
- ✅ **Gestos de navegación**: Swipe y scroll natural
- ✅ **Optimización de imágenes**: Diferentes tamaños según viewport

## 🛒 Carrito de Compras

### **Estado Global con Context API**
```typescript
// Contexto del carrito
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
}
```

### **Persistencia en localStorage**
```typescript
// Sincronización automática
useEffect(() => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    setItems(JSON.parse(savedCart));
  }
}, []);

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(items));
}, [items]);
```

### **Interacciones del Carrito**
- ✅ **Agregar productos**: Con animaciones de confirmación
- ✅ **Actualizar cantidades**: Control de stock
- ✅ **Eliminar productos**: Con confirmación
- ✅ **Vaciar carrito**: Limpieza completa
- ✅ **Persistencia**: Entre sesiones del navegador
- ✅ **Sincronización**: En tiempo real entre componentes

## 🔍 SEO y Accesibilidad

### **SEO Implementado**
- ✅ **Metadata dinámico**: Por página y producto
- ✅ **Open Graph**: Para redes sociales
- ✅ **Twitter Cards**: Para Twitter
- ✅ **JSON-LD**: Structured data para Google
- ✅ **Sitemap automático**: Con todas las URLs
- ✅ **Robots.txt**: Configuración para crawlers

### **Accesibilidad (WCAG 2.1 AA)**
- ✅ **Semantic HTML**: Uso correcto de etiquetas
- ✅ **ARIA labels**: Para screen readers
- ✅ **Navegación por teclado**: Focus visible
- ✅ **Contraste de colores**: Ratio mínimo 4.5:1
- ✅ **Screen reader friendly**: Textos descriptivos
- ✅ **Focus management**: Orden lógico de navegación

## ⚡ Optimizaciones de Performance

### **Core Web Vitals**
- ✅ **LCP (Largest Contentful Paint)**: < 2.5s
- ✅ **FID (First Input Delay)**: < 100ms
- ✅ **CLS (Cumulative Layout Shift)**: < 0.1

### **Optimizaciones Aplicadas**
1. **Server-Side Rendering**: Páginas pre-renderizadas
2. **Image Optimization**: Formatos modernos (WebP/AVIF)
3. **Code Splitting**: División automática por rutas
4. **Lazy Loading**: Carga diferida de imágenes
5. **Caching Strategies**: Múltiples niveles de caché
6. **Bundle Optimization**: Tree shaking y minificación

### **Infinite Scroll Optimizado**
```typescript
// Intersection Observer para infinite scroll
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && hasMore && !isLoading) {
      loadMoreProducts();
    }
  },
  { threshold: 0.1, rootMargin: '100px' }
);
```

## 🧪 Testing y Demostración

### **Cómo Probar el Loading (Para Prueba Técnica)**

#### **Método 1: DevTools Throttling (Recomendado)**
1. Abrir DevTools (F12)
2. Network → Throttling: "Fast 3G"
3. Navegar entre páginas
4. **Resultado**: Verás AMBOS loaders (barra + spinner)

#### **Método 2: Infinite Scroll**
1. Ir a página principal
2. Scroll hasta el final
3. **Resultado**: Loader rotatorio visible por 1 segundo

#### **Método 3: Primera Visita**
1. Abrir navegación privada
2. Visitar la aplicación
3. **Resultado**: Loader en todas las páginas nuevas

#### **Método 4: Búsqueda**
1. Buscar cualquier término
2. **Resultado**: Loader durante la búsqueda

### **Estados de Carga Implementados**
1. **Loading**: Spinner rotatorio con tiempo mínimo
2. **Empty**: Estado vacío con ilustración y CTA
3. **Error**: Estado de error con botón de reintentar
4. **Success**: Contenido con animaciones de entrada

## 📊 Métricas de Rendimiento

### **Lighthouse Score**
- **Performance**: 95+ ✅
- **Accessibility**: 100 ✅
- **Best Practices**: 100 ✅
- **SEO**: 100 ✅

### **Bundle Analysis**
```bash
# Analizar bundle size
npm run build
npm run analyze
```

### **Core Web Vitals**
- **LCP**: < 2.5s ✅
- **FID**: < 100ms ✅
- **CLS**: < 0.1 ✅

## 🚀 Despliegue

### **Build para Producción**
```bash
# Crear build optimizado
npm run build

# Verificar build
npm start
```

### **Variables de Entorno**
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

### **Plataformas Recomendadas**
- **Vercel** (recomendado por Next.js)
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Heroku**

### **Configuración de Despliegue**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## 📚 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Producción
npm run build        # Build optimizado
npm start           # Servidor de producción

# Calidad de código
npm run lint        # ESLint
npm run type-check  # TypeScript check

# Utilidades
# Variables de entorno se configuran manualmente
```

## 🔧 Configuración Avanzada

### **Next.js Config**
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  images: {
    domains: ['fakestoreapi.com'],
  },
};
```

### **Tailwind Config**
```typescript
// tailwind.config.ts
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4FB6BE',
        secondary: '#EBBA68',
        accent: '#F5D05F',
        'text-primary': '#014471',
      },
    },
  },
};
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollador**: Abel Serra
- **Framework**: Next.js 15 + React 19
- **Styling**: Tailwind CSS v4
- **API**: FakeStore API

## 📞 Contacto

- **Teléfono**: 02121112233
- **Website**: sambilstore.vercel.app

---

**SambilStore** - Tu tienda online de confianza 🛍️✨

*Desarrollado como prueba técnica demostrando conocimientos avanzados en Next.js 15, React 19, TypeScript, Tailwind CSS v4, SEO y Accesibilidad.*
