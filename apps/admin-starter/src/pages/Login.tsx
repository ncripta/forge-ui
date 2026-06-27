import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@ncripta/forge-react';
import { useAuthStore } from '@/stores/auth.store';
import { appConfig } from '@/config/app.config';

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    login({
      id: '1',
      name: 'Admin User',
      email: 'admin@forge.dev',
      role: 'SUPER_ADMIN',
    });
    setLoading(false);
    navigate(appConfig.routes.loginFallback);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>Ingresa tus credenciales para continuar.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@forge.dev" defaultValue="admin@forge.dev" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" placeholder="••••••••" defaultValue="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" loading={loading}>
            Ingresar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
