<script setup lang="ts">
import { ref } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { UserService, type UserRecord } from '@/services/user.service';
import { Button, Input, Label, Badge, Avatar, Icon, Spinner, Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogClose, toast } from '@ncripta/forge-vue';

const queryClient = useQueryClient();
const search = ref('');
const filters = ref<Record<string, string | number>>({ page: 1 });
const dialogOpen = ref(false);

const { data, isLoading } = useQuery({
  queryKey: ['users', filters],
  queryFn: () => UserService.getAll(filters.value),
});

const createMutation = useMutation({
  mutationFn: (payload: Partial<UserRecord>) => UserService.create(payload),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    toast.success('Usuario creado correctamente');
    dialogOpen.value = false;
  },
});

const deleteMutation = useMutation({
  mutationFn: (id: string) => UserService.delete(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    toast.success('Usuario eliminado');
  },
});

const handleSearch = () => {
  filters.value = { ...filters.value, page: 1, search: search.value };
};

const handleCreate = (e: Event) => {
  const form = new FormData(e.target as HTMLFormElement);
  createMutation.mutate({
    name: form.get('name') as string,
    email: form.get('email') as string,
    role: (form.get('role') as UserRecord['role']) || 'USER',
    status: 'ACTIVE',
  });
};
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">Usuarios</h1>
        <p class="text-sm text-surface-500 mt-1">{{ data?.total || 0 }} usuarios registrados</p>
      </div>
      <Dialog v-model:open="dialogOpen">
        <DialogTrigger as-child>
          <Button intent="primary"><Icon name="Plus" :size="16" /> Nuevo usuario</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Crear nuevo usuario</DialogTitle>
          <DialogDescription>Completa los campos para registrar un usuario.</DialogDescription>
          <form class="space-y-4 mt-4" @submit.prevent="handleCreate">
            <div class="space-y-2">
              <Label required>Nombre</Label>
              <Input name="name" placeholder="Nombre completo" required />
            </div>
            <div class="space-y-2">
              <Label required>Email</Label>
              <Input name="email" type="email" placeholder="usuario@ejemplo.com" required />
            </div>
            <div class="space-y-2">
              <Label>Rol</Label>
              <select name="role" class="flex h-10 w-full rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm text-text-main">
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
            <div class="flex gap-2 pt-4 justify-end">
              <DialogClose as-child>
                <Button type="button" intent="secondary">Cancelar</Button>
              </DialogClose>
              <Button type="submit" intent="primary" :loading="createMutation.isPending.value">Crear</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
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
            <th class="h-10 px-4 text-left font-medium text-text-muted"></th>
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
            <td class="p-4">
              <Button intent="ghost" size="sm" @click="deleteMutation.mutate(user.id)">
                <Icon name="Trash2" :size="14" class="text-danger-main" />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
