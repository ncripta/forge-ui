<script setup lang="ts">
import { Toaster } from 'vue-sonner';

interface Props {
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  richColors?: boolean;
  duration?: number;
}

withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
  richColors: true,
  duration: 4000,
});
</script>

<template>
  <Toaster :position="position" :rich-colors="richColors" :duration="duration" />
</template>
