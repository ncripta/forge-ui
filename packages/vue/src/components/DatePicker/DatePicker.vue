<script setup lang="ts">
import { ref, computed } from 'vue';
import { PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent } from 'radix-vue';
import Calendar from '../Calendar/Calendar.vue';
import { cn } from '../../utils/cn';

interface Props {
  modelValue?: Date;
  placeholder?: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { placeholder: 'Seleccionar fecha', disabled: false });
const emit = defineEmits<{ 'update:modelValue': [date: Date] }>();
const open = ref(false);

const formatted = computed(() =>
  props.modelValue ? props.modelValue.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''
);
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger
      :disabled="disabled"
      :class="cn('flex h-10 w-full items-center rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50', !modelValue && 'text-text-muted', props.class)"
    >
      <svg class="mr-2 h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span>{{ formatted || placeholder }}</span>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent :side-offset="4" align="start" class="z-50">
        <Calendar :model-value="modelValue" @update:model-value="emit('update:modelValue', $event); open = false" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
