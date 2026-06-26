<script setup lang="ts">
import { cn } from '../../utils/cn';

interface Props {
  modelValue?: string;
  placeholder?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { placeholder: 'Buscar...' });
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <div class="flex items-center border-b border-surface-border px-3">
    <svg class="mr-2 h-4 w-4 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :class="cn('flex h-11 w-full bg-transparent py-3 text-sm text-text-main outline-none placeholder:text-text-muted', props.class)"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
