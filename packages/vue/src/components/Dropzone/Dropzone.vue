<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '../../utils/cn';

interface Props {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { multiple: false, disabled: false });
const emit = defineEmits<{ files: [files: File[]] }>();
const isDragging = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const handleFiles = (fileList: FileList | null) => {
  if (!fileList) return;
  let files = Array.from(fileList);
  if (props.maxSize) files = files.filter((f) => f.size <= props.maxSize!);
  emit('files', files);
};
</script>

<template>
  <div
    :class="cn(
      'relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
      isDragging ? 'border-primary-main bg-primary-subtle' : 'border-surface-border bg-surface-sunken hover:border-surface-border-hover',
      disabled && 'cursor-not-allowed opacity-50',
      props.class
    )"
    @dragover.prevent="!disabled && (isDragging = true)"
    @dragleave="isDragging = false"
    @drop.prevent="isDragging = false; !disabled && handleFiles($event.dataTransfer?.files || null)"
    @click="!disabled && inputRef?.click()"
  >
    <input
      ref="inputRef"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      class="hidden"
      @change="handleFiles(($event.target as HTMLInputElement).files)"
    />
    <slot>
      <div class="flex flex-col items-center gap-2 p-6 text-center">
        <svg class="h-10 w-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <p class="text-sm text-text-muted"><span class="font-medium text-primary-main">Haz clic</span> o arrastra archivos aquí</p>
      </div>
    </slot>
  </div>
</template>
