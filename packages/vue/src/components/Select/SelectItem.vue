<script setup lang="ts">
import { SelectItem, SelectItemIndicator, SelectItemText } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props { value: string; class?: string }
const props = defineProps<Props>();
</script>

<template>
  <SelectItem
    :value="value"
    :class="cn('relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-text-main outline-none focus:bg-primary-subtle focus:text-primary-main data-[disabled]:pointer-events-none data-[disabled]:opacity-50', props.class)"
    v-bind="$attrs"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </SelectItemIndicator>
    </span>
    <SelectItemText><slot /></SelectItemText>
  </SelectItem>
</template>
