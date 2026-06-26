<script setup lang="ts">
import { DropdownMenuItem } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props { class?: string }
const props = defineProps<Props>();
</script>

<template>
  <DropdownMenuItem
    :class="cn('relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-text-main outline-none transition-colors focus:bg-primary-subtle focus:text-primary-main data-[disabled]:pointer-events-none data-[disabled]:opacity-50', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </DropdownMenuItem>
</template>
