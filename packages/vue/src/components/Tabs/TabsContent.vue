<script setup lang="ts">
import { TabsContent } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props {
  value: string;
  class?: string;
}
const props = defineProps<Props>();
</script>

<template>
  <TabsContent :value="value" :class="cn('mt-2 focus-visible:outline-none', props.class)" v-bind="$attrs">
    <slot />
  </TabsContent>
</template>
