<script setup lang="ts">
import { DropdownMenuPortal, DropdownMenuContent } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props {
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  sideOffset: 4,
});
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      :align="align"
      :side-offset="sideOffset"
      :class="cn('z-50 min-w-[8rem] overflow-hidden rounded-md border border-surface-border bg-surface-raised p-1 shadow-md', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
