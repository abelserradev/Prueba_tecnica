#!/usr/bin/env node

/**
 * Script para configurar variables de entorno
 * Uso: node scripts/setup-env.js
 */

const fs = require('fs');
const path = require('path');

const envExamplePath = path.join(__dirname, '..', '.env.example');
const envLocalPath = path.join(__dirname, '..', '.env.local');

function setupEnvironment() {
  console.log('🚀 Configurando variables de entorno para SambilStore...\n');

  // Verificar si .env.example existe
  if (!fs.existsSync(envExamplePath)) {
    console.error('❌ Error: No se encontró el archivo .env.example');
    console.log('💡 Asegúrate de que el archivo .env.example existe en la raíz del proyecto');
    process.exit(1);
  }

  // Verificar si .env.local ya existe
  if (fs.existsSync(envLocalPath)) {
    console.log('⚠️  El archivo .env.local ya existe');
    console.log('💡 Si quieres sobrescribirlo, elimínalo manualmente y ejecuta este script nuevamente');
    return;
  }

  try {
    // Leer .env.example
    const envExampleContent = fs.readFileSync(envExamplePath, 'utf8');
    
    // Crear .env.local con el contenido de .env.example
    fs.writeFileSync(envLocalPath, envExampleContent);
    
    console.log('✅ Archivo .env.local creado exitosamente');
    console.log('📝 Edita el archivo .env.local con tus valores específicos');
    console.log('🔒 Recuerda que .env.local NO se sube al repositorio');
    
    console.log('\n📋 Variables configuradas:');
    console.log('   - NEXT_PUBLIC_APP_URL (URL de la aplicación)');
    console.log('   - NEXT_PUBLIC_API_URL (URL de la API)');
    console.log('   - NEXT_PUBLIC_ANALYTICS_ID (ID de Google Analytics)');
    
    console.log('\n🚀 Para desarrollo local:');
    console.log('   npm run dev');
    
    console.log('\n🌐 Para producción en Vercel:');
    console.log('   1. Ve a tu proyecto en vercel.com');
    console.log('   2. Settings → Environment Variables');
    console.log('   3. Agrega las variables necesarias');
    
  } catch (error) {
    console.error('❌ Error al configurar variables de entorno:', error.message);
    process.exit(1);
  }
}

// Ejecutar el script
setupEnvironment();
