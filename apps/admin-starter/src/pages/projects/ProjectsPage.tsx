import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectService, type ProjectRecord, type ProjectFilters } from '@/services/project.service';
import {
  Button, Badge, Icon, Input, Card, CardContent,
  Tabs, TabsList, TabsTrigger,
  AvatarGroup, Progress, Label, Textarea, Spinner,
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  toast,
  type IconName,
} from '@ncripta/forge-react';

const statusConfig = {
  active: { label: 'En progreso', intent: 'success' as const },
  review: { label: 'Revisión', intent: 'warning' as const },
  completed: { label: 'Completado', intent: 'default' as const },
  archived: { label: 'Archivado', intent: 'default' as const },
};

const ICON_OPTIONS: { value: string; label: string; bg: string }[] = [
  { value: 'ShoppingCart', label: 'E-commerce', bg: 'bg-blue-50 text-blue-600' },
  { value: 'Bot', label: 'IA / Agentes', bg: 'bg-purple-50 text-purple-600' },
  { value: 'BarChart2', label: 'Analítica', bg: 'bg-rose-50 text-rose-600' },
  { value: 'Globe', label: 'Web', bg: 'bg-sky-50 text-sky-600' },
  { value: 'Smartphone', label: 'Mobile', bg: 'bg-amber-50 text-amber-600' },
  { value: 'Server', label: 'Backend', bg: 'bg-emerald-50 text-emerald-600' },
];

const STATUS_OPTIONS: { value: ProjectRecord['status']; label: string }[] = [
  { value: 'active', label: 'En progreso' },
  { value: 'review', label: 'Revisión' },
  { value: 'completed', label: 'Completado' },
  { value: 'archived', label: 'Archivado' },
];

// --- Project Card ---

