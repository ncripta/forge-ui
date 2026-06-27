<script setup lang="ts">
import { computed } from 'vue';
import { type VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@ncripta/forge-variants';
import { cn } from '../../utils/cn';

type BadgeVariantProps = VariantProps<typeof badgeVariants>;

interface Props {
  intent?: BadgeVariantProps['intent'];
  variant?: BadgeVariantProps['variant'];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  intent: 'default',
  variant: 'subtle',
});

const classes = computed(() =>
  cn(badgeVariants({ intent: props.intent, variant: props.variant }), props.class)
);
</script>

<template>
  <span :class="classes" v-bind="$attrs">
    <slot />
  </span>
</template>
