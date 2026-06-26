<script setup lang="ts">
import { computed } from 'vue';
import { DialogPortal, DialogOverlay, DialogContent } from 'radix-vue';
import { type VariantProps } from 'class-variance-authority';
import { sheetContentVariants } from '@forge-ui/variants';
import { cn } from '../../utils/cn';

type SheetVariants = VariantProps<typeof sheetContentVariants>;

interface Props {
  side?: SheetVariants['side'];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  side: 'right',
});

const classes = computed(() =>
  cn(sheetContentVariants({ side: props.side }), 'p-6 overflow-y-auto', props.class)
);
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="fixed inset-0 z-50 bg-black/60" />
    <DialogContent :class="classes" v-bind="$attrs">
      <slot />
    </DialogContent>
  </DialogPortal>
</template>
