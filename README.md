# Forge UI

Plataforma de diseño y desarrollo modular para interfaces web comercializables. Sistema de diseño multiplataforma + componentes + starter kits.

---

## Arquitectura

```
forge-ui/
├── packages/
│   ├── tokens/       → @forge-ui/tokens     (Design Tokens - JSON SSOT)
│   ├── css/          → @forge-ui/css         (Compilador JSON → CSS Variables)
│   ├── tailwind/     → @forge-ui/tailwind    (Preset de Tailwind CSS)
│   ├── variants/     → @forge-ui/variants    (Variantes CVA compartidas)
│   └── react/        → @forge-ui/react       (Librería de componentes React)
└── apps/
    └── admin-starter/ → Frontend Starter Kit  (Producto comercializable)
```

## Flujo de Dependencias

```
tokens → css → tailwind → variants → react → admin-starter
```

## Quick Start

```bash
# Instalar dependencias
npm install

# Build completo del pipeline
npm run build:all

# Dev server del Starter Kit
cd apps/admin-starter
npm run dev
```

## Scripts Disponibles (raíz)

| Script | Acción |
|--------|--------|
| `build:tokens` | Compila tipos de tokens (tsc) |
| `build:css` | Genera CSS variables desde JSON |
| `build:tailwind` | Compila Tailwind preset (tsc) |
| `build:variants` | Compila variantes compartidas (tsup + tsc) |
| `build:react` | Bundlea librería React (tsup + tsc) |
| `build:core` | Pipeline: tokens → css → tailwind → variants |
| `build:all` | Pipeline completo incluyendo react |
| `changeset` | Crear intención de cambio |
| `version-packages` | Aplicar versiones (Changesets) |
| `release` | Publicar paquetes |

## Sistema de Temas

Dos dimensiones independientes y combinables:

- **Color theme** (`data-theme`): indigo, emerald, rose, ocean
- **Light/Dark** (`data-mode`): light, dark

```html
<html data-mode="dark" data-theme="ocean">
```

## Tecnologías

- TypeScript (strict mode en todo el monorepo)
- NPM Workspaces (monorepo)
- Tailwind CSS 3.4
- Radix UI (accesibilidad)
- CVA (variantes)
- Vite (bundler de apps)
- tsup (bundler de paquetes)
- MSW (mocking a nivel de red)
- TanStack Query + Zustand (estado)
- React Router v6 (routing)
- Changesets + Commitlint + Husky (versionamiento)

## Versionamiento

```bash
npx changeset            # Declarar qué paquetes cambiaron
npx changeset version    # Bump versiones + CHANGELOG
npx changeset publish    # Publicar a npm
```

Commits: Conventional Commits obligatorio (`feat`, `fix`, `chore`, etc.)
