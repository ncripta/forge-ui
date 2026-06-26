<script setup lang="ts">
import { RadioGroupItem, RadioGroupIndicator } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props { value: string; class?: string }
const props = defineProps<Props>();
</script>

<template>
  <RadioGroupItem
    :value="value"
    :class="cn('aspect-square h-4 w-4 rounded-full border border-surface-border text-primary-main focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)"
    v-bind="$attrs"
  >
    <RadioGroupIndicator class="flex items-center justify-center">
      <span class="h-2.5 w-2.5 rounded-full bg-current" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
