import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { appConfig } from '@/config/app.config';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/layouts/AuthLayout/AuthLayout.vue'),
      children: [
        { path: '', component: () => import('@/pages/LoginPage.vue') },
      ],
      meta: { public: true },
    },
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: '/dashboard' },
        { path: 'dashboard', component: () => import('@/pages/DashboardPage.vue') },
        { path: 'users', component: () => import('@/pages/UsersPage.vue') },
        { path: 'projects', component: () => import('@/pages/ProjectsPage.vue') },
        { path: 'settings', component: () => import('@/pages/SettingsPage.vue') },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return appConfig.routes.unauthenticatedFallback;
  }
  if (to.meta.public && auth.isAuthenticated) {
    return appConfig.routes.loginFallback;
  }
});

export default router;
