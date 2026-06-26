<script setup lang="ts">
import { cn } from '../../utils/cn';

interface Props {
  error?: boolean;
  modelValue?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { error: false });
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <textarea
    :class="cn(
      'flex min-h-[80px] w-full rounded-md border bg-surface-background px-3 py-2 text-sm text-text-main placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
      error ? 'border-danger-main focus-visible:ring-danger-main' : 'border-surface-border hover:border-surface-border-hover',
      props.class
    )"
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    v-bind="$attrs"
  />
</template>
