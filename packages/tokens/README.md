# @ncripta/forge-tokens

The design core of Forge UI. This package contains the **Single Source of Truth (SSOT)** for the entire visual system in pure JSON format, with no framework dependencies.

## Architecture: 2-Level System

- **Primitives (`src/base/`):** Raw values (color palettes, spacing scale). Never consumed directly by components.
- **Semantics (`src/semantic/`):** Usage intent. These are consumed by interfaces via aliases.

## Structure

```text
tokens/src/
├── base/
│   ├── colors.json
│   └── spacing.json
└── semantic/
    ├── theme-light.json
    ├── theme-dark.json
    ├── color-themes.json    ← Multi-palette (indigo, emerald, rose, ocean)
    ├── typography.json
    ├── radius.json
    ├── shadows.json
    └── motion.json
```

## Usage

```typescript
import tokens from '@ncripta/forge-tokens';

tokens.colors.color.base.indigo["500"].value // → "#6366f1"
tokens.spacing.spacing["4"].value            // → "16px"
```

## Design Rules

1. No magic values — if it doesn't exist in tokens, it can't be used.
2. Components consume semantics only, never primitives directly.
3. WCAG 2.1 contrast compliance on all background/text pairs.
4. Dark mode reassigns existing tokens, doesn't introduce new ones.

## License

MIT
