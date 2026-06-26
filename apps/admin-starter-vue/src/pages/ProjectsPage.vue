<script setup lang="ts">
import { Card, CardContent, CardTitle, Icon, Badge, Button, Progress } from '@forge-ui/vue';
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">Proyectos</h1>
        <p class="text-sm text-surface-500 mt-1">Gestiona y monitorea tus espacios de trabajo.</p>
      </div>
      <Button intent="primary"><Icon name="Plus" :size="16" /> Nuevo Proyecto</Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card class="p-5">
        <CardContent class="p-0">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Icon name="ShoppingCart" :size="24" />
            </div>
          </div>
          <h3 class="text-lg font-bold text-surface-900">E-commerce Portal</h3>
          <p class="text-sm text-surface-500 mt-1">Rediseño de la tienda online principal.</p>
          <div class="mt-4">
            <div class="flex justify-between text-xs font-medium mb-1.5">
              <span class="text-surface-500">Progreso</span>
              <span class="text-surface-900">75%</span>
            </div>
            <Progress :value="75" />
          </div>
        </CardContent>
      </Card>

      <Card class="p-5">
        <CardContent class="p-0">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Icon name="Bot" :size="24" />
            </div>
          </div>
          <h3 class="text-lg font-bold text-surface-900">Valhalla Agents IA</h3>
          <p class="text-sm text-surface-500 mt-1">Interfaz conversacional para agentes.</p>
          <div class="mt-4">
            <div class="flex justify-between text-xs font-medium mb-1.5">
              <span class="text-surface-500">Progreso</span>
              <span class="text-surface-900">92%</span>
            </div>
            <Progress :value="92" color="#a855f7" />
          </div>
        </CardContent>
      </Card>

      <!-- Add new card -->
      <button class="border-2 border-dashed border-surface-200 rounded-lg p-5 hover:border-primary-400 hover:bg-primary-50 transition-colors group flex flex-col items-center justify-center min-h-[200px]">
        <div class="w-14 h-14 rounded-full bg-surface-100 text-surface-400 group-hover:bg-primary-100 group-hover:text-primary-600 flex items-center justify-center mb-4 transition-colors">
          <Icon name="Plus" :size="24" />
        </div>
        <h3 class="text-lg font-bold text-surface-900 group-hover:text-primary-700">Crear Nuevo</h3>
      </button>
    </div>
  </div>
</template>
