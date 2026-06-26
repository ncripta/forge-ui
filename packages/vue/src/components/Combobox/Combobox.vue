<script setup lang="ts">
import { ref, computed } from 'vue';
import { ComboboxRoot, ComboboxInput, ComboboxContent, ComboboxItem, ComboboxEmpty, ComboboxAnchor } from 'radix-vue';
import { cn } from '../../utils/cn';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  options: ComboboxOption[];
  modelValue?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Seleccionar...',
  searchPlaceholder: 'Buscar...',
  emptyMessage: 'Sin resultados.',
});

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
const searchTerm = ref('');

const filtered = computed(() =>
  props.options.filter((o) => o.label.toLowerCase().includes(searchTerm.value.toLowerCase()))
);
</script>

<template>
  <ComboboxRoot :model-value="modelValue" @update:model-value="emit('update:modelValue', $event as string)" :display-value="(val) => options.find(o => o.value === val)?.label || ''">
    <ComboboxAnchor :class="cn('flex h-10 w-full items-center rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm', props.class)">
      <ComboboxInput :placeholder="placeholder" class="flex-1 bg-transparent outline-none placeholder:text-text-muted text-text-main" @input="searchTerm = ($event.target as HTMLInputElement).value" />
    </ComboboxAnchor>
    <ComboboxContent class="z-50 mt-1 max-h-[200px] overflow-y-auto rounded-md border border-surface-border bg-surface-raised p-1 shadow-md">
      <ComboboxEmpty class="py-4 text-center text-sm text-text-muted">{{ emptyMessage }}</ComboboxEmpty>
      <ComboboxItem
        v-for="option in filtered"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
        class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-text-main outline-none data-[highlighted]:bg-primary-subtle data-[highlighted]:text-primary-main data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      >
        {{ option.label }}
      </ComboboxItem>
    </ComboboxContent>
  </ComboboxRoot>
</template>
