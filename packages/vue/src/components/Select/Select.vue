<script setup lang="ts">
import { SelectRoot } from 'radix-vue';

interface Props {
  modelValue?: string;
  defaultValue?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <SelectRoot :model-value="modelValue" :default-value="defaultValue" @update:model-value="emit('update:modelValue', $event)">
    <slot />
  </SelectRoot>
</template>
