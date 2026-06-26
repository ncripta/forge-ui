# @forge-ui/react

Librería de componentes React para Forge UI. 40+ componentes presentacionales, accesibles y tematizados, construidos sobre los Design Tokens del sistema.

---

## Stack Técnico

| Herramienta | Rol |
|-------------|-----|
| Radix UI | Motor headless (accesibilidad, focus management, WAI-ARIA) |
| CVA (class-variance-authority) | Mapeo de variantes (vía `@forge-ui/variants`) |
| tailwind-merge + clsx | Fusión de clases sin conflictos |
| Lucide React | Iconografía (1400+ iconos SVG) |
| Recharts | Gráficos (BarChart, LineChart, DonutChart) |
| cmdk | Command Palette |
| Sonner | Toast notifications |
| TanStack Table | DataTable avanzada |
| tsup | Bundler (CJS + ESM) |
| TypeScript | Tipado estricto |

## Instalación

```bash
npm install @forge-ui/react @forge-ui/css @forge-ui/tailwind
```

## Configuración

```css
/* globals.css */
@import '@forge-ui/css/dist/theme-base.css';
@import '@forge-ui/css/dist/theme-dark.css';
@import '@forge-ui/css/dist/color-themes.css';
```

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@forge-ui/tailwind')],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@forge-ui/react/dist/**/*.{js,mjs}',
    './node_modules/@forge-ui/variants/dist/**/*.{js,mjs}',
  ],
}
```

---

## Componentes (Inventario Completo)

### Atómicos

| Componente | Descripción |
|------------|-------------|
| `Button` | 5 intents (primary, secondary, ghost, danger, link), 4 sizes, loading state, asChild |
| `Badge` | Intents + variantes (subtle, solid, outline), compound variants |
| `Avatar` | Imagen con fallback a iniciales, 4 tamaños |
| `AvatarGroup` | Stack de avatares superpuestos con overflow counter |
| `Separator` | Divider horizontal/vertical |
| `Icon` | Wrapper sobre Lucide con 1400+ iconos tipados |

### Formularios

| Componente | Descripción |
|------------|-------------|
| `Label` | Accesible, indicador de requerido |
| `Input` | Tamaños (sm/md/lg), estado error |
| `Textarea` | Área de texto con error state |
| `Checkbox` | Con soporte indeterminate |
| `Switch` | Toggle con 3 tamaños |
| `RadioGroup` + `RadioGroupItem` | Selector de opción única (Radix) |
| `Select` | Dropdown estilizado completo (Trigger, Content, Item, Label, Separator) |
| `Combobox` | Select con buscador integrado (cmdk + Popover) |
| `Slider` | Selector numérico de arrastre (Radix) |
| `InputOTP` | Campos separados para códigos de verificación |
| `Dropzone` | Drag & drop de archivos con estados visuales |
| `DatePicker` | Popover + Calendar |

### Navegación

| Componente | Descripción |
|------------|-------------|
| `Tabs` | TabsList + TabsTrigger + TabsContent (Radix) |
| `Breadcrumbs` | Ruta con separador configurable |
| `Pagination` | Numérica con ellipsis y prev/next |
| `Stepper` | Flujo de pasos (active/completed/pending) |
| `Command` (Palette) | Buscador global Cmd+K (cmdk) |

### Data Display

| Componente | Descripción |
|------------|-------------|
| `Card` | Compuesto: Header, Title, Description, Content, Footer |
| `DataTable` | TanStack Table con sorting, selection, pagination |
| `Table` | Primitivas: Header, Body, Row, Head, Cell |
| `Accordion` | Secciones expandibles (Radix) |
| `ScrollArea` | Scrollbars estilizados (Radix) |
| `Tree` | Navegación jerárquica recursiva |
| `Calendar` | Panel del mes con selección de fecha |
| `Progress` | Barra horizontal con valor y color configurable |

### Overlays / Feedback

| Componente | Descripción |
|------------|-------------|
| `Dialog` | Modal centrado con overlay (Radix) |
| `Sheet` | Panel lateral deslizable, 4 posiciones |
| `Popover` | Caja flotante posicionada (Radix) |
| `Tooltip` | Texto explicativo al hover (Radix) |
| `DropdownMenu` | Menú de acciones con submenús (Radix) |
| `ContextMenu` | Menú de clic derecho (Radix) |
| `Toaster` + `toast` | Notificaciones efímeras (Sonner) |
| `Alert` | Callout estático con intents |
| `Spinner` | Indicador circular con tamaños |
| `Skeleton` | Placeholder animado de carga |

### Especializados

| Componente | Descripción |
|------------|-------------|
| `BarChart` | Wrapper Recharts con tokens semánticos |
| `LineChart` | Múltiples líneas configurables |
| `DonutChart` | Gráfico circular con paleta automática |
| `ChatBubble` + `ChatTyping` | Interfaz conversacional (user/assistant/system) |
| `CodeBlock` | Código con line numbers y botón copiar |

---

## API de Variantes

Las variantes visuales se comparten vía `@forge-ui/variants`:

```tsx
<Button intent="primary" size="lg" loading />
<Badge intent="success" variant="outline">Activo</Badge>
<Avatar size="xl" fallback="AG" />
<Alert intent="danger">Error crítico</Alert>
```

## Utilidad `cn()`

```tsx
import { cn } from '@forge-ui/react';
cn('px-4 py-2', isActive && 'bg-primary-50', className);
```

---

## Build

```bash
npm run build:react      # Solo este paquete
npm run build:all        # Pipeline completo (tokens → css → tailwind → variants → react)
```

Output: `dist/index.js` (CJS) + `dist/index.mjs` (ESM) + `dist/*.d.ts` (Types)
