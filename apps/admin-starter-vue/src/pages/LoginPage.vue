<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { appConfig } from '@/config/app.config';
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent, CardFooter } from '@forge-ui/vue';

const loading = ref(false);
const auth = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  loading.value = true;
  await new Promise((r) => setTimeout(r, 800));
  auth.login({ id: '1', name: 'Admin User', email: 'admin@forge.dev', role: 'SUPER_ADMIN' });
  loading.value = false;
  router.push(appConfig.routes.loginFallback);
};
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Iniciar sesión</CardTitle>
      <p class="text-sm text-text-muted">Ingresa tus credenciales para continuar.</p>
    </CardHeader>
    <form @submit.prevent="handleSubmit">
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Label>Email</Label>
          <Input type="email" placeholder="admin@forge.dev" model-value="admin@forge.dev" />
        </div>
        <div class="space-y-2">
          <Label>Contraseña</Label>
          <Input type="password" placeholder="••••••••" model-value="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button intent="primary" class="w-full" :loading="loading">Ingresar</Button>
      </CardFooter>
    </form>
  </Card>
</template>
