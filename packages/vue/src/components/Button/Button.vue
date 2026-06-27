<script setup lang="ts">
import { computed } from 'vue';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@ncripta/forge-variants';
import { cn } from '../../utils/cn';

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props {
  intent?: ButtonVariants['intent'];
  size?: ButtonVariants['size'];
  loading?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  intent: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  asChild: false,
});

const classes = computed(() =>
  cn(buttonVariants({ intent: props.intent, size: props.size }), props.class)
);
</script>

<template>
  <button :class="classes" :disabled="disabled || loading" v-bind="$attrs">
    <svg
      v-if="loading"
      class="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <slot />
  </button>
</template>
