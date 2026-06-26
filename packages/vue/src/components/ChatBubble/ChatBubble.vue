<script setup lang="ts">
import { computed } from 'vue';
import { type VariantProps } from 'class-variance-authority';
import { chatBubbleVariants } from '@forge-ui/variants';
import { cn } from '../../utils/cn';

type ChatVariants = VariantProps<typeof chatBubbleVariants>;

interface Props {
  role?: ChatVariants['role'];
  timestamp?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { role: 'user' });
const classes = computed(() => cn(chatBubbleVariants({ role: props.role }), props.class));
const alignClass = computed(() => props.role === 'user' ? 'items-end' : props.role === 'system' ? 'items-center' : 'items-start');
</script>

<template>
  <div :class="cn('flex flex-col gap-1', alignClass)">
    <div :class="classes"><slot /></div>
    <span v-if="timestamp" class="text-xs text-text-muted px-1">{{ timestamp }}</span>
  </div>
</template>
