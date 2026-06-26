<script setup lang="ts">
import { cn } from '../../utils/cn';

interface Props {
  orientation?: 'horizontal' | 'vertical';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
});
</script>

<template>
  <div
    role="separator"
    :aria-orientation="orientation"
    :class="cn(
      'shrink-0 bg-surface-border',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      props.class
    )"
    v-bind="$attrs"
  />
</template>
