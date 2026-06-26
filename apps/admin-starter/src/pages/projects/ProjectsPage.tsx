import { useState } from 'react';
import {
  Button, Badge, Icon, Input, Card, CardContent,
  Tabs, TabsList, TabsTrigger, TabsContent,
  AvatarGroup, Progress,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  type IconName,
} from '@forge-ui/react';

interface Project {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  iconBg: string;
  status: 'active' | 'review' | 'completed' | 'archived';
  progress: number;
  progressColor?: string;
  members: { fallback: string }[];
  updatedAt: string;
}

const projects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Portal',
    description: 'Rediseño completo de la tienda online principal integrando el nuevo sistema de pagos de Stripe.',
    icon: 'ShoppingCart',
    iconBg: 'bg-blue-50 text-blue-600',
    status: 'active',
    progress: 75,
    members: [{ fallback: 'MR' }, { fallback: 'DL' }, { fallback: 'AG' }, { fallback: 'SP' }],
    updatedAt: 'Actualizado hoy',
  },
  {
    id: '2',
    name: 'Valhalla Agents IA',
    description: 'Desarrollo de la interfaz conversacional para los agentes autónomos de soporte al cliente.',
    icon: 'Bot',
    iconBg: 'bg-purple-50 text-purple-600',
    status: 'review',
    progress: 92,
    progressColor: '#a855f7',
    members: [{ fallback: 'AG' }],
    updatedAt: 'Hace 2 días',
  },
  {
    id: '3',
    name: 'Panel Analítico Q3',
    description: 'Migración de métricas legacy al nuevo sistema de visualización de datos de Forge UI.',
    icon: 'BarChart2',
    iconBg: 'bg-rose-50 text-rose-600',
    status: 'completed',
    progress: 100,
    progressColor: '#10b981',
    members: [{ fallback: 'CJ' }, { fallback: 'SP' }],
    updatedAt: 'Finalizado',
  },
];

const statusConfig = {
  active: { label: 'En progreso', intent: 'success' as const },
  review: { label: 'Revisión', intent: 'warning' as const },
  completed: { label: 'Completado', intent: 'default' as const },
  archived: { label: 'Archivado', intent: 'default' as const },
};

function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status];

  return (
    <Card className="p-5 hover:shadow-md transition-shadow group flex flex-col h-full">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${project.iconBg}`}>
            <Icon name={project.icon} size={24} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button intent="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
                <Icon name="Ellipsis" size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>Duplicar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Archivar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Body */}
        <div className="mb-4 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-surface-900 group-hover:text-primary-600 transition-colors cursor-pointer">
              {project.name}
            </h3>
            <Badge intent={status.intent} variant="outline">{status.label}</Badge>
          </div>
          <p className="text-sm text-surface-500 line-clamp-2">{project.description}</p>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs font-medium mb-1.5">
            <span className="text-surface-500">Progreso de tareas</span>
            <span className="text-surface-900">{project.progress}%</span>
          </div>
          <Progress value={project.progress} color={project.progressColor} />
        </div>

        {/* Footer */}
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

function NewProjectCard() {
  return (
    <button className="border-2 border-dashed border-surface-200 rounded-lg p-5 hover:border-primary-400 hover:bg-primary-50 transition-colors group flex flex-col items-center justify-center h-full min-h-[260px]">
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

export function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');

  const filtered = projects.filter((p) => {
    if (tab === 'active') return p.status === 'active';
    if (tab === 'completed') return p.status === 'completed';
    if (tab === 'archived') return p.status === 'archived';
    return true;
  }).filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">Proyectos</h1>
          <p className="text-sm text-surface-500 mt-1">Gestiona y monitorea tus espacios de trabajo activos.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button intent="secondary">
            <Icon name="Filter" size={16} />
            Filtros
          </Button>
          <Button intent="primary">
            <Icon name="Plus" size={16} />
            Nuevo Proyecto
          </Button>
        </div>
      </div>

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <NewProjectCard />
      </div>
    </div>
  );
}
