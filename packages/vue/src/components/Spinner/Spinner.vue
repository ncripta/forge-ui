<script setup lang="ts">
import { computed } from 'vue';
import { type VariantProps } from 'class-variance-authority';
import { spinnerVariants } from '@forge-ui/variants';
import { cn } from '../../utils/cn';

type SpinnerVariantProps = VariantProps<typeof spinnerVariants>;

interface Props {
  size?: SpinnerVariantProps['size'];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
});

const classes = computed(() => cn(spinnerVariants({ size: props.size }), props.class));
</script>

<template>
  <svg :class="classes" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-bind="$attrs">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
</template>
