<script setup lang="ts">
import { ref, computed } from 'vue';
import { cn } from '../../utils/cn';

interface Props {
  modelValue?: Date;
  class?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ 'update:modelValue': [date: Date] }>();

const DAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const viewDate = ref(props.modelValue || new Date());
const year = computed(() => viewDate.value.getFullYear());
const month = computed(() => viewDate.value.getMonth());
const today = new Date();

function getDays(y: number, m: number): Date[] {
  const days: Date[] = [];
  const first = new Date(y, m, 1);
  const last = new Date(y, m + 1, 0);
  const startDay = (first.getDay() + 6) % 7;
  for (let i = startDay - 1; i >= 0; i--) days.push(new Date(y, m, -i));
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(y, m, d));
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) days.push(new Date(y, m + 1, i));
  return days;
}

const days = computed(() => getDays(year.value, month.value));
const isSameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const prev = () => { viewDate.value = new Date(year.value, month.value - 1, 1); };
const next = () => { viewDate.value = new Date(year.value, month.value + 1, 1); };
</script>

<template>
  <div :class="cn('w-[280px] rounded-lg border border-surface-border bg-surface-raised p-3 shadow-sm', props.class)">
    <div class="flex items-center justify-between mb-2">
      <button type="button" @click="prev" class="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-surface-sunken text-text-muted">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <span class="text-sm font-medium text-text-main">{{ MONTHS[month] }} {{ year }}</span>
      <button type="button" @click="next" class="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-surface-sunken text-text-muted">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
    <div class="grid grid-cols-7 mb-1">
      <div v-for="d in DAYS" :key="d" class="text-center text-xs font-medium text-text-muted py-1">{{ d }}</div>
    </div>
    <div class="grid grid-cols-7">
      <button
        v-for="(day, i) in days"
        :key="i"
        type="button"
        @click="emit('update:modelValue', day)"
        :class="cn(
          'h-8 w-8 mx-auto rounded-md text-xs transition-colors',
          day.getMonth() !== month && 'text-text-disabled',
          day.getMonth() === month && !(modelValue && isSameDay(day, modelValue)) && 'text-text-main hover:bg-surface-sunken',
          isSameDay(day, today) && !(modelValue && isSameDay(day, modelValue)) && 'border border-primary-main',
          modelValue && isSameDay(day, modelValue) && 'bg-primary-main text-text-inverse'
        )"
      >
        {{ day.getDate() }}
      </button>
    </div>
  </div>
</template>
