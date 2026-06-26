<script setup lang="ts">
import { cn } from '../../utils/cn';
import Avatar from '../Avatar/Avatar.vue';

interface AvatarItem {
  src?: string;
  fallback?: string;
}

interface Props {
  avatars: AvatarItem[];
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { max: 4, size: 'md' });

const sizeClasses: Record<string, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};
</script>

<template>
  <div :class="cn('flex -space-x-3', props.class)">
    <Avatar
      v-for="(avatar, i) in avatars.slice(0, max)"
      :key="i"
      :size="size"
      :src="avatar.src"
      :fallback="avatar.fallback"
      class="ring-2 ring-surface-background"
    />
    <div
      v-if="avatars.length > max"
      :class="cn('relative flex items-center justify-center rounded-full bg-surface-sunken border-2 border-surface-background font-medium text-text-muted', sizeClasses[size])"
    >
      +{{ avatars.length - max }}
    </div>
  </div>
</template>
