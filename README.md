# Forge UI

English | [Español](./README.es.md)

A modular design system and modern UI component toolkit — accessible and highly customizable. Built with React, Vue, Tailwind CSS and Radix UI.

Forge UI is designed as a scalable ecosystem: from framework-agnostic Design Tokens to robust component libraries, built for creating admin panels and high-performance web applications.

---

## 🏗️ Monorepo Architecture

The project uses NPM Workspaces to manage multiple packages under the `@ncripta` organization scope.

```text
forge-ui/
├── packages/
│   ├── tokens/        → @ncripta/forge-tokens      (Design Tokens - JSON SSOT)
│   ├── css/           → @ncripta/forge-css          (CSS Variables auto-generator)
│   ├── tailwind/      → @ncripta/forge-tailwind     (Tailwind CSS Preset)
│   ├── variants/      → @ncripta/forge-variants     (Shared CVA variant definitions)
│   ├── react/         → @ncripta/forge-react        (React component library)
│   └── vue/           → @ncripta/forge-vue          (Vue 3 component library)
└── apps/
    ├── admin-starter/     → React Starter Kit       (Reference implementation)
    └── admin-starter-vue/ → Vue Starter Kit         (Reference implementation)
```

## 🔄 Dependency Flow

The architecture follows a strict unidirectional flow to ensure decoupling:

`tokens` → `css` → `tailwind` → `variants` → `react` / `vue` → `apps`

## 🚀 Quick Start

```bash
git clone https://github.com/ncripta/forge-ui.git
cd forge-ui
npm install
npm run build:all
cd apps/admin-starter
npm run dev
```

## 🎨 Theming System

Two independent and combinable dimensions:

- **Color theme** (`data-theme`): `default` (indigo), `emerald`, `rose`, `ocean`.
- **Mode** (`data-mode`): `light`, `dark`.

```html
<html data-mode="dark" data-theme="ocean">
```

## 🛠️ Core Technologies

- **TypeScript:** Strict mode across the entire monorepo.
- **Tailwind CSS:** Utility engine (v3.4+).
- **Radix UI:** Headless primitives for flawless accessibility (WAI-ARIA).
- **CVA (Class Variance Authority):** Typed component variant management.
- **Vite & Tsup:** Ultra-fast bundlers for apps and libraries.
- **Lucide Icons:** Clean, consistent iconography.
- **Changesets + Husky:** Semantic versioning and strict commit control.

## 📦 Available Commands

Run from the monorepo root:

| Command | Action |
|---------|--------|
| `npm run build:tokens` | Compile token types (tsc) |
| `npm run build:css` | Generate CSS variables from token JSON |
| `npm run build:tailwind` | Compile Tailwind preset (tsc) |
| `npm run build:variants` | Compile shared variants (tsup + tsc) |
| `npm run build:react` | Bundle React component library (tsup + tsc) |
| `npm run build:vue` | Bundle Vue component library (tsup + vue-tsc) |
| `npm run build:core` | Core pipeline: tokens → css → tailwind → variants |
| `npm run build:all` | Full pipeline including react and vue |

### Versioning

We use [Changesets](https://github.com/changesets/changesets) and Conventional Commits for automated semantic versioning:

```bash
npx changeset            # 1. Declare which packages changed
npx changeset version    # 2. Bump versions and generate CHANGELOGs
npx changeset publish    # 3. Publish packages to npm
```

## 📄 License

- **Packages (`packages/`):** MIT — free to use. See `packages/LICENSE`.
- **Applications (`apps/`):** Commercial license. See `apps/LICENSE` for production use restrictions.
