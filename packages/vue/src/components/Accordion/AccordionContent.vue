<script setup lang="ts">
import { AccordionContent } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props { class?: string }
const props = defineProps<Props>();
</script>

<template>
  <AccordionContent class="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" v-bind="$attrs">
    <div :class="cn('pb-4 pt-0 text-text-secondary', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>
