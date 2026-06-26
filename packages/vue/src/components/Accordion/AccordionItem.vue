<script setup lang="ts">
import { AccordionItem } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props { value: string; class?: string }
const props = defineProps<Props>();
</script>

<template>
  <AccordionItem :value="value" :class="cn('border-b border-surface-border', props.class)" v-bind="$attrs">
    <slot />
  </AccordionItem>
</template>
