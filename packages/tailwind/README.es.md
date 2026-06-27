# @forge-ui/tailwind

Preset de Tailwind CSS que conecta las utilidades de Tailwind directamente con las CSS variables de Forge UI.

---

## Instalación

```bash
npm install @forge-ui/css @forge-ui/tailwind
```

## Configuración

### 1. Importar los estilos base

```css
@import '@forge-ui/css/dist/theme-base.css';
@import '@forge-ui/css/dist/theme-dark.css';
@import '@forge-ui/css/dist/color-themes.css';
```

### 2. Añadir el preset a Tailwind

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@forge-ui/tailwind')],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
}
```

---

## Utilidades Disponibles

### Colores — Escalas Numéricas (theme-aware)

Estas escalas cambian automáticamente con `data-theme` y se invierten con `data-mode="dark"`:

```html
<!-- Primary scale -->
<div class="bg-primary-600 text-primary-50">Botón sólido</div>
<div class="bg-primary-50 text-primary-700">Badge activo</div>
<div class="bg-primary-100 text-primary-600">Fondo sutil</div>

<!-- Surface scale -->
<div class="bg-surface-50 text-surface-900">Fondo principal</div>
<div class="bg-surface-100 border-surface-200">Card</div>
<span class="text-surface-500">Texto muted</span>
```

Escalas: `primary-50/100/400/500/600/700` | `surface-50/100/200/300/400/500/600/800/900`

### Colores — Semánticos

```html
<div class="bg-primary-main text-text-inverse">Acción principal</div>
<div class="bg-danger-subtle text-danger-main">Error</div>
<div class="bg-success-main">Éxito</div>
```

Grupos: `primary`, `success`, `danger`, `warning`, `surface`, `text`

### Spacing

```html
<div class="p-4 m-2 gap-6"><!-- 16px, 8px, 24px --></div>
```

Escala: 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24

### Tipografía

```html
<h1 class="font-sans text-2xl font-bold leading-tight">Título</h1>
<code class="font-mono text-sm">código</code>
```

### Border Radius

```html
<button class="rounded-md">Botón (8px)</button>
<div class="rounded-lg">Card (12px)</div>
<img class="rounded-full" />
```

### Sombras

```html
<div class="shadow-xs">Mínima</div>
<div class="shadow-md">Media</div>
<div class="shadow-xl">Prominente</div>
```

### Transiciones

```html
<button class="transition-colors duration-fast ease-default hover:bg-primary-700">
  Animado
</button>
```

Duraciones: `instant`, `fast`, `normal`, `slow`, `slower`
Easings: `default`, `in`, `out`, `in-out`, `bounce`

---

## Tematización

### Color themes

Las clases se mantienen idénticas — las variables CSS subyacentes cambian:

```javascript
// Cambiar paleta de color
document.documentElement.setAttribute('data-theme', 'emerald');
```

`bg-primary-600` será `#4f46e5` (indigo) o `#059669` (emerald) según el tema activo.

### Dark mode

```javascript
document.documentElement.setAttribute('data-mode', 'dark');
```

Las escalas se invierten: `bg-surface-50` pasa de claro a oscuro automáticamente.

### Combinación

```html
<html data-mode="dark" data-theme="ocean">
```

Ambos son independientes y combinables.
