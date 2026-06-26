<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '../../utils/cn';

interface Props {
  length?: number;
  modelValue?: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { length: 6, disabled: false });
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
const inputs = ref<(HTMLInputElement | null)[]>([]);

const handleChange = (index: number, char: string) => {
  if (!/^\d*$/.test(char)) return;
  const val = (props.modelValue || '').split('');
  val[index] = char;
  const joined = val.join('').slice(0, props.length);
  emit('update:modelValue', joined);
  if (char && index < props.length - 1) inputs.value[index + 1]?.focus();
};

const handleKeyDown = (index: number, e: KeyboardEvent) => {
  if (e.key === 'Backspace' && !(props.modelValue || '')[index] && index > 0) {
    inputs.value[index - 1]?.focus();
  }
};

const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault();
  const pasted = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, props.length);
  emit('update:modelValue', pasted);
  const focusIdx = Math.min(pasted.length, props.length - 1);
  inputs.value[focusIdx]?.focus();
};
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <input
      v-for="i in length"
      :key="i"
      :ref="(el) => { inputs[i - 1] = el as HTMLInputElement }"
      type="text"
      inputmode="numeric"
      maxlength="1"
      :disabled="disabled"
      :value="(modelValue || '')[i - 1] || ''"
      class="h-10 w-10 rounded-md border border-surface-border bg-surface-background text-center text-sm font-medium text-text-main focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      @input="handleChange(i - 1, ($event.target as HTMLInputElement).value)"
      @keydown="handleKeyDown(i - 1, $event)"
      @paste="handlePaste"
    />
  </div>
</template>
