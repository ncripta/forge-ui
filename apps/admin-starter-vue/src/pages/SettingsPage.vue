<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useTheme } from '@/providers/useTheme';
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent, Tabs, TabsList, TabsTrigger, TabsContent, Switch, Separator, Avatar, toast } from '@ncripta/forge-vue';

const auth = useAuthStore();
const { theme, setTheme } = useTheme();
const darkMode = ref(theme.value === 'dark');

const handleToggle = (checked: boolean) => {
  darkMode.value = checked;
  setTheme(checked ? 'dark' : 'light');
};

const handleSave = () => {
  toast.success('Perfil actualizado correctamente');
};
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">Configuración</h1>
      <p class="text-sm text-surface-500 mt-1">Administra tu cuenta y preferencias.</p>
    </div>

    <Tabs default-value="profile">
      <TabsList>
        <TabsTrigger value="profile">Perfil</TabsTrigger>
        <TabsTrigger value="security">Seguridad</TabsTrigger>
        <TabsTrigger value="preferences">Preferencias</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card class="mt-4">
          <CardHeader><CardTitle>Información personal</CardTitle></CardHeader>
          <CardContent>
            <form class="space-y-4" @submit.prevent="handleSave">
              <div class="flex items-center gap-4">
                <Avatar size="xl" :fallback="auth.user?.name?.charAt(0) || 'U'" />
                <Button intent="secondary" type="button">Cambiar avatar</Button>
              </div>
              <Separator />
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <Label>Nombre</Label>
                  <Input :model-value="auth.user?.name" />
                </div>
                <div class="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" :model-value="auth.user?.email" />
                </div>
              </div>
              <Button type="submit" intent="primary">Guardar cambios</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card class="mt-4">
          <CardHeader><CardTitle>Cambiar contraseña</CardTitle></CardHeader>
          <CardContent>
            <form class="space-y-4 max-w-md" @submit.prevent="toast.success('Contraseña actualizada')">
              <div class="space-y-2"><Label>Contraseña actual</Label><Input type="password" /></div>
              <div class="space-y-2"><Label>Nueva contraseña</Label><Input type="password" /></div>
              <div class="space-y-2"><Label>Confirmar contraseña</Label><Input type="password" /></div>
              <Button type="submit" intent="primary">Actualizar contraseña</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="preferences">
        <Card class="mt-4">
          <CardHeader><CardTitle>Preferencias de interfaz</CardTitle></CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-main">Modo oscuro</p>
                <p class="text-xs text-text-muted">Activa el tema oscuro</p>
              </div>
              <Switch :checked="darkMode" @update:checked="handleToggle" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
