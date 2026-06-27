# @forge-ui/vue

## 0.4.1

### Patch Changes

- docs: add bilingual README (English + Spanish) to all packages and apps
- Updated dependencies
  - @ncripta/forge-tailwind@0.4.1
  - @ncripta/forge-variants@0.4.1

## 0.4.0

### Minor Changes

- v0.4.0 - Migrate to @ncripta scope, open source licensing and npm publish configuration.

  - All packages renamed from @forge-ui/_ to @ncripta/forge-_ scope
  - License changed to MIT for all packages (open source)
  - Added publishConfig with public access for npm publishing
  - Added repository metadata to all package.json files
  - Dual-license structure: MIT for packages/, commercial for apps/
  - README rewritten for developer audience (open core model)
  - Badge padding improved for better readability
  - Removed deprecated baseUrl from tsconfig

### Patch Changes

- Updated dependencies
  - @ncripta/forge-tailwind@0.4.0
  - @ncripta/forge-variants@0.4.0

## 0.3.0

### Minor Changes

- v0.3.0 - Vue ecosystem, multi-theme system and starter kits.

  - @forge-ui/vue: New package - 40 Vue 3 components with full parity to React (Radix Vue, vue-chartjs, vue-sonner)
  - @forge-ui/variants: Migrated buttonVariants and badgeVariants to numeric scale classes for proper theme/dark mode support
  - @forge-ui/react: Added Icon (Lucide wrapper) and Progress components
  - @forge-ui/css: Added color-themes.css with 4 palettes (indigo, emerald, rose, ocean) and compound dark selectors
  - @forge-ui/tailwind: Added primary and surface numeric scales (50-900) to preset
  - @forge-ui/tokens: Added color-themes.json with multi-palette definitions
  - admin-starter (React): Dashboard redesign, Projects CRUD, Notifications panel, Analytics page
  - admin-starter-vue: Full Vue 3 starter kit with Dashboard, Users, Projects, Settings and Notifications

### Patch Changes

- Updated dependencies
  - @forge-ui/tailwind@0.3.0
  - @forge-ui/variants@0.3.0
