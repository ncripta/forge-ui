# Forge Admin Starter (React)

Panel administrativo completo construido con React 18 y el sistema de diseño Forge UI. Funcional desde el primer momento con API simulada via MSW — listo para conectar con cualquier backend.

## Inicio Rápido

```bash
cd apps/admin-starter
npm run dev
# → http://localhost:5173
# → Login con cualquier credencial (auth simulada)
```

## Stack

Vite • React 18 • TypeScript • React Router v6 • TanStack Query • Zustand • MSW • Tailwind CSS • `@ncripta/forge-react`

## Módulos

- **Auth:** Login con latencia simulada y guards de ruta
- **Dashboard:** KPIs, gráficos (LineChart, BarChart), panel de usuarios recientes
- **Usuarios:** CRUD completo con DataTable, búsqueda, filtros, edición en Sheet
- **Proyectos:** Grid de cards, barras de progreso, Dialog crear/editar, filtros por categoría
- **Analíticas:** Métricas de tráfico, crecimiento de usuarios, gráfico donut
- **Configuración:** Perfil, seguridad, preferencias (toggle dark mode)
- **Notificaciones:** Panel Popover con marcar como leída, auto-refresh

## Mock API (MSW)

Todos los endpoints se interceptan a nivel de red. Para conectar un backend real, desactiva MSW en `main.tsx` y actualiza `BASE_URL` en `services/api.client.ts`.

## Temas

Los temas de color y modo oscuro funcionan nativamente via los atributos `data-theme` y `data-mode`.

## Licencia

Comercial — ver `apps/LICENSE` para los términos.
