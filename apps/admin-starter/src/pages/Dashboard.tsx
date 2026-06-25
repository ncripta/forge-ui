import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@forge-ui/react';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-main">Dashboard</h1>
        <p className="text-text-muted mt-1">Bienvenido al panel de administración.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Página en construcción</CardTitle>
          <CardDescription>
            El shell de la aplicación está funcional. Los módulos de negocio se implementan en la Fase 5.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-secondary">
            Sidebar colapsable ✓ | Dark mode ✓ | Route guards ✓ | Navigation dinámica ✓
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
