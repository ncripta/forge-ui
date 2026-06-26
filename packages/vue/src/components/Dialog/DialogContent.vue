<script setup lang="ts">
import { DialogPortal, DialogOverlay, DialogContent } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="fixed inset-0 z-50 bg-black/60" />
    <DialogContent
      :class="cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-surface-border bg-surface-raised p-6 shadow-xl rounded-lg',
        props.class
      )"
      v-bind="$attrs"
    >
      <slot />
    </DialogContent>
  </DialogPortal>
</template>
