# @ncripta/forge-css

Compiler that transforms Design Tokens from `@ncripta/forge-tokens` into native CSS variables with `--forge-` prefix.

## Generated Files

| File | Selector | Purpose |
|------|----------|---------|
| `dist/theme-base.css` | `:root` | Default color theme (indigo) + spacing, typography, radius, shadows, motion |
| `dist/theme-dark.css` | `[data-mode="dark"]` | Scale inversion for dark mode |
| `dist/color-themes.css` | `[data-theme="X"]` | Alternative palettes (emerald, rose, ocean) + dark variants |

## Theming

```html
<html data-theme="emerald">           <!-- Color palette -->
<html data-mode="dark">               <!-- Dark mode -->
<html data-mode="dark" data-theme="rose">  <!-- Combined -->
```

## Usage

```css
@import '@ncripta/forge-css/dist/theme-base.css';
@import '@ncripta/forge-css/dist/theme-dark.css';
@import '@ncripta/forge-css/dist/color-themes.css';
```

## Build

```bash
npm run build:css
```

## License

MIT
