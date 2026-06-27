# Forge UI

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

La arquitectura sigue un flujo estricto y unidireccional para garantizar el desacoplamiento:

`tokens` → `css` → `tailwind` → `variants` → `react` / `vue` → `apps`

## 🚀 Quick Start

```bash
# 1. Clonar el repositorio
git clone https://github.com/ncripta/forge-ui.git
cd forge-ui

# 2. Instalar dependencias en todo el monorepo
npm install

# 3. Compilar el pipeline completo del sistema de diseño
npm run build:all

# 4. Levantar el servidor de desarrollo del Starter Kit
cd apps/admin-starter
npm run dev
```

## 🎨 Sistema de Temas

Forge UI soporta múltiples temas y modos de color listos para usarse de forma nativa mediante atributos de datos en el HTML. Son dos dimensiones independientes y combinables:

- **Color theme** (`data-theme`): `default` (indigo), `emerald`, `rose`, `ocean`.
- **Modo** (`data-mode`): `light`, `dark`.

```html
<!-- Ejemplo: Modo oscuro con el tema Ocean -->
<html data-mode="dark" data-theme="ocean">
```

## 🛠️ Tecnologías Core

- **TypeScript:** Strict mode obligatorio en todo el monorepo.
- **Tailwind CSS:** Motor de utilidades (v3.4+).
- **Radix UI:** Primitivas *headless* para accesibilidad impecable (WAI-ARIA).
- **CVA (Class Variance Authority):** Gestión tipada de variantes de componentes.
- **Vite & Tsup:** Bundlers ultra rápidos para aplicaciones y librerías respectivamente.
- **Lucide Icons:** Iconografía limpia y coherente.
- **Changesets + Husky:** Versionamiento semántico y control estricto de commits.

## 📦 Comandos Disponibles

Ejecutables desde la raíz del monorepo:

| Comando | Acción |
|---------|--------|
| `npm run build:tokens` | Compila tipos de tokens (tsc) |
| `npm run build:css` | Genera las CSS variables globales desde el JSON de tokens |
| `npm run build:tailwind` | Compila el preset de Tailwind (tsc) |
| `npm run build:variants` | Compila las variantes compartidas (tsup + tsc) |
| `npm run build:react` | Compila la librería de componentes React (tsup + tsc) |
| `npm run build:vue` | Compila la librería de componentes Vue (tsup + vue-tsc) |
| `npm run build:core` | Pipeline base: `tokens` → `css` → `tailwind` → `variants` |
| `npm run build:all` | Pipeline completo incluyendo `react` y `vue` |

### Versionamiento

Usamos [Changesets](https://github.com/changesets/changesets) y Conventional Commits para automatizar el versionado semántico:

```bash
npx changeset            # 1. Declarar qué paquetes cambiaron
npx changeset version    # 2. Actualizar versiones y generar CHANGELOGs
npx changeset publish    # 3. Publicar paquetes a npm
```

## 📄 Licencia y Uso

- **Core & Paquetes (`packages/`):** Todo el código fuente de los paquetes publicados bajo el scope `@ncripta` es de uso libre bajo licencia MIT. Ver `packages/LICENSE`.
- **Aplicaciones (`apps/`):** Las aplicaciones y starter kits incluidos en este repositorio son demos funcionales. Consulta `apps/LICENSE` respecto a las restricciones de uso en entornos de producción comerciales.
