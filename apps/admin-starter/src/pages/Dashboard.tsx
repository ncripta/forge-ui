import {
  Card, CardHeader, CardTitle, CardContent,
  Badge, Avatar, Icon, LineChart,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Button,
  type IconName,
} from '@ncripta/forge-react';

const kpis = [
  { label: 'Ingresos MRR', value: '$45,231.89', change: '+20.1%', icon: 'CreditCard' as IconName, iconBg: 'bg-primary-50 text-primary-600' },
  { label: 'Usuarios Activos', value: '2,350', change: '+12.5%', icon: 'Users' as IconName, iconBg: 'bg-blue-50 text-blue-600' },
  { label: 'Agentes Desplegados', value: '142', change: '+4.3%', icon: 'Cpu' as IconName, iconBg: 'bg-purple-50 text-purple-600' },
  { label: 'Tasa de Errores', value: '1.2%', change: '-0.5%', icon: 'Activity' as IconName, iconBg: 'bg-rose-50 text-rose-600' },
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
  { name: 'David López', email: 'david@ejemplo.com', status: 'Activo' as const },
  { name: 'María Ruiz', email: 'maria@ejemplo.com', status: 'Offline' as const },
  { name: 'Carlos J.', email: 'carlos@agencia.ia', status: 'Activo' as const },
  { name: 'Sara P.', email: 'sara@tech.co', status: 'Pausado' as const },
];

const statusIntent = {
  Activo: 'success',
  Offline: 'default',
  Pausado: 'warning',
} as const;

export function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">Resumen de Plataforma</h1>
        <p className="text-sm text-surface-500 mt-1">Aquí tienes lo que está sucediendo hoy.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-surface-500">{kpi.label}</p>
                <div className={`p-2 rounded-lg ${kpi.iconBg}`}>
                  <Icon name={kpi.icon} size={16} />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-surface-900">{kpi.value}</h3>
                <Badge intent="success" variant="subtle">
                  <Icon name={kpi.change.startsWith('-') ? 'TrendingDown' : 'TrendingUp'} size={12} />
                  {kpi.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart Area */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <div>
                <CardTitle>Actividad del Sistema</CardTitle>
                <p className="text-sm text-surface-500 mt-1">Ejecución de tareas y peticiones</p>
              </div>
              <Select defaultValue="7d">
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 días</SelectItem>
                  <SelectItem value="30d">Últimos 30 días</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <LineChart
              data={activityData}
              lines={[
                { dataKey: 'peticiones', color: 'var(--forge-primary-500)' },
                { dataKey: 'tareas', color: 'var(--forge-primary-400)' },
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <CardTitle>Usuarios Recientes</CardTitle>
              <Button intent="link" size="sm">Ver todos</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-surface-200">
              {recentUsers.map((u) => (
                <div key={u.email} className="px-6 py-4 flex items-center justify-between hover:bg-surface-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm" fallback={u.name.split(' ').map(w => w[0]).join('')} />
                    <div>
                      <p className="text-sm font-medium text-surface-900">{u.name}</p>
                      <p className="text-xs text-surface-500">{u.email}</p>
                    </div>
                  </div>
                  <Badge intent={statusIntent[u.status]} variant="outline">
                    {u.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
