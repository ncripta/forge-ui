# @forge-ui/vue

Librería de componentes Vue 3 para Forge UI. Componentes presentacionales, accesibles y tematizados, construidos sobre los Design Tokens compartidos del sistema.

---

## Stack Técnico

| Herramienta | Rol |
|-------------|-----|
| Radix Vue | Motor headless (accesibilidad, WAI-ARIA) |
| CVA (vía `@forge-ui/variants`) | Variantes compartidas con React |
| tailwind-merge + clsx | Fusión de clases |
| @lucide/vue | Iconografía (1400+ iconos SVG) |
| tsup + unplugin-vue | Bundler (CJS + ESM) |
| vue-tsc | Type checking + declarations |

## Instalación

```bash
npm install @forge-ui/vue @forge-ui/css @forge-ui/tailwind
```

## Configuración

```css
/* main.css */
@import '@forge-ui/css/dist/theme-base.css';
@import '@forge-ui/css/dist/theme-dark.css';
@import '@forge-ui/css/dist/color-themes.css';
```

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@forge-ui/tailwind')],
  content: [
    './src/**/*.{vue,ts}',
    './node_modules/@forge-ui/vue/dist/**/*.{js,mjs}',
    './node_modules/@forge-ui/variants/dist/**/*.{js,mjs}',
  ],
}
```

---

## Componentes Disponibles

| Componente | Props Clave | Descripción |
|------------|-------------|-------------|
| `Button` | `intent`, `size`, `loading` | Botón con 5 intents y 4 tamaños |
| `Badge` | `intent`, `variant` | Etiquetas solid/outline/subtle |
| `Avatar` | `src`, `fallback`, `size` | Imagen con fallback a iniciales |
| `Input` | `size`, `error`, `v-model` | Input con two-way binding |
| `Label` | `required` | Label accesible |
| `Card` | — | Compuesto: Header, Title, Content, Footer |
| `Separator` | `orientation` | Divider horizontal/vertical |
| `Spinner` | `size` | Indicador de carga |
| `Skeleton` | — | Placeholder animado |
| `Icon` | `name`, `size`, `strokeWidth` | Wrapper sobre @lucide/vue |

---

## Contrato de API Único

Las props son **idénticas** a `@forge-ui/react`:

```vue
<!-- Vue -->
<Button intent="danger" size="lg" :loading="true">Eliminar</Button>
<Badge intent="success" variant="outline">Activo</Badge>
<Avatar size="xl" fallback="AG" />
```

```tsx
// React (idéntico)
<Button intent="danger" size="lg" loading>Eliminar</Button>
<Badge intent="success" variant="outline">Activo</Badge>
<Avatar size="xl" fallback="AG" />
```

## Uso

```vue
<script setup>
import { Button, Card, CardHeader, CardTitle, CardContent, Input, Label } from '@forge-ui/vue';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Crear usuario</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <div>
        <Label required>Email</Label>
        <Input type="email" placeholder="usuario@ejemplo.com" />
      </div>
      <Button intent="primary">Guardar</Button>
    </CardContent>
  </Card>
</template>
```

---

## Build

```bash
npm run build:vue      # Solo este paquete
npm run build:all      # Pipeline completo
```

Output: `dist/index.js` (CJS) + `dist/index.mjs` (ESM) + types via vue-tsc
