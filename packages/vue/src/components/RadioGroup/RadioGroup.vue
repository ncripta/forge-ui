<script setup lang="ts">
import { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props {
  modelValue?: string;
  class?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <RadioGroupRoot :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" :class="cn('grid gap-2', props.class)" v-bind="$attrs">
    <slot />
  </RadioGroupRoot>
</template>
