# @forge-ui/css

Compilador que transforma los Design Tokens de `@forge-ui/tokens` en variables CSS nativas con prefijo `--forge-`.

---

## Archivos Generados

| Archivo | Selector | Propósito |
|---------|----------|-----------|
| `dist/theme-base.css` | `:root` | Color theme default (indigo) + spacing, tipografía, radius, shadows, motion |
| `dist/theme-dark.css` | `[data-mode="dark"]` | Inversión de escalas para modo oscuro |
| `dist/color-themes.css` | `[data-theme="X"]` | Paletas alternativas (emerald, rose, ocean) + sus variantes dark |

## Compilación

```bash
npm run build:css
```

El script `src/build.ts` lee los JSON de `@forge-ui/tokens`, resuelve todas las referencias y genera CSS plano.

## Sistema de Temas

### Color Themes (paletas)

```html
<html data-theme="emerald">  <!-- Paleta verde -->
<html data-theme="rose">     <!-- Paleta rosa -->
<html data-theme="ocean">    <!-- Paleta azul cielo -->
<!-- Sin atributo = Indigo (default) -->
```

Temas disponibles: **Indigo** (default), **Emerald**, **Rose**, **Ocean**.

### Dark Mode

```html
<html data-mode="dark">  <!-- Modo oscuro -->
<html data-mode="light"> <!-- Modo claro (default) -->
```

### Combinación

Ambos sistemas son independientes y combinables:

```html
<html data-mode="dark" data-theme="rose">
<!-- Modo oscuro + paleta rose -->
```

El compilador genera selectores compuestos `[data-mode="dark"][data-theme="emerald"]` que invierten las escalas correctamente para cada paleta.

## Convención de Nombres

```
JSON path                     → CSS variable
semantic.primary.main         → --forge-primary-main
color-themes.emerald.primary-600 → --forge-primary-600
spacing.4                     → --forge-space-4
font.size.lg                  → --forge-font-size-lg
radius.md                     → --forge-radius-md
shadow.lg                     → --forge-shadow-lg
motion.duration.fast          → --forge-motion-duration-fast
```

## Uso

```css
@import '@forge-ui/css/dist/theme-base.css';
@import '@forge-ui/css/dist/theme-dark.css';
@import '@forge-ui/css/dist/color-themes.css';
```

## Uso Directo (Sin Tailwind)

```css
.my-button {
  background-color: var(--forge-primary-600);
  color: var(--forge-primary-50);
  border-radius: var(--forge-radius-md);
  padding: var(--forge-space-2) var(--forge-space-4);
  transition: background-color var(--forge-motion-duration-fast) var(--forge-motion-easing-default);
}
.my-button:hover {
  background-color: var(--forge-primary-700);
}
```
