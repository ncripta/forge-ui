import { Card, CardHeader, CardTitle, CardContent, LineChart, BarChart, DonutChart } from '@forge-ui/react';

const monthlyUsers = [
  { name: 'Ene', nuevos: 45, activos: 320 },
  { name: 'Feb', nuevos: 62, activos: 350 },
  { name: 'Mar', nuevos: 58, activos: 390 },
  { name: 'Abr', nuevos: 71, activos: 420 },
  { name: 'May', nuevos: 89, activos: 480 },
  { name: 'Jun', nuevos: 95, activos: 530 },
];

const trafficBySource = [
  { name: 'Orgánico', value: 4200 },
  { name: 'Directo', value: 2800 },
  { name: 'Referido', value: 1600 },
  { name: 'Social', value: 900 },
];

const pageViews = [
  { name: 'Lun', vistas: 1200 },
  { name: 'Mar', vistas: 1800 },
  { name: 'Mié', vistas: 1400 },
  { name: 'Jue', vistas: 2100 },
  { name: 'Vie', vistas: 1900 },
  { name: 'Sáb', vistas: 800 },
  { name: 'Dom', vistas: 600 },
];

const metrics = [
  { label: 'Páginas vistas', value: '24,521', change: '+18%' },
  { label: 'Sesiones únicas', value: '8,342', change: '+12%' },
  { label: 'Tasa de rebote', value: '34.2%', change: '-3%' },
  { label: 'Duración media', value: '4m 32s', change: '+8%' },
];

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-main">Analíticas</h1>
        <p className="text-text-muted mt-1">Métricas de uso y tráfico de la plataforma.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-6">
              <p className="text-sm text-text-muted">{m.label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-text-main">{m.value}</p>
                <span className={`text-xs font-medium ${m.change.startsWith('-') ? 'text-danger-main' : 'text-success-main'}`}>
                  {m.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Crecimiento de usuarios</CardTitle></CardHeader>
          <CardContent>
            <LineChart
              data={monthlyUsers}
              lines={[
                { dataKey: 'activos', color: 'var(--forge-primary-main)' },
                { dataKey: 'nuevos', color: 'var(--forge-success-main)' },
              ]}
              height={280}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Tráfico por fuente</CardTitle></CardHeader>
          <CardContent>
            <DonutChart data={trafficBySource} dataKey="value" height={280} />
          </CardContent>
        </Card>
      </div>

      {/* Page views */}
      <Card>
        <CardHeader><CardTitle>Páginas vistas (última semana)</CardTitle></CardHeader>
        <CardContent>
          <BarChart data={pageViews} dataKey="vistas" height={250} />
        </CardContent>
      </Card>
    </div>
  );
}
