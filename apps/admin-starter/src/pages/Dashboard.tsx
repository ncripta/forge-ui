import { Card, CardHeader, CardTitle, CardContent, BarChart, LineChart, Icon, Badge } from '@forge-ui/react';

const kpis = [
  { label: 'Ingresos MRR', value: '$45,231.89', change: '+20.1%', icon: 'CreditCard' as const, iconBg: 'bg-primary-50 text-primary-600' },
  { label: 'Usuarios Activos', value: '2,350', change: '+12.5%', icon: 'Users' as const, iconBg: 'bg-blue-50 text-blue-600' },
  { label: 'Agentes Desplegados', value: '142', change: '+4.3%', icon: 'Cpu' as const, iconBg: 'bg-purple-50 text-purple-600' },
  { label: 'Tasa de Errores', value: '1.2%', change: '-0.5%', icon: 'Activity' as const, iconBg: 'bg-rose-50 text-rose-600' },
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
  { initials: 'DL', name: 'David López', email: 'david@ejemplo.com', status: 'Activo' },
  { initials: 'MR', name: 'María Ruiz', email: 'maria@ejemplo.com', status: 'Offline' },
  { initials: 'CJ', name: 'Carlos J.', email: 'carlos@agencia.ia', status: 'Activo' },
  { initials: 'SP', name: 'Sara P.', email: 'sara@tech.co', status: 'Pausado' },
];

function StatusBadge({ status }: { status: string }) {
  const styles = {
    Activo: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Offline: 'bg-surface-100 text-surface-600 border-surface-200',
    Pausado: 'bg-amber-50 text-amber-700 border-amber-100',
  }[status] || 'bg-surface-100 text-surface-600 border-surface-200';

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${styles}`}>
      {status}
    </span>
  );
}

export function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">Resumen de Plataforma</h1>
          <p className="text-sm text-surface-500 mt-1">Aquí tienes lo que está sucediendo hoy.</p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-primary-600">
          <Icon name="Plus" size={16} className="mr-2" />
          Nuevo Proyecto
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-surface-50 p-6 rounded-xl border border-surface-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-surface-500">{kpi.label}</p>
              <div className={`p-2 rounded-lg ${kpi.iconBg}`}>
                <Icon name={kpi.icon} size={16} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-surface-900">{kpi.value}</h3>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <Icon name={kpi.change.startsWith('-') ? 'TrendingDown' : 'TrendingUp'} size={12} className="mr-1" />
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="xl:col-span-2 bg-surface-50 p-6 rounded-xl border border-surface-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-surface-900">Actividad del Sistema</h3>
              <p className="text-sm text-surface-500">Ejecución de tareas y peticiones</p>
            </div>
            <select className="text-sm bg-surface-50 border border-surface-200 rounded-lg px-3 py-1.5 text-surface-600 focus:ring-2 focus:ring-primary-100 focus:outline-none cursor-pointer">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
            </select>
          </div>
          <LineChart
            data={activityData}
            lines={[
              { dataKey: 'peticiones', color: 'var(--forge-primary-500)' },
              { dataKey: 'tareas', color: 'var(--forge-primary-300, #a5b4fc)' },
            ]}
            height={300}
          />
        </div>

        {/* Recent Users */}
        <div className="bg-surface-50 rounded-xl border border-surface-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-surface-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-surface-900">Usuarios Recientes</h3>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">Ver todos</button>
          </div>
          <div className="divide-y divide-surface-50 overflow-y-auto">
            {recentUsers.map((u) => (
              <div key={u.email} className="p-4 flex items-center justify-between hover:bg-surface-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-surface-100 flex items-center justify-center text-surface-600 font-semibold text-xs">
                    {u.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-900">{u.name}</p>
                    <p className="text-xs text-surface-500">{u.email}</p>
                  </div>
                </div>
                <StatusBadge status={u.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
