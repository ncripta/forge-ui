# Forge Admin Starter (Vue)

Panel administrativo completo construido con Vue 3 y el sistema de diseño Forge UI. Funcional desde el primer momento con API simulada via MSW — listo para conectar con cualquier backend.

## Inicio Rápido

```bash
cd apps/admin-starter-vue
npm run dev
# → http://localhost:5173
# → Login con cualquier credencial (auth simulada)
```

## Stack

Vite • Vue 3 • TypeScript • Vue Router • TanStack Vue Query • Pinia • MSW • Tailwind CSS • `@ncripta/forge-vue`

## Módulos

- **Auth:** Login con latencia simulada y guards de ruta
- **Dashboard:** KPIs, gráficos (LineChart), panel de usuarios recientes
- **Usuarios:** Tabla con búsqueda, Dialog de creación, eliminación con toast
- **Proyectos:** Grid de cards, barras de progreso, Dialog crear, filtros por categoría
- **Configuración:** Perfil, seguridad, preferencias (toggle dark mode)
- **Notificaciones:** Panel Popover con marcar como leída, auto-refresh

## Mock API (MSW)

Todos los endpoints se interceptan a nivel de red. Para conectar un backend real, desactiva MSW en `main.ts` y actualiza `BASE_URL` en `services/api.client.ts`.

## Temas

Los temas de color y modo oscuro funcionan nativamente via los atributos `data-theme` y `data-mode`.

## Licencia

Comercial — ver `apps/LICENSE` para los términos.
