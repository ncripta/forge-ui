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
/* src/styles/globals.css o main.tsx */
@import '@forge-ui/css/dist/theme-base.css';
@import '@forge-ui/css/dist/theme-dark.css';
```

### 2. Añadir el preset a Tailwind

```javascript
// tailwind.config.js
module.exports = {
  presets: [
    require('@forge-ui/tailwind')
  ],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
}
```

## Utilidades Disponibles

### Colores

```html
<!-- Colores semánticos -->
<div class="bg-primary-main text-text-inverse">Botón</div>
<div class="bg-surface-raised border border-surface-border">Card</div>
<div class="text-danger-main">Error</div>
<div class="bg-success-subtle text-success-main">Badge éxito</div>
```

Grupos: `primary`, `success`, `danger`, `warning`, `surface`, `text`

### Spacing

```html
<div class="p-4 m-2 gap-6"><!-- 16px, 8px, 24px --></div>
```

### Tipografía

```html
<h1 class="font-sans text-2xl font-bold leading-tight">Título</h1>
<code class="font-mono text-sm">código</code>
```

### Border Radius

```html
<button class="rounded-md">Botón</button>
<div class="rounded-lg">Card</div>
<img class="rounded-full" />
```

### Sombras

```html
<div class="shadow-sm">Sutil</div>
<div class="shadow-lg">Elevado</div>
```

### Transiciones

```html
<button class="transition-colors duration-fast ease-default hover:bg-primary-hover">
  Animado
</button>
```

## Tematización

El cambio de tema es automático. Las clases de Tailwind permanecen iguales — las CSS variables subyacentes cambian al toggle de `data-theme`:

```javascript
// Activar modo oscuro
document.documentElement.setAttribute('data-theme', 'dark');

// Volver a modo claro
document.documentElement.setAttribute('data-theme', 'light');
```

> `bg-surface-background` será `#ffffff` en light y `#020617` en dark, sin cambiar una sola clase.
