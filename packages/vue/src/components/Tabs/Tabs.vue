<script setup lang="ts">
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'radix-vue';
import { cn } from '../../utils/cn';

interface Props {
  defaultValue?: string;
  modelValue?: string;
  class?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <TabsRoot :default-value="defaultValue" :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" :class="props.class" v-bind="$attrs">
    <slot />
  </TabsRoot>
</template>
