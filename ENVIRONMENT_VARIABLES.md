# Variables de Entorno - SambilStore

Este documento describe las variables de entorno utilizadas en el proyecto SambilStore.

## 📋 Variables Requeridas

### Variables Públicas (Client-side)
Estas variables están disponibles tanto en el servidor como en el cliente:

| Variable | Descripción | Valor por Defecto | Ejemplo |
|----------|-------------|-------------------|---------|
| `NEXT_PUBLIC_APP_URL` | URL base de la aplicación | `http://localhost:3000` | `https://sambilstore.vercel.app` |
| `NEXT_PUBLIC_API_URL` | URL de la API de productos | `https://fakestoreapi.com` | `https://api.sambilstore.com` |
| `NEXT_PUBLIC_ANALYTICS_ID` | ID de Google Analytics (opcional) | - | `GA-XXXXXXXXX` |

### Variables del Servidor (Server-side)
Estas variables solo están disponibles en el servidor:

| Variable | Descripción | Cuándo usar |
|----------|-------------|-------------|
| `DATABASE_URL` | URL de conexión a la base de datos | Para futuras funcionalidades |
| `API_SECRET_KEY` | Clave secreta para APIs externas | Para autenticación |
| `JWT_SECRET` | Secreto para tokens JWT | Para autenticación de usuarios |

## 🚀 Configuración por Entorno

### Desarrollo Local
1. Copia `.env.example` a `.env.local`
2. Configura las variables según tu entorno local:

```bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
NEXT_PUBLIC_ANALYTICS_ID=
```

### Producción (Vercel)
1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Settings → Environment Variables
3. Agrega las variables necesarias:

```
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
NEXT_PUBLIC_ANALYTICS_ID=GA-XXXXXXXXX
```

## 🔧 Uso en el Código

### Importar configuración
```typescript
import { APP_URL, API_URL, ANALYTICS_ID } from '@/lib/config';
```

### Usar variables directamente
```typescript
// En componentes del cliente
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

// En API routes
const secretKey = process.env.API_SECRET_KEY;
```

## 📁 Estructura de Archivos

```
sambilstore/
├── .env.example          # Plantilla de variables (se sube a git)
├── .env.local           # Variables locales (NO se sube a git)
├── .env.development     # Variables de desarrollo
├── .env.production      # Variables de producción
└── lib/
    └── config.ts        # Configuración centralizada
```

## ⚠️ Seguridad

- **NUNCA** subas archivos `.env.local` o `.env.production` al repositorio
- Las variables que empiezan con `NEXT_PUBLIC_` son visibles en el cliente
- Las variables sin prefijo solo están disponibles en el servidor
- Usa `.env.example` como plantilla para otros desarrolladores

## 🔄 Despliegue

### Vercel
1. Configura las variables en el dashboard de Vercel
2. Haz redeploy para aplicar los cambios
3. Verifica que las variables estén disponibles en producción

### Otros proveedores
- **Netlify**: Variables en Site settings → Environment variables
- **Railway**: Variables en Variables tab
- **Heroku**: Variables con `heroku config:set`

## 🐛 Troubleshooting

### Variables no se cargan
1. Verifica que el archivo `.env.local` existe
2. Reinicia el servidor de desarrollo (`npm run dev`)
3. Verifica que las variables empiecen con `NEXT_PUBLIC_` para uso en cliente

### Variables en producción
1. Verifica que estén configuradas en Vercel
2. Haz redeploy después de cambiar variables
3. Usa `console.log(process.env.NEXT_PUBLIC_APP_URL)` para debuggear

## 📚 Referencias

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
