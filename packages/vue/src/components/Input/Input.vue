<script setup lang="ts">
import { computed } from 'vue';
import { type VariantProps } from 'class-variance-authority';
import { inputVariants } from '@forge-ui/variants';
import { cn } from '../../utils/cn';

type InputVariantProps = VariantProps<typeof inputVariants>;

interface Props {
  size?: InputVariantProps['size'];
  error?: boolean;
  modelValue?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  error: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const classes = computed(() =>
  cn(inputVariants({ size: props.size, error: props.error }), props.class)
);

const handleInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};
</script>

<template>
  <input :class="classes" :value="modelValue" @input="handleInput" v-bind="$attrs" />
</template>
