<script setup lang="ts">
import { cn } from '../../utils/cn';

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn('rounded-lg border border-surface-border bg-surface-raised shadow-sm', props.class)" v-bind="$attrs">
    <slot />
  </div>
</template>
