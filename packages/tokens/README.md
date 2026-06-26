# @forge-ui/tokens

El núcleo de diseño de Forge UI. Este paquete contiene el **Single Source of Truth (SSOT)** de todo el sistema visual en formato JSON puro, sin dependencias de frameworks ni código de presentación.

---

## Arquitectura: Sistema de 2 Niveles

Los tokens se dividen en dos capas con responsabilidades distintas:

### 1. Primitivos (`src/base/`)

Valores crudos y absolutos. Representan la paleta completa de recursos disponibles.

- **Nunca se consumen directamente** en componentes.
- Sirven como referencia para los tokens semánticos.

### 2. Semánticos (`src/semantic/`)

La intención de uso. Estos son los tokens que consumen las interfaces.

- Referencian primitivos mediante alias (`{color.base.indigo.500}`).
- Permiten tematización sin modificar código de componentes.

---

## Estructura de Archivos

```text
tokens/
├── src/
│   ├── base/
│   │   ├── colors.json        ← Paletas completas (indigo, slate, emerald, red, amber)
│   │   └── spacing.json       ← Escala de espaciado (sistema 4px)
│   └── semantic/
│       ├── theme-light.json   ← Asignaciones semánticas para modo claro
│       ├── theme-dark.json    ← Asignaciones semánticas para modo oscuro
│       ├── color-themes.json  ← Paletas de color switcheables (indigo, emerald, rose, ocean)
│       ├── typography.json    ← Familias, tamaños, pesos, line-heights
│       ├── radius.json        ← Escala de border-radius
│       ├── shadows.json       ← Sistema de elevaciones
│       └── motion.json        ← Duraciones y curvas de animación
├── src/index.ts               ← Exportador TypeScript con interfaces tipadas
├── tsconfig.json
└── package.json
```

---

## Tokens Disponibles

### Colors (`base/colors.json`)

| Paleta | Escalas |
|--------|---------|
| indigo | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 |
| slate | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 |
| emerald | 50, 100, 400, 500, 600, 700 |
| red | 50, 100, 400, 500, 600, 700 |
| amber | 50, 100, 400, 500, 600, 700 |
| white | valor único |
| black | valor único |

### Spacing (`base/spacing.json`)

Sistema de múltiplos de 4px (18 valores):

```
0 | px | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 14 | 16 | 20 | 24
0px  1px  2px  4px  6px  8px  10px 12px 16px 20px 24px 32px 40px 48px 56px 64px 80px 96px
```

### Temas Semánticos (`semantic/theme-light.json` / `theme-dark.json`)

6 grupos con roles definidos:

| Grupo | Tokens | Propósito |
|-------|--------|-----------|
| `primary` | main, hover, active, subtle, subtleHover | Color de acción principal |
| `success` | main, hover, subtle | Confirmaciones y estados exitosos |
| `danger` | main, hover, subtle | Errores y acciones destructivas |
| `warning` | main, hover, subtle | Alertas y precauciones |
| `surface` | background, raised, overlay, sunken, border, borderHover | Capas y contenedores |
| `text` | main, secondary, muted, disabled, inverse, link | Jerarquía tipográfica |

### Typography (`semantic/typography.json`)

- **Familias:** Inter (sans), Fira Code (mono)
- **Tamaños:** xs (0.75rem) → 4xl (2.25rem)
- **Pesos:** regular (400), medium (500), semibold (600), bold (700)
- **Line-height:** tight (1.25), normal (1.5), relaxed (1.75)
- **Letter-spacing:** tight (-0.025em), normal (0), wide (0.025em)

### Radius (`semantic/radius.json`)

| Token | Valor | Uso |
|-------|-------|-----|
| none | 0px | Elementos sin redondeo |
| sm | 4px | Checkboxes, tags |
| md | 8px | Botones, inputs |
| lg | 12px | Tarjetas, modales |
| xl | 16px | Contenedores destacados |
| 2xl | 20px | Hero sections |
| full | 9999px | Avatares, badges |

### Shadows (`semantic/shadows.json`)

7 niveles de elevación: none, xs, sm, md, lg, xl, inner.

### Motion (`semantic/motion.json`)

- **Duraciones:** instant (50ms), fast (150ms), normal (250ms), slow (400ms), slower (600ms)
- **Easings:** default, in, out, inOut, bounce

---

## Uso

```typescript
import tokens from '@forge-ui/tokens';

// Acceder a un primitivo
tokens.colors.color.base.indigo["500"].value // → "#6366f1"

// Acceder a un semántico
tokens.themeLight.semantic.primary.main.value // → "{color.base.indigo.500}"

// Spacing
tokens.spacing.spacing["4"].value // → "16px"
```

Tipos exportados: `TokenValue`, `BaseColors`, `SemanticTheme`, `TypographyTokens`, `RadiusTokens`, `ShadowTokens`, `MotionTokens`.

> Este paquete es consumido por `@forge-ui/css` para compilar las variables CSS y por `@forge-ui/tailwind` para generar el preset de utilidades.

---

## Reglas de Diseño

1. **Prohibición de valores mágicos:** Si un valor no existe en los tokens, no se puede usar en componentes.
2. **Uso exclusivo de semántica:** Los componentes nunca consumen primitivos directamente. Un botón de error usa `danger.main`, nunca `red.500`.
3. **Contraste WCAG 2.1:** Todo par background/text semántico cumple ratio mínimo de 4.5:1.
4. **Tematización por reasignación:** El modo oscuro no introduce tokens nuevos, reasigna los existentes hacia valores con contraste adecuado en fondos oscuros.
