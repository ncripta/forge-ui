<script setup lang="ts">
import { AccordionHeader, AccordionTrigger } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props { class?: string }
const props = defineProps<Props>();
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      :class="cn('flex flex-1 items-center justify-between py-4 font-medium text-sm text-text-main transition-all hover:text-primary-main [&[data-state=open]>svg]:rotate-180', props.class)"
      v-bind="$attrs"
    >
      <slot />
      <svg class="h-4 w-4 shrink-0 text-text-muted transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </AccordionTrigger>
  </AccordionHeader>
</template>
