<script setup lang="ts">
import { SelectTrigger, SelectIcon, SelectValue } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props { class?: string; placeholder?: string }
const props = defineProps<Props>();
</script>

<template>
  <SelectTrigger
    :class="cn('flex h-10 w-full items-center justify-between rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm text-text-main ring-offset-surface-background placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50', props.class)"
    v-bind="$attrs"
  >
    <SelectValue :placeholder="placeholder" />
    <SelectIcon as-child>
      <svg class="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </SelectIcon>
  </SelectTrigger>
</template>
