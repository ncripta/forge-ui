<script setup lang="ts" generic="TData">
import { ref, computed, watch } from 'vue';
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  FlexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from '@tanstack/vue-table';
import { cn } from '../../utils/cn';

export interface DataTableProps<TData = any> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  pageSize?: number;
  enableSelection?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<DataTableProps>(), {
  pageSize: 10,
  enableSelection: false,
});

const emit = defineEmits<{ 'selection-change': [selection: RowSelectionState] }>();

const sorting = ref<SortingState>([]);
const rowSelection = ref<RowSelectionState>({});

watch(rowSelection, (val) => emit('selection-change', val), { deep: true });

const table = useVueTable({
  get data() { return props.data; },
  get columns() { return props.columns; },
  state: {
    get sorting() { return sorting.value; },
    get rowSelection() { return rowSelection.value; },
  },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater;
  },
  onRowSelectionChange: (updater) => {
    rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  enableRowSelection: props.enableSelection,
  initialState: {
    pagination: { pageSize: props.pageSize },
  },
});

const pageIndex = computed(() => table.getState().pagination.pageIndex);
const pageCount = computed(() => table.getPageCount());
</script>

<template>
  <div :class="cn('space-y-4', props.class)">
    <div class="rounded-lg border border-surface-border overflow-hidden">
      <div class="relative w-full overflow-auto">
        <table class="w-full caption-bottom text-sm">
          <thead class="[&_tr]:border-b">
            <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id" class="border-b border-surface-border">
              <th
                v-for="header in headerGroup.headers"
                :key="header.id"
                :class="cn('h-10 px-4 text-left align-middle font-medium text-text-muted', header.column.getCanSort() && 'cursor-pointer select-none')"
                @click="header.column.getToggleSortingHandler()?.($event)"
              >
                <div class="flex items-center gap-1">
                  <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
                  <span v-if="header.column.getIsSorted() === 'asc'">↑</span>
                  <span v-if="header.column.getIsSorted() === 'desc'">↓</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="[&_tr:last-child]:border-0">
            <template v-if="table.getRowModel().rows.length">
              <tr
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                :data-state="row.getIsSelected() ? 'selected' : undefined"
                class="border-b border-surface-border transition-colors hover:bg-surface-sunken data-[state=selected]:bg-primary-subtle"
              >
                <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="p-4 align-middle text-text-main">
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td :colspan="props.columns.length" class="h-24 text-center text-text-muted">
                  Sin resultados.
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between px-2">
      <p v-if="enableSelection" class="text-sm text-text-muted">
        {{ table.getFilteredSelectedRowModel().rows.length }} de {{ table.getFilteredRowModel().rows.length }} fila(s) seleccionada(s).
      </p>
      <div class="flex items-center gap-2 ml-auto">
        <button
          class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-surface-border bg-surface-background text-text-main hover:bg-surface-sunken disabled:opacity-50 disabled:pointer-events-none transition-colors"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Anterior
        </button>
        <span class="text-sm text-text-secondary">{{ pageIndex + 1 }} / {{ pageCount }}</span>
        <button
          class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-surface-border bg-surface-background text-text-main hover:bg-surface-sunken disabled:opacity-50 disabled:pointer-events-none transition-colors"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>
