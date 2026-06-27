<script setup lang="ts">
import { ref } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { ProjectService, type ProjectRecord } from '@/services/project.service';
import { Card, CardContent, Icon, Badge, Button, Progress, Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogClose, Input, Label, Textarea, Spinner, toast } from '@ncripta/forge-vue';

const queryClient = useQueryClient();
const dialogOpen = ref(false);

const { data, isLoading } = useQuery({
  queryKey: ['projects'],
  queryFn: () => ProjectService.getAll(),
});

const createMutation = useMutation({
  mutationFn: (payload: Pick<ProjectRecord, 'name' | 'description' | 'icon' | 'iconBg'>) => ProjectService.create(payload),
  onSuccess: (project) => {
    queryClient.invalidateQueries({ queryKey: ['projects'] });
    toast.success(`Proyecto "${project.name}" creado`);
    dialogOpen.value = false;
  },
});

const deleteMutation = useMutation({
  mutationFn: (id: string) => ProjectService.delete(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['projects'] });
    toast.success('Proyecto eliminado');
  },
});

const handleCreate = (e: Event) => {
  const form = new FormData(e.target as HTMLFormElement);
  createMutation.mutate({
    name: form.get('name') as string,
    description: form.get('description') as string,
    icon: 'Globe',
    iconBg: 'bg-sky-50 text-sky-600',
  });
};

const statusConfig: Record<string, { label: string; intent: 'success' | 'warning' | 'default' }> = {
  active: { label: 'En progreso', intent: 'success' },
  review: { label: 'Revisión', intent: 'warning' },
  completed: { label: 'Completado', intent: 'default' },
  archived: { label: 'Archivado', intent: 'default' },
};

const openCreate = () => { dialogOpen.value = true; };
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">Proyectos</h1>
        <p class="text-sm text-surface-500 mt-1">Gestiona y monitorea tus espacios de trabajo.</p>
      </div>
      <Dialog v-model:open="dialogOpen">
        <DialogTrigger as-child>
          <Button intent="primary"><Icon name="Plus" :size="16" /> Nuevo Proyecto</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Crear nuevo proyecto</DialogTitle>
          <DialogDescription>Completa la información para iniciar un espacio de trabajo.</DialogDescription>
          <form class="space-y-4 mt-4" @submit.prevent="handleCreate">
            <div class="space-y-2">
              <Label required>Nombre</Label>
              <Input name="name" placeholder="Ej: Landing Page v2" required />
            </div>
            <div class="space-y-2">
              <Label>Descripción</Label>
              <Textarea name="description" placeholder="Describe el objetivo del proyecto..." />
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

    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center py-16">
      <Spinner size="lg" />
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="project in data?.data" :key="project.id" class="p-5 hover:shadow-md transition-shadow group flex flex-col h-full">
        <CardContent class="p-0 flex flex-col h-full">
          <div class="flex justify-between items-start mb-4">
            <div :class="`w-12 h-12 rounded-lg flex items-center justify-center ${project.iconBg}`">
              <Icon :name="project.icon" :size="24" />
            </div>
            <Button intent="ghost" size="sm" class="opacity-0 group-hover:opacity-100 transition-opacity" @click="deleteMutation.mutate(project.id)">
              <Icon name="Trash2" :size="14" class="text-danger-main" />
            </Button>
          </div>
          <div class="mb-4 flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-lg font-bold text-surface-900">{{ project.name }}</h3>
              <Badge :intent="statusConfig[project.status]?.intent || 'default'" variant="outline">
                {{ statusConfig[project.status]?.label || project.status }}
              </Badge>
            </div>
            <p class="text-sm text-surface-500 line-clamp-2">{{ project.description }}</p>
          </div>
          <div class="mb-4">
            <div class="flex justify-between text-xs font-medium mb-1.5">
              <span class="text-surface-500">Progreso</span>
              <span class="text-surface-900">{{ project.progress }}%</span>
            </div>
            <Progress :value="project.progress" :color="project.progressColor" />
          </div>
        </CardContent>
      </Card>

      <!-- Add new card -->
      <button
        class="border-2 border-dashed border-surface-200 rounded-lg p-5 hover:border-primary-400 hover:bg-primary-50 transition-colors group flex flex-col items-center justify-center min-h-[200px]"
        @click="openCreate"
      >
        <div class="w-14 h-14 rounded-full bg-surface-100 text-surface-400 group-hover:bg-primary-100 group-hover:text-primary-600 flex items-center justify-center mb-4 transition-colors">
          <Icon name="Plus" :size="24" />
        </div>
        <h3 class="text-lg font-bold text-surface-900 group-hover:text-primary-700">Crear Nuevo</h3>
      </button>
    </div>
  </div>
</template>
