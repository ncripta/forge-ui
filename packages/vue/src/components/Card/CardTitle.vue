<script setup lang="ts">
import { cn } from '../../utils/cn';
interface Props { class?: string }
const props = defineProps<Props>();
</script>

<template>
  <h3 :class="cn('text-2xl font-semibold leading-tight text-text-main', props.class)" v-bind="$attrs"><slot /></h3>
</template>
