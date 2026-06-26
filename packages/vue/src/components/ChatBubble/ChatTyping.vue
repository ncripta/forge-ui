<script setup lang="ts">
import { cn } from '../../utils/cn';
interface Props { class?: string }
const props = defineProps<Props>();
</script>

<template>
  <div :class="cn('flex items-center gap-1 max-w-[80%] bg-surface-sunken rounded-lg px-4 py-3 mr-auto rounded-bl-sm', props.class)">
    <span class="h-2 w-2 rounded-full bg-text-muted animate-bounce [animation-delay:-0.3s]" />
    <span class="h-2 w-2 rounded-full bg-text-muted animate-bounce [animation-delay:-0.15s]" />
    <span class="h-2 w-2 rounded-full bg-text-muted animate-bounce" />
  </div>
</template>
