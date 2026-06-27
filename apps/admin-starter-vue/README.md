# Forge Admin Starter (Vue)

Full-featured admin panel built with Vue 3 and the Forge UI design system. Functional out of the box with simulated API via MSW — ready to connect to any backend.

## Quick Start

```bash
cd apps/admin-starter-vue
npm run dev
# → http://localhost:5173
# → Login with any credentials (auth is simulated)
```

## Stack

Vite • Vue 3 • TypeScript • Vue Router • TanStack Vue Query • Pinia • MSW • Tailwind CSS • `@ncripta/forge-vue`

## Modules

- **Auth:** Login with simulated latency and route guards
- **Dashboard:** KPIs, charts (LineChart), recent users panel
- **Users:** Table with search, Dialog create, delete with toast
- **Projects:** Card grid, progress bars, Dialog create, category filters
- **Settings:** Profile, security, preferences (dark mode toggle)
- **Notifications:** Popover panel with mark-as-read, auto-refresh

## Mock API (MSW)

All endpoints are intercepted at network level. To connect a real backend, disable MSW in `main.ts` and update `BASE_URL` in `services/api.client.ts`.

## Theming

Color themes and dark mode work out of the box via `data-theme` and `data-mode` attributes.

## License

Commercial — see `apps/LICENSE` for terms.
