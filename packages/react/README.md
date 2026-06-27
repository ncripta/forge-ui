# @ncripta/forge-react

React component library for Forge UI. 40+ presentational, accessible and themed components built on top of the shared Design Token system.

## Stack

Radix UI (headless a11y) • CVA via `@ncripta/forge-variants` • tailwind-merge • Lucide Icons • Recharts • cmdk • Sonner • TanStack Table • tsup + TypeScript

## Installation

```bash
npm install @ncripta/forge-react @ncripta/forge-css @ncripta/forge-tailwind
```

## Setup

```css
@import '@ncripta/forge-css/dist/theme-base.css';
@import '@ncripta/forge-css/dist/theme-dark.css';
@import '@ncripta/forge-css/dist/color-themes.css';
```

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@ncripta/forge-tailwind')],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@ncripta/forge-react/dist/**/*.{js,mjs}',
    './node_modules/@ncripta/forge-variants/dist/**/*.{js,mjs}',
  ],
}
```

## Components (40+)

| Category | Components |
|----------|-----------|
| Atomic | Button, Badge, Avatar, AvatarGroup, Separator, Icon |
| Forms | Label, Input, Textarea, Checkbox, Switch, RadioGroup, Select, Combobox, Slider, InputOTP, Dropzone, DatePicker |
| Navigation | Tabs, Breadcrumbs, Pagination, Stepper, Command Palette |
| Data Display | Card, DataTable, Accordion, ScrollArea, Tree, Calendar, Progress |
| Overlays | Dialog, Sheet, Popover, Tooltip, DropdownMenu, ContextMenu |
| Feedback | Spinner, Skeleton, Toaster/toast, Alert |
| Specialized | BarChart, LineChart, DonutChart, ChatBubble, CodeBlock |

## Usage

```tsx
import { Button, Card, CardContent, Input, Label } from '@ncripta/forge-react';

<Card>
  <CardContent className="space-y-4">
    <Label required>Email</Label>
    <Input type="email" placeholder="user@example.com" />
    <Button intent="primary">Save</Button>
  </CardContent>
</Card>
```

## Unified API Contract

Props are identical across React and Vue:

```tsx
<Button intent="danger" size="lg" loading />
<Badge intent="success" variant="outline">Active</Badge>
```

## License

MIT
