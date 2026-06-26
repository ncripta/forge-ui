<script setup lang="ts">
import { CheckboxRoot, CheckboxIndicator } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props {
  checked?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { checked: false });
const emit = defineEmits<{ 'update:checked': [value: boolean] }>();
</script>

<template>
  <CheckboxRoot
    :checked="checked"
    @update:checked="emit('update:checked', $event)"
    :class="cn('h-4 w-4 shrink-0 rounded-sm border border-surface-border bg-surface-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main', props.class)"
    v-bind="$attrs"
  >
    <CheckboxIndicator class="flex items-center justify-center text-text-inverse">
      <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
