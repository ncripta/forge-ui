<script setup lang="ts">
import { TabsList } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props { class?: string }
const props = defineProps<Props>();
</script>

<template>
  <TabsList :class="cn('inline-flex h-10 items-center justify-center rounded-md bg-surface-sunken p-1 text-text-muted', props.class)" v-bind="$attrs">
    <slot />
  </TabsList>
</template>
