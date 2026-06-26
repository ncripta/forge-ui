<script setup lang="ts">
import { appConfig } from '@/config/app.config';
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-surface-sunken p-4">
    <div class="w-full max-w-md space-y-6">
      <div class="flex flex-col items-center gap-2">
        <img :src="appConfig.logo" :alt="appConfig.name" class="h-10 w-10" />
        <h1 class="text-2xl font-bold text-text-main">{{ appConfig.name }}</h1>
      </div>
      <router-view />
    </div>
  </div>
</template>
