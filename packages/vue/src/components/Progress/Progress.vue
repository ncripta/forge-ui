<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../utils/cn';

interface Props {
  value: number;
  max?: number;
  color?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { max: 100 });
const percentage = computed(() => Math.min(Math.max((props.value / props.max) * 100, 0), 100));
</script>

<template>
  <div
    role="progressbar"
    :aria-valuenow="value"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :class="cn('w-full h-2 bg-surface-sunken rounded-full overflow-hidden', props.class)"
    v-bind="$attrs"
  >
    <div
      :class="cn('h-full rounded-full transition-all', !color && 'bg-primary-main')"
      :style="{ width: `${percentage}%`, ...(color ? { backgroundColor: color } : {}) }"
    />
  </div>
</template>
