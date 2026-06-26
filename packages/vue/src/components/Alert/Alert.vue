<script setup lang="ts">
import { computed } from 'vue';
import { type VariantProps } from 'class-variance-authority';
import { alertVariants } from '@forge-ui/variants';
import { cn } from '../../utils/cn';

type AlertVariantProps = VariantProps<typeof alertVariants>;

interface Props {
  intent?: AlertVariantProps['intent'];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  intent: 'default',
});

const classes = computed(() => cn(alertVariants({ intent: props.intent }), props.class));
</script>

<template>
  <div role="alert" :class="classes" v-bind="$attrs">
    <slot />
  </div>
</template>
