<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props {
  checked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { checked: false, size: 'md' });
const emit = defineEmits<{ 'update:checked': [value: boolean] }>();

const sizes = {
  sm: { track: 'h-4 w-7', thumb: 'h-3 w-3 data-[state=checked]:translate-x-3' },
  md: { track: 'h-5 w-9', thumb: 'h-4 w-4 data-[state=checked]:translate-x-4' },
  lg: { track: 'h-6 w-11', thumb: 'h-5 w-5 data-[state=checked]:translate-x-5' },
};
</script>

<template>
  <SwitchRoot
    :checked="checked"
    @update:checked="emit('update:checked', $event)"
    :class="cn(
      'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-main data-[state=unchecked]:bg-surface-border',
      sizes[size].track,
      props.class
    )"
    v-bind="$attrs"
  >
    <SwitchThumb
      :class="cn(
        'pointer-events-none block rounded-full bg-white shadow-sm transition-transform data-[state=unchecked]:translate-x-0',
        sizes[size].thumb
      )"
    />
  </SwitchRoot>
</template>
