<script setup lang="ts">
import { PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props { class?: string; align?: 'start' | 'center' | 'end'; sideOffset?: number }
const props = withDefaults(defineProps<Props>(), { align: 'center', sideOffset: 4 });
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        :align="align"
        :side-offset="sideOffset"
        :class="cn('z-50 w-72 rounded-lg border border-surface-border bg-surface-raised p-4 shadow-md outline-none', props.class)"
        v-bind="$attrs"
      >
        <slot />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
