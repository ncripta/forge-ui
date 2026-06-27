# @ncripta/forge-variants

Shared CVA (Class Variance Authority) variant definitions for all Forge UI component libraries.

## Purpose

This package bridges design tokens and components across any framework. It contains Tailwind class strings organized by variants, with zero rendering code.

```
@ncripta/forge-tokens → forge-css → forge-tailwind
                                          ↓
                                 forge-variants  ← THIS PACKAGE
                                    ↙        ↘
                           forge-react      forge-vue
```

## Available Variants

| Export | Component | Variants |
|--------|-----------|----------|
| `buttonVariants` | Button | intent (primary, secondary, ghost, danger, link), size (sm, md, lg, icon) |
| `badgeVariants` | Badge | intent (default, primary, success, danger, warning), variant (subtle, solid, outline) |
| `avatarVariants` | Avatar | size (sm, md, lg, xl) |
| `inputVariants` | Input | size (sm, md, lg), error (true, false) |
| `alertVariants` | Alert | intent (default, info, success, danger, warning) |
| `spinnerVariants` | Spinner | size (sm, md, lg, xl) |
| `sheetContentVariants` | Sheet | side (top, bottom, left, right) |
| `chatBubbleVariants` | ChatBubble | role (user, assistant, system) |

## Usage

```typescript
import { buttonVariants } from '@ncripta/forge-variants';

// React
<button className={buttonVariants({ intent: 'primary', size: 'lg' })} />

// Vue
const classes = computed(() => buttonVariants({ intent: props.intent }));
```

## Rule

Visual variants are defined here — never in framework-specific packages. This ensures a single change propagates to all frameworks simultaneously.

## License

MIT
