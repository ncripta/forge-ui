<script setup lang="ts">
import { ref } from 'vue';
import { ComboboxRoot, ComboboxInput, ComboboxContent, ComboboxItem, ComboboxEmpty, ComboboxGroup, ComboboxLabel, ComboboxAnchor } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn('flex h-full w-full flex-col overflow-hidden rounded-lg bg-surface-raised text-text-main', props.class)">
    <slot />
  </div>
</template>
