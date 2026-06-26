<script setup lang="ts">
import { TabsTrigger } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props {
  value: string;
  class?: string;
}
const props = defineProps<Props>();
</script>

<template>
  <TabsTrigger
    :value="value"
    :class="cn('inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-surface-raised data-[state=active]:text-text-main data-[state=active]:shadow-xs', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </TabsTrigger>
</template>
