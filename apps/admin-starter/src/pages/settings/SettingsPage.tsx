import { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { useTheme } from '@/providers/ThemeProvider';
import {
  Button, Input, Label, Card, CardHeader, CardTitle, CardContent,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Avatar, Switch, Separator, toast,
} from '@ncripta/forge-react';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-main">Configuración</h1>
        <p className="text-text-muted mt-1">Administra tu cuenta y preferencias.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="preferences">Preferencias</TabsTrigger>
        </TabsList>

        <TabsContent value="profile"><ProfileTab /></TabsContent>
        <TabsContent value="security"><SecurityTab /></TabsContent>
        <TabsContent value="preferences"><PreferencesTab /></TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileTab() {
  const { user } = useAuthStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Perfil actualizado correctamente');
  };

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle>Información personal</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar size="xl" fallback={user?.name?.charAt(0) || 'U'} />
            <Button intent="secondary" type="button">Cambiar avatar</Button>
          </div>
          <Separator />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input defaultValue={user?.name} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" defaultValue={user?.email} />
            </div>
          </div>
          <Button type="submit">Guardar cambios</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function SecurityTab() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Contraseña actualizada');
  };

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle>Cambiar contraseña</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label>Contraseña actual</Label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <Label>Nueva contraseña</Label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <Label>Confirmar nueva contraseña</Label>
            <Input type="password" />
          </div>
          <Button type="submit">Actualizar contraseña</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function PreferencesTab() {
  const { theme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(theme === 'dark');

  const handleToggle = (checked: boolean) => {
    setDarkMode(checked);
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle>Preferencias de interfaz</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-main">Modo oscuro</p>
            <p className="text-xs text-text-muted">Activa el tema oscuro de la interfaz</p>
          </div>
          <Switch checked={darkMode} onCheckedChange={handleToggle} />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-main">Notificaciones</p>
            <p className="text-xs text-text-muted">Recibir notificaciones push</p>
          </div>
          <Switch checked={true} onCheckedChange={() => toast.info('Funcionalidad simulada')} />
        </div>
      </CardContent>
    </Card>
  );
}
