export const appConfig = {
  name: 'Forge Admin',
  logo: '/assets/logo.svg',
  theme: {
    defaultMode: 'system' as 'light' | 'dark' | 'system',
    sidebarColor: 'surface' as 'surface' | 'primary' | 'dark',
  },
  locales: ['es', 'en'] as const,
  defaultLocale: 'es' as const,
  routes: {
    loginFallback: '/dashboard',
    unauthenticatedFallback: '/login',
  },
} as const;

export type AppConfig = typeof appConfig;
