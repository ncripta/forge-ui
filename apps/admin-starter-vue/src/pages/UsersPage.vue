<script setup lang="ts">
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { UserService } from '@/services/user.service';
import { Button, Input, Badge, Avatar, Icon, Spinner } from '@forge-ui/vue';

const search = ref('');
const filters = ref<Record<string, string | number>>({ page: 1 });

const { data, isLoading } = useQuery({
  queryKey: ['users', filters],
  queryFn: () => UserService.getAll(filters.value),
});

const handleSearch = () => {
  filters.value = { ...filters.value, page: 1, search: search.value };
};
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">Usuarios</h1>
        <p class="text-sm text-surface-500 mt-1">{{ data?.total || 0 }} usuarios registrados</p>
      </div>
      <Button intent="primary"><Icon name="Plus" :size="16" /> Nuevo usuario</Button>
    </div>

    <!-- Search -->
    <div class="flex items-center gap-2 max-w-sm">
      <Input placeholder="Buscar..." v-model="search" @keydown.enter="handleSearch" />
      <Button intent="secondary" @click="handleSearch">Buscar</Button>
    </div>

    <!-- Table -->
    <div v-if="isLoading" class="flex items-center justify-center py-16">
      <Spinner size="lg" />
    </div>
    <div v-else class="rounded-lg border border-surface-border overflow-hidden">
      <table class="w-full text-sm">
        <thead class="border-b border-surface-border">
          <tr>
            <th class="h-10 px-4 text-left font-medium text-text-muted">Usuario</th>
            <th class="h-10 px-4 text-left font-medium text-text-muted">Rol</th>
            <th class="h-10 px-4 text-left font-medium text-text-muted">Estado</th>
            <th class="h-10 px-4 text-left font-medium text-text-muted">Creado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in data?.data" :key="user.id" class="border-b border-surface-border hover:bg-surface-sunken">
            <td class="p-4">
              <div class="flex items-center gap-3">
                <Avatar size="sm" :fallback="user.name.charAt(0)" />
                <div>
                  <p class="font-medium text-text-main">{{ user.name }}</p>
                  <p class="text-xs text-text-muted">{{ user.email }}</p>
                </div>
              </div>
            </td>
            <td class="p-4"><Badge intent="primary" variant="subtle">{{ user.role }}</Badge></td>
            <td class="p-4"><Badge :intent="user.status === 'ACTIVE' ? 'success' : 'default'">{{ user.status === 'ACTIVE' ? 'Activo' : 'Inactivo' }}</Badge></td>
            <td class="p-4 text-text-muted">{{ user.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
