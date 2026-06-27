# Forge UI

[English](./README.md) | Español

Sistema de diseño modular y toolkit de componentes UI moderno, accesible y altamente personalizable. Construido con React, Vue, Tailwind CSS y Radix UI.

Forge UI está diseñado como un ecosistema escalable: desde la definición agnóstica de *Design Tokens* hasta librerías de componentes robustas, pensadas para construir paneles administrativos y aplicaciones web de alto rendimiento.

---

## 🏗️ Arquitectura del Monorepo

El proyecto utiliza NPM Workspaces para gestionar múltiples paquetes bajo el scope oficial de la organización `@ncripta`.

```text
forge-ui/
├── packages/
│   ├── tokens/        → @ncripta/forge-tokens      (Design Tokens - JSON SSOT)
│   ├── css/           → @ncripta/forge-css          (Generador automático de CSS Variables)
│   ├── tailwind/      → @ncripta/forge-tailwind     (Preset de Tailwind CSS)
│   ├── variants/      → @ncripta/forge-variants     (Variantes CVA compartidas)
│   ├── react/         → @ncripta/forge-react        (Librería de componentes React)
│   └── vue/           → @ncripta/forge-vue          (Librería de componentes Vue 3)
└── apps/
    ├── admin-starter/     → Starter Kit React       (Implementación de referencia)
    └── admin-starter-vue/ → Starter Kit Vue         (Implementación de referencia)
```

## 🔄 Flujo de Dependencias

`tokens` → `css` → `tailwind` → `variants` → `react` / `vue` → `apps`

## 🚀 Inicio Rápido

```bash
git clone https://github.com/ncripta/forge-ui.git
cd forge-ui
npm install
npm run build:all
cd apps/admin-starter
npm run dev
```

## 🎨 Sistema de Temas

Dos dimensiones independientes y combinables:

- **Color theme** (`data-theme`): `default` (indigo), `emerald`, `rose`, `ocean`.
- **Modo** (`data-mode`): `light`, `dark`.

```html
<html data-mode="dark" data-theme="ocean">
```

## 🛠️ Tecnologías Core

- **TypeScript:** Strict mode en todo el monorepo.
- **Tailwind CSS:** Motor de utilidades (v3.4+).
- **Radix UI:** Primitivas headless para accesibilidad (WAI-ARIA).
- **CVA:** Gestión tipada de variantes de componentes.
- **Vite & Tsup:** Bundlers para apps y librerías.
- **Lucide Icons:** Iconografía coherente.
- **Changesets + Husky:** Versionamiento semántico.

## 📦 Comandos

| Comando | Acción |
|---------|--------|
| `npm run build:tokens` | Compila tipos de tokens |
| `npm run build:css` | Genera CSS variables desde tokens |
| `npm run build:tailwind` | Compila preset de Tailwind |
| `npm run build:variants` | Compila variantes compartidas |
| `npm run build:react` | Compila librería React |
| `npm run build:vue` | Compila librería Vue |
| `npm run build:core` | Pipeline: tokens → css → tailwind → variants |
| `npm run build:all` | Pipeline completo |

## 📄 Licencia

- **Paquetes (`packages/`):** MIT — uso libre.
- **Aplicaciones (`apps/`):** Licencia comercial. Ver `apps/LICENSE`.
