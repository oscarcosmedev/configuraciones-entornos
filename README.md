# Configuración Web

## Descripción
Aplicación web para la gestión y configuración de entornos. Permite visualizar, editar y transferir configuraciones entre diferentes ambientes (desarrollo, QA, producción).

## Demo
[Ver aplicación en vivo](https://majestic-tapioca-29ad2c.netlify.app/)

## Características
- **Vista Preview**: Visualización de configuraciones por cluster y aplicación
- **Edición**: Búsqueda avanzada y edición en línea de configuraciones
- **Traspaso**: Transferencia de configuraciones entre entornos

## Stack Tecnológico
- **React 19** + **TypeScript** + **Vite**
- **Zustand** para estado global
- **React Router** para navegación
- **React Hook Form** + **Zod** para formularios
- **TanStack Table** para tablas
- **SASS** para estilos
- **MSW** para simulación de APIs

## Desarrollo Local

### Instalación
```bash
npm install
npm run dev
```

### Comandos
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run lint     # Linting
npm run test     # Tests
```

### Estructura del Proyecto
```
src/
├── components/      # Componentes reutilizables
│   ├── buttons/     # Componentes de botones
│   ├── modal/       # Sistema de modales
│   ├── toast/       # Notificaciones
│   └── ...
├── views/           # Páginas principales
│   ├── preview/     # Vista de configuraciones
│   ├── edicion/     # Módulo de edición
│   └── traspaso/    # Sistema de transferencia
├── store/           # Estados globales (Zustand)
├── services/        # Servicios de API
├── schemas/         # Validaciones con Zod
├── mocks/           # Configuración de MSW
├── style/           # Estilos globales SCSS
└── types/           # Definiciones de TypeScript
```

## Configuración MSW
La aplicación usa Mock Service Worker para simular APIs:
- Se activa automáticamente en desarrollo
- En producción se activa si no hay `VITE_API_URL` configurada

## Despliegue
Configurado para Netlify con:
- Archivo `_redirects` para SPA routing
- MSW funciona automáticamente sin configuración adicional
