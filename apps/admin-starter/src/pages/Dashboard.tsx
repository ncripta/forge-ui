import { Card, CardHeader, CardTitle, CardContent, BarChart, LineChart } from '@forge-ui/react';

const kpis = [
  { label: 'Usuarios activos', value: '1,284', change: '+12%' },
  { label: 'Ingresos MRR', value: '$48,320', change: '+8.2%' },
  { label: 'Tasa de conversión', value: '3.6%', change: '+0.4%' },
  { label: 'Tickets abiertos', value: '23', change: '-15%' },
];

const revenueData = [
  { name: 'Ene', ingresos: 4200, gastos: 2400 },
  { name: 'Feb', ingresos: 4800, gastos: 2600 },
  { name: 'Mar', ingresos: 5100, gastos: 2800 },
  { name: 'Abr', ingresos: 4900, gastos: 2500 },
  { name: 'May', ingresos: 5800, gastos: 3000 },
  { name: 'Jun', ingresos: 6200, gastos: 3100 },
];

const activityData = [
  { name: 'Lun', usuarios: 120 },
  { name: 'Mar', usuarios: 180 },
  { name: 'Mié', usuarios: 150 },
  { name: 'Jue', usuarios: 210 },
  { name: 'Vie', usuarios: 190 },
  { name: 'Sáb', usuarios: 80 },
  { name: 'Dom', usuarios: 60 },
];

const recentActivity = [
  { user: 'Ana García', action: 'creó un nuevo usuario', time: 'Hace 5 min' },
  { user: 'Carlos Ruiz', action: 'actualizó configuración', time: 'Hace 20 min' },
  { user: 'María López', action: 'eliminó un archivo', time: 'Hace 1 hora' },
  { user: 'Diego Torres', action: 'cambió su contraseña', time: 'Hace 2 horas' },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-main">Dashboard</h1>
        <p className="text-text-muted mt-1">Resumen general del sistema.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-6">
              <p className="text-sm text-text-muted">{kpi.label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-text-main">{kpi.value}</p>
                <span className="text-xs font-medium text-success-main">{kpi.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos vs Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={revenueData}
              lines={[
                { dataKey: 'ingresos', color: 'var(--forge-primary-main)' },
                { dataKey: 'gastos', color: 'var(--forge-danger-main)' },
              ]}
              height={250}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={activityData} dataKey="usuarios" height={250} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-surface-border pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm text-text-main">
                    <span className="font-medium">{item.user}</span> {item.action}
                  </p>
                </div>
                <span className="text-xs text-text-muted whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
