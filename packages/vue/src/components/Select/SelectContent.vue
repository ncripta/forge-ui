<script setup lang="ts">
import { SelectPortal, SelectContent, SelectViewport } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props { class?: string; position?: 'popper' | 'item-aligned' }
const props = withDefaults(defineProps<Props>(), { position: 'popper' });
</script>

<template>
  <SelectPortal>
    <SelectContent
      :position="position"
      :class="cn('relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-surface-border bg-surface-raised shadow-md', props.class)"
      v-bind="$attrs"
    >
      <SelectViewport class="p-1">
        <slot />
      </SelectViewport>
    </SelectContent>
  </SelectPortal>
</template>
