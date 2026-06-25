# @forge-ui/react

Librería de componentes React para Forge UI. Componentes presentacionales, accesibles y tematizados, construidos sobre los Design Tokens del sistema.

---

## Stack Técnico

| Herramienta | Rol |
|-------------|-----|
| Radix UI | Motor headless (accesibilidad, focus management, WAI-ARIA) |
| CVA (class-variance-authority) | Mapeo de variantes a clases Tailwind |
| tailwind-merge + clsx | Fusión de clases sin conflictos |
| tsup | Bundler (CJS + ESM) |
| TypeScript | Tipado estricto en todos los componentes |

## Instalación

```bash
npm install @forge-ui/react @forge-ui/css @forge-ui/tailwind
```

## Configuración Previa

```css
/* globals.css */
@import '@forge-ui/css/dist/theme-base.css';
@import '@forge-ui/css/dist/theme-dark.css';
```

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@forge-ui/tailwind')],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@forge-ui/react/dist/**/*.{js,mjs}',
  ],
}
```

---

## Componentes Disponibles

### Atómicos

| Componente | Props Clave | Descripción |
|------------|-------------|-------------|
| `Button` | `intent`, `size`, `loading`, `asChild` | Botón con 5 intents y 4 tamaños |
| `Badge` | `intent`, `variant` | Etiquetas con estilos solid/outline/subtle |
| `Avatar` | `src`, `alt`, `fallback`, `size` | Imagen de perfil con fallback a iniciales |
| `Separator` | `orientation` | Divider horizontal/vertical |

### Formularios

| Componente | Props Clave | Descripción |
|------------|-------------|-------------|
| `Label` | `required` | Label accesible con indicador de requerido |
| `Input` | `size`, `error` | Input con variantes de tamaño y estado error |
| `Textarea` | `error` | Área de texto con estado error |
| `Checkbox` | `indeterminate` | Checkbox con soporte indeterminate |
| `Switch` | `checked`, `onCheckedChange`, `size` | Toggle interruptor |

### Data Display

| Componente | Props Clave | Descripción |
|------------|-------------|-------------|
| `Card` | — | Contenedor con Header, Title, Description, Content, Footer |

### Feedback

| Componente | Props Clave | Descripción |
|------------|-------------|-------------|
| `Spinner` | `size` | Indicador de carga circular animado |
| `Skeleton` | — | Placeholder animado para estados de carga |

---

## API de Variantes (Contrato Único)

Todos los componentes siguen la misma convención de props:

```tsx
// Intent: define el propósito semántico
<Button intent="primary" />   // Acción principal
<Button intent="danger" />    // Acción destructiva
<Button intent="ghost" />     // Acción sutil
<Button intent="secondary" /> // Acción secundaria
<Button intent="link" />      // Enlace

// Size: define la escala
<Button size="sm" />  // Compacto
<Button size="md" />  // Default
<Button size="lg" />  // Prominente
<Button size="icon" /> // Cuadrado para iconos
```

## Uso

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Input, Label } from '@forge-ui/react';

function MyForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear usuario</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" type="email" placeholder="usuario@ejemplo.com" />
        </div>
        <Button intent="primary" loading={false}>
          Guardar
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Utilidad `cn()`

Exportada para uso externo. Combina clsx + tailwind-merge:

```tsx
import { cn } from '@forge-ui/react';

cn('px-4 py-2', condition && 'bg-primary-main', className);
```

---

## Componentes Pendientes (Roadmap)

### Navegación
- Breadcrumbs, Tabs, Pagination, Stepper, Command Palette

### Overlays / Feedback
- Dialog, Sheet/Drawer, Popover, Tooltip, DropdownMenu, ContextMenu, Toast, Alert

### Data Display
- Table, DataTable (TanStack), Accordion, ScrollArea, Tree, Calendar, DatePicker

### Especializados
- Chart Wrappers (Recharts), ChatBubble, PromptInput, CodeBlock

---

## Build

```bash
# Desde la raíz del monorepo
npm run build:react

# Pipeline completo
npm run build:all
```

Genera: `dist/index.js` (CJS) + `dist/index.mjs` (ESM) + `dist/index.d.ts` (Types)
