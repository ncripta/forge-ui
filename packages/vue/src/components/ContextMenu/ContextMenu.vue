<script setup lang="ts">
import { ContextMenuRoot, ContextMenuTrigger, ContextMenuPortal, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props { class?: string }
const props = defineProps<Props>();
</script>

<template>
  <ContextMenuRoot>
    <ContextMenuTrigger as-child>
      <slot name="trigger" />
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent :class="cn('z-50 min-w-[8rem] overflow-hidden rounded-md border border-surface-border bg-surface-raised p-1 shadow-md', props.class)">
        <slot />
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>
