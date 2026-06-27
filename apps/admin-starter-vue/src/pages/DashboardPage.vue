<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, Badge, Avatar, Icon, LineChart } from '@ncripta/forge-vue';

const kpis = [
  { label: 'Ingresos MRR', value: '$45,231.89', change: '+20.1%', icon: 'CreditCard', iconBg: 'bg-primary-50 text-primary-600' },
  { label: 'Usuarios Activos', value: '2,350', change: '+12.5%', icon: 'Users', iconBg: 'bg-blue-50 text-blue-600' },
  { label: 'Agentes Desplegados', value: '142', change: '+4.3%', icon: 'Cpu', iconBg: 'bg-purple-50 text-purple-600' },
  { label: 'Tasa de Errores', value: '1.2%', change: '-0.5%', icon: 'Activity', iconBg: 'bg-rose-50 text-rose-600' },
];

const activityData = [
  { name: 'Lun', tareas: 120, peticiones: 340 },
  { name: 'Mar', tareas: 180, peticiones: 420 },
  { name: 'Mié', tareas: 150, peticiones: 380 },
  { name: 'Jue', tareas: 210, peticiones: 490 },
  { name: 'Vie', tareas: 190, peticiones: 450 },
  { name: 'Sáb', tareas: 80, peticiones: 200 },
  { name: 'Dom', tareas: 60, peticiones: 150 },
];

const recentUsers = [
  { name: 'David López', email: 'david@ejemplo.com', status: 'Activo' },
  { name: 'María Ruiz', email: 'maria@ejemplo.com', status: 'Offline' },
  { name: 'Carlos J.', email: 'carlos@agencia.ia', status: 'Activo' },
  { name: 'Sara P.', email: 'sara@tech.co', status: 'Pausado' },
];
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">Resumen de Plataforma</h1>
      <p class="text-sm text-surface-500 mt-1">Aquí tienes lo que está sucediendo hoy.</p>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <Card v-for="kpi in kpis" :key="kpi.label">
        <CardContent class="p-6">
          <div class="flex justify-between items-start">
            <p class="text-sm font-medium text-surface-500">{{ kpi.label }}</p>
            <div :class="`p-2 rounded-lg ${kpi.iconBg}`">
              <Icon :name="kpi.icon" :size="16" />
            </div>
          </div>
          <div class="mt-4 flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-surface-900">{{ kpi.value }}</h3>
            <Badge intent="success" variant="subtle">{{ kpi.change }}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Chart + Users -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <Card class="xl:col-span-2">
        <CardHeader><CardTitle>Actividad del Sistema</CardTitle></CardHeader>
        <CardContent>
          <LineChart
            :data="activityData"
            :lines="[{ dataKey: 'peticiones', color: '#6366f1' }, { dataKey: 'tareas', color: '#a5b4fc' }]"
            :height="300"
          />
        </CardContent>
      </Card>

      <Card class="overflow-hidden">
        <CardHeader>
          <div class="flex justify-between items-center w-full">
            <CardTitle>Usuarios Recientes</CardTitle>
            <Button intent="link" size="sm">Ver todos</Button>
          </div>
        </CardHeader>
        <CardContent class="p-0">
          <div class="divide-y divide-surface-200">
            <div v-for="u in recentUsers" :key="u.email" class="px-6 py-4 flex items-center justify-between hover:bg-surface-100 transition-colors">
              <div class="flex items-center gap-3">
                <Avatar size="sm" :fallback="u.name.split(' ').map(w => w[0]).join('')" />
                <div>
                  <p class="text-sm font-medium text-surface-900">{{ u.name }}</p>
                  <p class="text-xs text-surface-500">{{ u.email }}</p>
                </div>
              </div>
              <Badge :intent="u.status === 'Activo' ? 'success' : 'default'" variant="outline">{{ u.status }}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
