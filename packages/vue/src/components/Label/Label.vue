<script setup lang="ts">
import { cn } from '../../utils/cn';

interface Props {
  required?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
});
</script>

<template>
  <label :class="cn('text-sm font-medium text-text-main leading-none', props.class)" v-bind="$attrs">
    <slot />
    <span v-if="required" class="text-danger-main ml-1">*</span>
  </label>
</template>