function ProjectCard({ project, onEdit, onDelete }: {
  project: ProjectRecord;
  onEdit: (project: ProjectRecord) => void;
  onDelete: (id: string) => void;
}) {
  const status = statusConfig[project.status];

  return (
    <Card className="p-5 hover:shadow-md transition-shadow group flex flex-col h-full">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${project.iconBg}`}>
            <Icon name={project.icon as IconName} size={24} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button intent="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
                <Icon name="Ellipsis" size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(project)}>Editar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDelete(project.id)} className="text-danger-main">
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-4 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="text-lg font-bold text-surface-900 group-hover:text-primary-600 transition-colors cursor-pointer"
              onClick={() => onEdit(project)}
            >
              {project.name}
            </h3>
            <Badge intent={status.intent} variant="outline">{status.label}</Badge>
          </div>
          <p className="text-sm text-surface-500 line-clamp-2">{project.description}</p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs font-medium mb-1.5">
            <span className="text-surface-500">Progreso de tareas</span>
            <span className="text-surface-900">{project.progress}%</span>
          </div>
          <Progress value={project.progress} color={project.progressColor} />
        </div>

        <div className="flex items-center justify-between border-t border-surface-200 pt-4 mt-auto">
          <AvatarGroup avatars={project.members} max={3} size="sm" />
          <span className="text-xs text-surface-400 flex items-center gap-1">
            <Icon name={project.status === 'completed' ? 'CircleCheck' : 'Clock'} size={12} />
            {project.updatedAt}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Project Form Dialog (Create / Edit) ---

function ProjectFormDialog({ project, open, onOpenChange }: {
  project: ProjectRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const isEditing = !!project;

  const defaultIconIdx = project
    ? String(ICON_OPTIONS.findIndex((o) => o.value === project.icon) ?? 0)
    : '0';

  const [iconIdx, setIconIdx] = useState(defaultIconIdx);
  const [status, setStatus] = useState<ProjectRecord['status']>(project?.status || 'active');

  // Reset state when dialog opens with different project
  const handleOpenChange = (value: boolean) => {
    if (value && project) {
      setIconIdx(String(ICON_OPTIONS.findIndex((o) => o.value === project.icon) ?? 0));
      setStatus(project.status);
    } else if (value && !project) {
      setIconIdx('0');
      setStatus('active');
    }
    onOpenChange(value);
  };

  const createMutation = useMutation({
    mutationFn: (data: Pick<ProjectRecord, 'name' | 'description' | 'icon' | 'iconBg'>) =>
      ProjectService.create(data),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success(`Proyecto "${created.name}" creado`);
      onOpenChange(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectRecord> }) =>
      ProjectService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Proyecto actualizado');
      onOpenChange(false);
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const selectedIcon = ICON_OPTIONS[Number(iconIdx)]!;

    const payload = {
      name: form.get('name') as string,
      description: form.get('description') as string,
      icon: selectedIcon.value,
      iconBg: selectedIcon.bg,
    };

    if (isEditing) {
      updateMutation.mutate({ id: project.id, data: { ...payload, status } });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar proyecto' : 'Crear nuevo proyecto'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Modifica la información del proyecto.' : 'Completa la información para iniciar un nuevo espacio de trabajo.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" required>Nombre del proyecto</Label>
            <Input id="name" name="name" placeholder="Ej: Landing Page v2" defaultValue={project?.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" name="description" placeholder="Describe brevemente el objetivo..." defaultValue={project?.description} />
          </div>
          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select value={iconIdx} onValueChange={setIconIdx}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {ICON_OPTIONS.map((opt, i) => (
                  <SelectItem key={opt.value} value={String(i)}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {isEditing && (
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as ProjectRecord['status'])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter className="pt-4">
            <Button type="button" intent="secondary" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" intent="primary" loading={isPending}>
              {isEditing ? 'Guardar cambios' : 'Crear proyecto'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// --- New Project Card ---

function NewProjectCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="border-2 border-dashed border-surface-200 rounded-lg p-5 hover:border-primary-400 hover:bg-primary-50 transition-colors group flex flex-col items-center justify-center h-full min-h-[260px]"
    >
      <div className="w-14 h-14 rounded-full bg-surface-100 text-surface-400 group-hover:bg-primary-100 group-hover:text-primary-600 flex items-center justify-center mb-4 transition-colors">
        <Icon name="Plus" size={24} />
      </div>
      <h3 className="text-lg font-bold text-surface-900 group-hover:text-primary-700">Crear Nuevo</h3>
      <p className="text-sm text-surface-500 mt-1 text-center max-w-[200px]">
        Inicia un nuevo espacio de trabajo desde cero o usa una plantilla.
      </p>
    </button>
  );
}

// --- Page ---

export function ProjectsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');

  const filters: ProjectFilters = {
    ...(search && { search }),
    ...(tab !== 'all' && { status: tab }),
  };

  const { data, isLoading } = useQuery({
    queryKey: ['projects', filters],
    queryFn: () => ProjectService.getAll(filters),
  });

  const deleteMutation = useMutation({
    mutationFn: ProjectService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Proyecto eliminado');
    },
  });

  const handleEdit = (project: ProjectRecord) => {
    setEditingProject(project);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingProject(null);
    setDialogOpen(true);
  };

  // Filtro local por categoría (icon)
  const filteredData = data?.data.filter((p) => {
    if (!filterCategory) return true;
    return p.icon === filterCategory;
  });

  const hasActiveFilters = !!filterCategory;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">Proyectos</h1>
          <p className="text-sm text-surface-500 mt-1">Gestiona y monitorea tus espacios de trabajo activos.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button intent="secondary" onClick={() => setShowFilters(!showFilters)}>
            <Icon name="Filter" size={16} />
            Filtros
            {hasActiveFilters && (
              <Badge intent="primary" variant="solid" className="ml-1 text-[10px] px-1.5">1</Badge>
            )}
          </Button>
          <Button intent="primary" onClick={handleCreate}>
            <Icon name="Plus" size={16} />
            Nuevo Proyecto
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-end gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Categoría</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {hasActiveFilters && (
                <Button
                  intent="ghost"
                  onClick={() => setFilterCategory('')}
                  className="text-surface-500"
                >
                  <Icon name="X" size={14} />
                  Limpiar filtros
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Activos</TabsTrigger>
            <TabsTrigger value="completed">Completados</TabsTrigger>
            <TabsTrigger value="archived">Archivados</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="w-full sm:w-64">
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData?.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))}
          <NewProjectCard onClick={handleCreate} />
        </div>
      )}

      {/* Create / Edit Dialog */}
      <ProjectFormDialog
        project={editingProject}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
