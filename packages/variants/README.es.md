# @forge-ui/variants

Definiciones compartidas de variantes CVA (Class Variance Authority) para todas las implementaciones de componentes de Forge UI.

---

## Propósito

Este paquete es el **puente entre los tokens de diseño y los componentes de cualquier framework**. Contiene las strings de clases Tailwind organizadas por variantes, sin ningún código de renderizado.

```
@forge-ui/tokens → @forge-ui/css → @forge-ui/tailwind
                                           ↓
                                  @forge-ui/variants  ← ESTE PAQUETE
                                     ↙         ↘
                            @forge-ui/react   @forge-ui/vue (futuro)
```

## Variantes Disponibles

| Export | Componente | Variantes |
|--------|-----------|-----------|
| `buttonVariants` | Button | intent (primary, secondary, ghost, danger, link), size (sm, md, lg, icon) |
| `badgeVariants` | Badge | intent (default, primary, success, danger, warning), variant (subtle, solid, outline) |
| `avatarVariants` | Avatar | size (sm, md, lg, xl) |
| `inputVariants` | Input | size (sm, md, lg), error (true, false) |
| `alertVariants` | Alert | intent (default, info, success, danger, warning) |
| `spinnerVariants` | Spinner | size (sm, md, lg, xl) |
| `sheetContentVariants` | Sheet | side (top, bottom, left, right) |
| `chatBubbleVariants` | ChatBubble | role (user, assistant, system) |

## Uso en un Framework

```typescript
// React
import { buttonVariants } from '@forge-ui/variants';
import { cn } from './utils/cn';

const Button = ({ intent, size, className, ...props }) => (
  <button className={cn(buttonVariants({ intent, size, className }))} {...props} />
);

// Vue
import { buttonVariants } from '@forge-ui/variants';

const classes = computed(() => buttonVariants({ intent: props.intent, size: props.size }));
```

## Regla

Si necesitas añadir una variante visual a un componente, se define **aquí** — nunca directamente en `@forge-ui/react` o `@forge-ui/vue`. Esto garantiza que cambiar un estilo se propague a todos los frameworks simultáneamente.
