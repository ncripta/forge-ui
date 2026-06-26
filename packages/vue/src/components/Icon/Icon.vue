<script setup lang="ts">
import { computed } from 'vue';
import * as icons from '@lucide/vue';
import { cn } from '../../utils/cn';

interface Props {
  name: string;
  size?: number;
  strokeWidth?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 20,
  strokeWidth: 1.75,
});

const iconComponent = computed(() => {
  return (icons as Record<string, unknown>)[props.name] || null;
});
</script>

<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    :size="size"
    :stroke-width="strokeWidth"
    :class="cn('shrink-0', props.class)"
    v-bind="$attrs"
  />
</template>
