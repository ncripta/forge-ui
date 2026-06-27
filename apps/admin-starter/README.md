# Forge Admin Starter (React)

Full-featured admin panel built with React 18 and the Forge UI design system. Functional out of the box with simulated API via MSW — ready to connect to any backend.

## Quick Start

```bash
cd apps/admin-starter
npm run dev
# → http://localhost:5173
# → Login with any credentials (auth is simulated)
```

## Stack

Vite • React 18 • TypeScript • React Router v6 • TanStack Query • Zustand • MSW • Tailwind CSS • `@ncripta/forge-react`

## Modules

- **Auth:** Login with simulated latency and route guards
- **Dashboard:** KPIs, charts (LineChart, BarChart), recent users panel
- **Users:** Full CRUD with DataTable, search, filters, Sheet editing
- **Projects:** Card grid, progress bars, Dialog create/edit, category filters
- **Analytics:** Traffic metrics, user growth, donut chart
- **Settings:** Profile, security, preferences (dark mode toggle)
- **Notifications:** Popover panel with mark-as-read, auto-refresh

## Mock API (MSW)

All endpoints are intercepted at network level. To connect a real backend, disable MSW in `main.tsx` and update `BASE_URL` in `services/api.client.ts`.

## Theming

Color themes and dark mode work out of the box via `data-theme` and `data-mode` attributes.

## License

Commercial — see `apps/LICENSE` for terms.
