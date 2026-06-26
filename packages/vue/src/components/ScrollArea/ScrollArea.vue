<script setup lang="ts">
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaCorner } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props { class?: string }
const props = defineProps<Props>();
</script>

<template>
  <ScrollAreaRoot :class="cn('relative overflow-hidden', props.class)" v-bind="$attrs">
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      orientation="vertical"
      class="flex touch-none select-none transition-colors h-full w-2.5 border-l border-l-transparent p-[1px]"
    >
      <ScrollAreaThumb class="relative flex-1 rounded-full bg-surface-border hover:bg-surface-border-hover" />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
