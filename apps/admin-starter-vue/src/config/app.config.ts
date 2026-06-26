export const appConfig = {
  name: 'Forge Admin',
  logo: '/assets/logo.svg',
  theme: {
    defaultMode: 'system' as 'light' | 'dark' | 'system',
  },
  routes: {
    loginFallback: '/dashboard',
    unauthenticatedFallback: '/login',
  },
} as const;
