# @forge-ui/admin-starter

Frontend Starter Kit — aplicación administrativa funcional construida sobre el ecosistema Forge UI. Producto comercializable listo para conectar con cualquier backend.

---

## Inicio Rápido

```bash
cd apps/admin-starter
npm run dev
# → http://localhost:5173
# → Login: cualquier credencial (auth simulada)
```

## Stack

| Tecnología | Rol |
|-----------|-----|
| Vite | Build tool + dev server |
| React 18 | UI framework |
| TypeScript | Tipado estricto |
| React Router v6 | Routing con layouts anidados + guards |
| TanStack Query | Gestión de estado async + cache |
| Zustand | Estado global de UI (sidebar, auth) |
| MSW | Mock Service Worker (simula API REST) |
| Tailwind CSS | Utilidades de estilo (vía `@forge-ui/tailwind` preset) |
| `@forge-ui/react` | Librería de componentes |

---

## Arquitectura

```
src/
├── config/           ← Configuración dinámica (app, navigation)
├── layouts/          ← AuthLayout, AdminLayout (Sidebar + Topbar)
├── pages/            ← Páginas por módulo
│   ├── Dashboard.tsx
│   ├── Analytics.tsx
│   ├── Login.tsx
│   ├── users/
│   ├── projects/
│   └── settings/
├── providers/        ← ThemeProvider, AppProviders
├── routes/           ← Router + guards (ProtectedRoute, PublicOnlyRoute)
├── services/         ← Capa de abstracción HTTP (apiClient, UserService, etc.)
├── stores/           ← Zustand stores (ui, auth)
└── mocks/            ← MSW (handlers, data mock)
    ├── browser.ts
    ├── handlers/
    └── data/
```

## Módulos Implementados

### Autenticación
- Login con simulación de latencia y estados de carga
- Route guards (redirige a `/login` si no autenticado)
- Store persistido en localStorage

### Dashboard
- 4 KPIs con iconos y badges de tendencia
- LineChart de actividad del sistema
- Panel lateral de usuarios recientes con status badges
- Selector de período (7/30 días)

### Usuarios (CRUD completo)
- DataTable con búsqueda, filtros por rol/estado, paginación
- Creación/edición en Sheet lateral
- Eliminación con toast de confirmación
- Botón "Limpiar filtros"

### Proyectos (CRUD completo)
- Grid de cards con progreso, avatares y estados
- Tabs (Todos, Activos, Completados, Archivados)
- Panel de filtros colapsable por categoría
- Creación/edición en Dialog modal
- Card "Crear Nuevo" como placeholder visual

### Analíticas
- KPIs de tráfico (páginas vistas, sesiones, rebote, duración)
- LineChart de crecimiento de usuarios
- DonutChart de tráfico por fuente
- BarChart de páginas vistas semanales

### Notificaciones
- Panel Popover en el Topbar
- Badge con conteo de no leídas
- Marcar individual o todas como leídas
- Iconos por tipo (info, success, warning, error)
- Auto-refetch cada 30 segundos

### Configuración
- Tabs: Perfil, Seguridad, Preferencias
- Edición de nombre/email/avatar
- Cambio de contraseña
- Toggle dark mode + notificaciones push

---

## Sistema de Temas

### Color Themes
Selector en el Topbar. Cambia la paleta de color globalmente:
- **Indigo** (default)
- **Emerald**
- **Rose**
- **Ocean**

```javascript
document.documentElement.setAttribute('data-theme', 'emerald');
```

### Dark Mode
Toggle independiente del color theme:
```javascript
document.documentElement.setAttribute('data-mode', 'dark');
```

Ambos son combinables: `data-mode="dark" data-theme="rose"` funciona correctamente.

---

## Mock API (MSW)

Toda la app funciona sin backend. MSW intercepta las peticiones HTTP a nivel de red:

| Endpoint | Métodos | Handler |
|----------|---------|---------|
| `/api/users` | GET, POST, DELETE | `mocks/handlers/users.ts` |
| `/api/users/:id` | GET, PUT, DELETE | — |
| `/api/users/bulk-delete` | POST | — |
| `/api/projects` | GET, POST | `mocks/handlers/projects.ts` |
| `/api/projects/:id` | PUT, DELETE | — |
| `/api/notifications` | GET | `mocks/handlers/notifications.ts` |
| `/api/notifications/:id/read` | PUT | — |
| `/api/notifications/mark-all-read` | POST | — |

### Conectar un backend real

1. Eliminar o condicionar el inicio de MSW en `main.tsx`
2. Cambiar `BASE_URL` en `services/api.client.ts`
3. Los componentes no requieren ningún cambio

---

## Configuración Dinámica

### `src/config/app.config.ts`
Nombre, logo, tema default, locales, rutas de fallback. El comprador modifica este archivo para re-etiquetar la app.

### `src/config/navigation.ts`
Menú del sidebar generado dinámicamente. Soporta roles, badges y agrupación.

---

## Scripts

```bash
npm run dev       # Dev server (Vite)
npm run build     # Build de producción
npm run preview   # Preview del build
```
