<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../utils/cn';

interface Props {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { siblingCount: 1 });
const emit = defineEmits<{ 'page-change': [page: number] }>();

function generatePages(current: number, total: number, siblings: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];
  const leftSibling = Math.max(current - siblings, 2);
  const rightSibling = Math.min(current + siblings, total - 1);

  pages.push(1);
  if (leftSibling > 2) pages.push('ellipsis');
  for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);
  if (rightSibling < total - 1) pages.push('ellipsis');
  if (total > 1) pages.push(total);
  return pages;
}

const pages = computed(() => generatePages(props.currentPage, props.totalPages, props.siblingCount));
const baseBtn = 'inline-flex items-center justify-center h-9 min-w-9 px-2 text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none';
</script>

<template>
  <nav aria-label="Pagination" :class="cn('flex items-center gap-1', props.class)">
    <button
      :class="cn(baseBtn, 'border border-surface-border bg-surface-background text-text-main hover:bg-surface-sunken')"
      :disabled="currentPage <= 1"
      @click="emit('page-change', currentPage - 1)"
      aria-label="Página anterior"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <template v-for="(page, i) in pages" :key="i">
      <span v-if="page === 'ellipsis'" class="inline-flex items-center justify-center h-9 min-w-9 text-sm text-text-muted">…</span>
      <button
        v-else
        :class="cn(baseBtn, page === currentPage ? 'bg-primary-main text-text-inverse' : 'border border-surface-border bg-surface-background text-text-main hover:bg-surface-sunken')"
        :aria-current="page === currentPage ? 'page' : undefined"
        @click="emit('page-change', page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      :class="cn(baseBtn, 'border border-surface-border bg-surface-background text-text-main hover:bg-surface-sunken')"
      :disabled="currentPage >= totalPages"
      @click="emit('page-change', currentPage + 1)"
      aria-label="Página siguiente"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </nav>
</template>
