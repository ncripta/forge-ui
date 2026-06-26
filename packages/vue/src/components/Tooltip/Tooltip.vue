<script setup lang="ts">
import { TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipProvider } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props { class?: string; sideOffset?: number }
const props = withDefaults(defineProps<Props>(), { sideOffset: 4 });
</script>

<template>
  <TooltipProvider>
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot name="trigger" />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          :side-offset="sideOffset"
          :class="cn('z-50 overflow-hidden rounded-md bg-surface-overlay border border-surface-border px-3 py-1.5 text-xs text-text-main shadow-md', props.class)"
        >
          <slot />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
