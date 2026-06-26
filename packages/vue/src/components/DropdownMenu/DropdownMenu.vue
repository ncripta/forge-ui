<script setup lang="ts">
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from 'radix-vue';
</script>

<template>
  <DropdownMenuRoot>
    <slot />
  </DropdownMenuRoot>
</template>
