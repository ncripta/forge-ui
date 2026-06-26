import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import App from './App.vue';
import router from './router';
import './index.css';

async function bootstrap() {
  // Start MSW
  const { worker } = await import('./mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });

  const app = createApp(App);

  // Pinia
  const pinia = createPinia();
  pinia.use(piniaPersistedState);
  app.use(pinia);

  // Vue Query
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
  });
  app.use(VueQueryPlugin, { queryClient });

  // Router
  app.use(router);

  app.mount('#app');
}

bootstrap();
