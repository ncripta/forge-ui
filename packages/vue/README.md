# @ncripta/forge-vue

Vue 3 component library for Forge UI. 40+ presentational, accessible and themed components sharing the same Design Token system and API contract as the React counterpart.

## Stack

Radix Vue (headless a11y) • CVA via `@ncripta/forge-variants` • tailwind-merge • @lucide/vue • vue-chartjs • vue-sonner • TanStack Vue Table • tsup + vue-tsc

## Installation

```bash
npm install @ncripta/forge-vue @ncripta/forge-css @ncripta/forge-tailwind
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
    './src/**/*.{vue,ts}',
    './node_modules/@ncripta/forge-vue/dist/**/*.{js,mjs}',
    './node_modules/@ncripta/forge-variants/dist/**/*.{js,mjs}',
  ],
}
```

## Components (40+)

| Category | Components |
|----------|-----------|
| Atomic | Button, Badge, Avatar, AvatarGroup, Separator, Icon |
| Forms | Label, Input, Textarea, Checkbox, Switch, RadioGroup, Select, Combobox, Slider, InputOTP, Dropzone, DatePicker |
| Navigation | Tabs, Breadcrumbs, Pagination, Stepper, Command |
| Data Display | Card, DataTable, Accordion, ScrollArea, Tree, Calendar, Progress |
| Overlays | Dialog, Sheet, Popover, Tooltip, DropdownMenu, ContextMenu |
| Feedback | Spinner, Skeleton, Toaster/toast, Alert |
| Specialized | BarChart, LineChart, DonutChart, ChatBubble, CodeBlock |

## Usage

```vue
<script setup>
import { Button, Card, CardContent, Input, Label } from '@ncripta/forge-vue';
</script>

<template>
  <Card>
    <CardContent class="space-y-4">
      <Label required>Email</Label>
      <Input type="email" placeholder="user@example.com" />
      <Button intent="primary">Save</Button>
    </CardContent>
  </Card>
</template>
```

## Unified API Contract

Props are identical to `@ncripta/forge-react`:

```vue
<Button intent="danger" size="lg" :loading="true" />
<Badge intent="success" variant="outline">Active</Badge>
```

## License

MIT
