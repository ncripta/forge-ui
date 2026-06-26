<script setup lang="ts">
import { cn } from '../../utils/cn';
interface Props { class?: string }
const props = defineProps<Props>();
</script>

<template>
  <p :class="cn('text-sm [&_p]:leading-relaxed opacity-90', props.class)" v-bind="$attrs"><slot /></p>
</template>
