<script setup lang="ts">
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props {
  modelValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { min: 0, max: 100, step: 1 });
const emit = defineEmits<{ 'update:modelValue': [value: number[]] }>();

const handleUpdate = (val: number[] | undefined) => {
  if (val) emit('update:modelValue', val);
};
</script>

<template>
  <SliderRoot
    :model-value="modelValue || [0]"
    :min="min"
    :max="max"
    :step="step"
    @update:model-value="handleUpdate"
    :class="cn('relative flex w-full touch-none select-none items-center', props.class)"
    v-bind="$attrs"
  >
    <SliderTrack class="relative h-2 w-full grow overflow-hidden rounded-full bg-surface-sunken">
      <SliderRange class="absolute h-full bg-primary-main" />
    </SliderTrack>
    <SliderThumb class="block h-5 w-5 rounded-full border-2 border-primary-main bg-surface-background ring-offset-surface-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-2" />
  </SliderRoot>
</template>
