<script setup lang="ts">
import { cn } from '../../utils/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <nav aria-label="Breadcrumb" :class="cn('flex items-center', props.class)">
    <ol class="flex items-center gap-1.5">
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-1.5">
        <a
          v-if="item.href && index < items.length - 1"
          :href="item.href"
          class="text-sm text-text-muted hover:text-text-main transition-colors"
        >
          {{ item.label }}
        </a>
        <span
          v-else
          :class="cn('text-sm', index === items.length - 1 ? 'text-text-main font-medium' : 'text-text-muted')"
        >
          {{ item.label }}
        </span>
        <svg
          v-if="index < items.length - 1"
          class="h-4 w-4 text-text-disabled"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </li>
    </ol>
  </nav>
</template>
