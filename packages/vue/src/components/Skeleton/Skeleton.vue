<script setup lang="ts">
import { cn } from '../../utils/cn';

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-surface-sunken', props.class)" v-bind="$attrs" />
</template>
