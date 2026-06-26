<script setup lang="ts">
import { AccordionRoot } from 'radix-vue';

interface Props {
  type?: 'single' | 'multiple';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { type: 'single' });
</script>

<template>
  <AccordionRoot :type="type" :class="props.class" v-bind="$attrs">
    <slot />
  </AccordionRoot>
</template>
