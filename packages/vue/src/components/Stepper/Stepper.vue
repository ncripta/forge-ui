<script setup lang="ts">
import { cn } from '../../utils/cn';

interface StepperStep { label: string; description?: string }

interface Props {
  steps: StepperStep[];
  currentStep: number;
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <nav aria-label="Progress" :class="cn('w-full', props.class)">
    <ol class="flex items-center">
      <li v-for="(step, index) in steps" :key="index" :class="cn('flex items-center', index < steps.length - 1 && 'flex-1')">
        <div class="flex flex-col items-center gap-1">
          <div
            :class="cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
              index < currentStep && 'bg-success-main text-text-inverse',
              index === currentStep && 'bg-primary-main text-text-inverse',
              index > currentStep && 'bg-surface-sunken text-text-muted border border-surface-border'
            )"
          >
            <svg v-if="index < currentStep" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <span :class="cn('text-xs text-center whitespace-nowrap', index === currentStep ? 'text-text-main font-medium' : 'text-text-muted')">{{ step.label }}</span>
        </div>
        <div v-if="index < steps.length - 1" :class="cn('flex-1 h-px mx-3 mt-[-1rem]', index < currentStep ? 'bg-success-main' : 'bg-surface-border')" />
      </li>
    </ol>
  </nav>
</template>
