# @ncripta/forge-tailwind

Tailwind CSS preset that connects Tailwind utilities directly to Forge UI CSS variables.

## Installation

```bash
npm install @ncripta/forge-css @ncripta/forge-tailwind
```

## Setup

```css
/* globals.css */
@import '@ncripta/forge-css/dist/theme-base.css';
@import '@ncripta/forge-css/dist/theme-dark.css';
@import '@ncripta/forge-css/dist/color-themes.css';
```

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@ncripta/forge-tailwind')],
  content: ['./src/**/*.{js,ts,jsx,tsx,vue}'],
}
```

## Available Utilities

### Colors (theme-aware numeric scales)

```html
<div class="bg-primary-600 text-primary-50">Solid button</div>
<div class="bg-surface-50 text-surface-900 border-surface-200">Card</div>
```

Scales: `primary-50/100/400/500/600/700` | `surface-50/100/200/300/400/500/600/800/900`

### Spacing, Typography, Radius, Shadows, Transitions

All mapped to `var(--forge-*)` variables that respond to theme and mode changes automatically.

## License

MIT
