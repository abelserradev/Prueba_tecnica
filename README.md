# 🛍️ SambilStore - Tienda Online

Una aplicación de e-commerce moderna construida con **Next.js 15**, **React 19**, **TypeScript** y **Tailwind CSS**. Consume la API de FakeStore para mostrar productos, categorías y funcionalidades de carrito de compras.

## ✨ Características

### 🏠 **Página Principal**
- Lista de productos con paginación
- Ordenamiento por relevancia, precio y calificación
- Búsqueda integrada
- Botones "Agregar al carrito" con animaciones
- Diseño responsive

### 🔍 **Búsqueda de Productos**
- Búsqueda en tiempo real
- Resultados filtrados
- Página dedicada de resultados

### 📂 **Categorías**
- Lista de todas las categorías disponibles
- Filtrado por categoría específica
- Navegación intuitiva

### 🛒 **Carrito de Compras**
- Agregar/eliminar productos
- Actualizar cantidades
- Persistencia en localStorage
- Sidebar deslizable
- Contador en tiempo real

### 📱 **Diseño Responsive**
- Mobile-first approach
- Menú hamburguesa para móvil
- Sidebar de carrito
- Optimizado para todos los dispositivos

### ⚡ **Performance**
- Server Components (RSC)
- Optimización de imágenes
- Lazy loading
- Caching inteligente
- Core Web Vitals optimizados

## 🚀 Tecnologías

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Heroicons
- **API**: FakeStore API
- **State Management**: React Context API
- **SEO**: Metadata dinámico, JSON-LD, sitemap

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd sambilstore
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 🏗️ Estructura del Proyecto

```
sambilstore/
├── app/                          # App Router (Next.js 15)
│   ├── globals.css              # Estilos globales y variables CSS
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página principal
│   ├── loading.tsx              # UI de carga global
│   ├── error.tsx                # Página de error
│   ├── not-found.tsx            # Página 404
│   ├── robots.ts                # robots.txt dinámico
│   ├── sitemap.ts               # sitemap.xml dinámico
│   ├── manifest.ts              # PWA manifest
│   ├── items/[id]/              # Páginas de productos
│   ├── categorias/              # Páginas de categorías
│   └── buscar/                  # Página de búsqueda
├── components/                    # Componentes reutilizables
│   ├── header.tsx               # Header con navegación
│   ├── footer.tsx                # Footer
│   ├── product-card.tsx          # Tarjeta de producto
│   ├── paginated-product-list.tsx # Lista paginada
│   ├── search-bar.tsx            # Barra de búsqueda
│   ├── sort-selector.tsx         # Selector de ordenamiento
│   ├── pagination.tsx            # Componente de paginación
│   ├── cart-sidebar.tsx         # Sidebar del carrito
│   ├── mobile-menu.tsx           # Menú móvil
│   ├── add-to-cart-button.tsx   # Botón agregar al carrito
│   └── loader.tsx                # Componente de carga
├── contexts/                     # Contextos de React
│   └── cart-context.tsx          # Contexto del carrito
├── lib/                          # Utilidades y lógica
│   ├── api.ts                    # Funciones de API
│   └── sort-products.ts          # Lógica de ordenamiento
├── types/                        # Tipos de TypeScript
│   └── index.ts                  # Interfaces y tipos
└── public/                       # Archivos estáticos
    └── logo_sambil.jpg           # Logo de Sambil
```

## 🎨 Características de Diseño

### **Paleta de Colores**
- **Primary**: #4FB6BE (Turquesa)
- **Secondary**: #EBBA68 (Dorado)
- **Accent**: #F5D05F (Amarillo)
- **Text Primary**: #014471 (Azul oscuro)

### **Componentes Personalizados**
- Botones con animaciones hover
- Cards con efectos de escala
- Sidebar deslizable
- Menú hamburguesa animado
- Paginación con círculos apilados

## 🔧 Funcionalidades Técnicas

### **SEO Optimizado**
- Metadata dinámico por página
- JSON-LD para productos
- Sitemap automático
- Robots.txt configurado
- Open Graph y Twitter Cards

### **Performance**
- Server Components para mejor rendimiento
- Optimización de imágenes con Next.js
- Lazy loading de componentes
- Caching inteligente
- Bundle splitting automático

### **Accesibilidad**
- Navegación por teclado
- ARIA labels y roles
- Contraste de colores WCAG
- Screen reader friendly
- Focus management

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Características Móviles**
- Menú hamburguesa
- Sidebar de carrito
- Touch-friendly buttons
- Optimización de imágenes
- Gestos de navegación

## 🛒 Funcionalidades del Carrito

### **Estado Global**
- Context API para gestión de estado
- Persistencia en localStorage
- Sincronización en tiempo real
- Contador de productos

### **Interacciones**
- Agregar productos
- Actualizar cantidades
- Eliminar productos
- Vaciar carrito
- Persistencia entre sesiones

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Iniciar producción
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🌐 API Externa

La aplicación consume la **FakeStore API**:
- **Base URL**: `https://fakestoreapi.com`
- **Endpoints utilizados**:
  - `/products` - Todos los productos
  - `/products/{id}` - Producto específico
  - `/categories` - Categorías
  - `/products/category/{category}` - Productos por categoría

## 📊 Métricas de Performance

### **Core Web Vitals**
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### **Optimizaciones**
- Server-side rendering
- Image optimization
- Code splitting
- Lazy loading
- Caching strategies

## 🔒 Seguridad

- Sanitización de inputs
- Validación de tipos
- Headers de seguridad
- HTTPS enforcement
- XSS protection

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📈 Próximas Mejoras

- [ ] Autenticación de usuarios
- [ ] Wishlist/Favoritos
- [ ] Reviews y ratings
- [ ] Filtros avanzados
- [ ] Checkout process
- [ ] Notificaciones push
- [ ] PWA features
- [ ] Analytics integration

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

- **Email**: info@sambilstore.com
- **Teléfono**: 02121112233
- **Website**: https://sambilstore.com

---

**SambilStore** - Tu tienda online de confianza 🛍️✨