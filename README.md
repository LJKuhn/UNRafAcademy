# 🎓 UNRaf Academy Cast - Plataforma Web de Investigación

Aplicación web frontend desarrollada como parte del proyecto PPS-UNRaf-OCLA para visualizar y compartir investigaciones del sector lácteo argentino.

## 📋 Descripción del Proyecto

UNRaf Academy Cast es la interfaz web del sistema de análisis predictivo del sector lácteo. Proporciona una plataforma moderna y accesible para visualizar datasets, modelos de Machine Learning y resultados de investigación de la Universidad Nacional de Rafaela.

## ✨ Características Principales

- 🏠 **Dashboard Principal:** Vista general de la plataforma académica
- 📊 **Visualización de Datos:** Gráficos interactivos de datasets agropecuarios
- 🤖 **Modelos ML:** Interfaz para algoritmos de predicción de precios
- 📈 **UNRafCast:** Sistema de análisis predictivo integrado
- 📚 **Recursos:** Biblioteca de datasets y documentación
- 📰 **Noticias:** Actualizaciones del sector lácteo y investigación
- 👤 **Perfiles:** Sistema de usuarios y administración
- 📞 **Contacto:** Información institucional

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ o superior
- npm o yarn

### Configuración Local

```bash
# 1. Navegar al directorio de la aplicación
cd "Desarrollo/unraf-academy-cast-tailwind-version"

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173 (por defecto)
# Si está configurado en puerto 8080: http://localhost:8080
```

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Compilar para producción  
npm run build:dev    # Compilar en modo desarrollo
npm run preview      # Preview de producción
npm run lint         # Linter de código
```

## 📂 Estructura del Proyecto

```text
src/
├── components/              # Componentes reutilizables
│   ├── ui/                 # Componentes base (shadcn/ui)
│   ├── Navigation.tsx      # Navegación principal
│   ├── AvatarSelector.tsx  # Selector de avatar
│   └── ...                 # Otros componentes
├── pages/                  # Páginas de la aplicación
│   ├── Home.tsx           # Página principal
│   ├── UNRafCast.tsx      # Dashboard de análisis
│   ├── Resources.tsx      # Biblioteca de recursos
│   ├── News.tsx           # Noticias y actualizaciones
│   ├── Profile.tsx        # Perfil de usuario
│   ├── Admin.tsx          # Panel administrativo
│   └── Contact.tsx        # Información de contacto
├── hooks/                  # Custom hooks
├── lib/                    # Utilidades y configuración
└── main.tsx               # Punto de entrada
```

## 🧰 Stack Tecnológico

### Frontend Core
- **React 18** - Biblioteca de UI con hooks modernos
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Build tool rápido y moderno
- **React Router DOM** - Navegación del lado del cliente

### UI y Estilos
- **Tailwind CSS** - Framework de CSS utility-first
- **shadcn/ui** - Componentes React reutilizables
- **Radix UI** - Primitivos de UI accesibles
- **Lucide React** - Iconografía moderna
- **next-themes** - Soporte para tema claro/oscuro

### Gestión de Estado y Datos
- **TanStack Query** - Manejo de estado del servidor
- **React Hook Form** - Formularios performantes
- **Zod** - Validación de esquemas TypeScript

### Visualización y Gráficos
- **Recharts** - Biblioteca de gráficos para React
- **Embla Carousel** - Carrusel ligero y accesible

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **TypeScript ESLint** - Reglas específicas para TS

## 🔧 Configuración Personalizada

### Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```env
# API Endpoints (futuro)
VITE_API_URL=http://localhost:8000
VITE_ML_API_URL=http://localhost:5000

# Configuración de tema
VITE_THEME_DEFAULT=light
```

### Configuración de Vite
El archivo `vite.config.ts` incluye configuración optimizada para:
- Hot Module Replacement (HMR)
- Build optimizado para producción
- Resolución de paths absolutos
- Plugin React SWC para compilación rápida

## 🚀 Deployment

### Build para Producción
```bash
npm run build
```

### Deploy Local (Preview)
```bash
npm run preview
```

### Deploy en Servicios Cloud
- **Vercel:** Conectar repositorio GitHub
- **Netlify:** Drag & drop de carpeta `dist/`
- **GitHub Pages:** Usar GitHub Actions
- **Railway/Render:** Deploy automático desde repo

## 🔮 Integración Futura

Esta aplicación está diseñada para integrarse con:

- **Backend Python:** API para modelos de ML (`../EntrnamientoPPS/`)
- **Base de Datos:** PostgreSQL o MongoDB
- **APIs Externas:** OCLA, INDEC, datos climáticos
- **Autenticación:** Sistema de usuarios UNRaf
- **Real-time:** WebSockets para datos en vivo

## 👥 Contribución

Este proyecto es parte de las **Prácticas Profesionales Supervisadas** de la **Universidad Nacional de Rafaela**.

**Desarrollador:** [LJKuhn](https://github.com/LJKuhn)  
**Institución:** Universidad Nacional de Rafaela  
**Proyecto:** PPS-UNRaf-OCLA 2025

---

🎓 **UNRaf Academy Cast** - Democratizando el acceso a la investigación agropecuaria argentina
