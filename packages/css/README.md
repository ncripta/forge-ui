# @forge-ui/css

Compilador que transforma los Design Tokens de `@forge-ui/tokens` en variables CSS nativas con prefijo `--forge-`.

---

## Archivos Generados

| Archivo | Selector | Propósito |
|---------|----------|-----------|
| `dist/theme-base.css` | `:root` | Variables para modo claro + spacing, tipografía, radius, shadows, motion |
| `dist/theme-dark.css` | `[data-theme="dark"]` | Override de colores semánticos para modo oscuro |

## Compilación

```bash
# Desde la raíz del monorepo
npm run build:css

# O directamente
npm run build -w packages/css
```

El script `src/build.js` lee los JSON de `@forge-ui/tokens`, resuelve todas las referencias (`{color.base.indigo.500}` → `#6366f1`) y genera CSS plano.

## Convención de Nombres

Los tokens se aplanan siguiendo esta lógica:

```
JSON path                     → CSS variable
semantic.primary.main         → --forge-primary-main
spacing.4                     → --forge-space-4
font.size.lg                  → --forge-font-size-lg
radius.md                     → --forge-radius-md
shadow.lg                     → --forge-shadow-lg
motion.duration.fast          → --forge-motion-duration-fast
```

## Uso en un Proyecto

```css
/* En tu archivo principal de estilos */
@import '@forge-ui/css/dist/theme-base.css';
@import '@forge-ui/css/dist/theme-dark.css';
```

```html
<!-- Cambiar tema es tan simple como cambiar el atributo -->
<html data-theme="light"> <!-- Modo claro (default) -->
<html data-theme="dark">  <!-- Modo oscuro -->
```

## Uso Directo (Sin Tailwind)

```css
.my-button {
  background-color: var(--forge-primary-main);
  border-radius: var(--forge-radius-md);
  padding: var(--forge-space-2) var(--forge-space-4);
  font-size: var(--forge-font-size-sm);
  transition: background-color var(--forge-motion-duration-fast) var(--forge-motion-easing-default);
}
.my-button:hover {
  background-color: var(--forge-primary-hover);
}
```

> Para utilizar con Tailwind CSS, instala `@forge-ui/tailwind` que mapea estas variables a clases de utilidad.
