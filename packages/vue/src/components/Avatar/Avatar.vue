<script setup lang="ts">
import { computed, ref } from 'vue';
import { type VariantProps } from 'class-variance-authority';
import { avatarVariants } from '@ncripta/forge-variants';
import { cn } from '../../utils/cn';

type AvatarVariantProps = VariantProps<typeof avatarVariants>;

interface Props {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarVariantProps['size'];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
});

const imgError = ref(false);
const showImage = computed(() => props.src && !imgError.value);
const classes = computed(() => cn(avatarVariants({ size: props.size }), props.class));
</script>

<template>
  <span :class="classes" v-bind="$attrs">
    <img
      v-if="showImage"
      :src="src"
      :alt="alt"
      class="aspect-square h-full w-full object-cover rounded-full"
      @error="imgError = true"
    />
    <span
      v-else
      class="flex h-full w-full items-center justify-center rounded-full bg-primary-subtle text-primary-main font-medium"
    >
      {{ fallback }}
    </span>
  </span>
</template>
